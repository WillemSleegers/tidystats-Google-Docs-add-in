const insertText = (x, italic = false, subscript = false) => {
  const cursor = DocumentApp.getActiveDocument().getCursor()

  if (cursor) {
    const element = cursor.insertText(x)

    if (element) {
      element.setItalic(italic)
      if (subscript) {
        element.setTextAlignment(DocumentApp.TextAlignment.SUBSCRIPT)
      } else {
        element.setTextAlignment(DocumentApp.TextAlignment.NORMAL)
      }
      const doc = DocumentApp.getActiveDocument()
      doc.setCursor(doc.newPosition(element, x.length))
    } else {
      DocumentApp.getUi().alert("Cannot insert text here.")
    }
  } else {
    DocumentApp.getUi().alert("Cannot find a cursor.")
  }
}

const appendTextAsUrl = (x, id, suffix = "") => {
  const doc = DocumentApp.getActiveDocument()
  const cursor = doc.getCursor()

  if (!cursor) {
    DocumentApp.getUi().alert(
      "Please choose a position by placing your cursor in the text."
    )
  } else {
    const text = cursor.insertText(x + suffix)
    if (!text) {
      DocumentApp.getUi().alert("Cannot insert text here.")
    } else {
      text.setLinkUrl(
        0,
        x.length - 1,
        "https://www.tidystats.io/google-docs-statistic/#id=" + id
      )
      //text.setUnderline(false)
      //text.setForegroundColor(0, x.length - 1, "#000000")
      doc.setCursor(doc.newPosition(text, x.length + suffix.length))
    }
  }
}

const insertStatistic = (statistic, id) => {
  appendTextAsUrl(statistic, id)
}

const insertStatistics = (statistics) => {
  let selectedStatistics

  // Filter out the unchecked statistics
  selectedStatistics = statistics.filter((statistic) => statistic.checked)

  // Filter out the degrees of freedom if there's a test statistic
  // (e.g., t, F) because we will report those together with the test
  // statistic itself
  if (selectedStatistics.some((statistic) => statistic.name === "statistic")) {
    selectedStatistics = selectedStatistics.filter(
      (statistic) =>
        !["df", "df numerator", "df denominator"].includes(statistic.name)
    )
  }

  // If both the lower and upper bound of an interval are present, remove one,
  // because we'll report it together with the other one
  const lower = statistics.find((x) => x.name === "LL")
  const upper = statistics.find((x) => x.name === "UL")

  if (lower && upper) {
    selectedStatistics = selectedStatistics.filter(
      (statistic) => statistic.name !== "UL"
    )
  }

  selectedStatistics.forEach((statistic, i) => {
    // Add a comma starting after the first element and nothing otherwise
    let suffix
    if (i === selectedStatistics.length - 1) {
      suffix = ""
    } else {
      suffix = ", "
    }

    // Create the confidence interval section
    if (statistic.name === "LL" && lower && upper) {
      const text = statistic.level * 100 + "% " + statistic.interval + " ["
      insertText(text)
      appendTextAsUrl(lower.value, lower.identifier, ", ")
      appendTextAsUrl(upper.value, upper.identifier, "]")
      insertText(suffix)
    } else {
      // Create the test statistic section
      if (statistic.name === "statistic") {
        // t-statistic
        if (
          (statistic.symbol === "t" || statistic.symbol === "z") &&
          statistics.find((x) => x.name === "df")
        ) {
          insertText(statistic.symbol, true)
          insertText("(", false)

          const df = statistics.find((x) => x.name === "df")
          if (df) {
            appendTextAsUrl(df.value, df.identifier, ")")
          }
        }
        // F-statistic
        else if (
          statistic.symbol === "F" &&
          statistics.find((x) => x.name === "df numerator") &&
          statistics.find((x) => x.name === "df denominator")
        ) {
          insertText(statistic.symbol, true)
          insertText("(", false)

          const dfNum = statistics.find((x) => x.name === "df numerator")
          appendTextAsUrl(dfNum.value, dfNum.identifier, ", ")

          const dfDen = statistics.find((x) => x.name === "df denominator")
          appendTextAsUrl(dfDen.value, dfDen.identifier, ")")
        }
      }
      // Every other statistic
      else {
        insertText(statistic.symbol ? statistic.symbol : statistic.name, true)

        if (statistic.subscript) {
          insertText(statistic.subscript, true, true)
        }
      }
      insertText(" = ", false)
      appendTextAsUrl(statistic.value, statistic.identifier, suffix)
    }
  })
}
