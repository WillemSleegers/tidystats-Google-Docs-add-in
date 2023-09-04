const updateStatistics = (statistics) => {
  const tidystatsURL = "https://www.tidystats.io/google-docs-statistic/#id="

  const document = DocumentApp.getActiveDocument()
  const text = document.getBody().asText()

  const links = getLinks(document, tidystatsURL)

  statistics = JSON.parse(statistics)

  let statistic, value
  let statisticsCount = 0
  let indexChange = 0

  for (const link of links) {
    statistic = findStatistic(link.id, statistics)

    // Replace the statistic reported in the document with the new one, if there is one
    if (statistic) {
      // Check whether a lower or upper bound was reported
      const components = link.id.split("$")
      let bound
      if (components[components.length - 1].match(/lower|upper/)) {
        bound = components.pop()
      }
      value = formatValue(statistic, 2, bound)

      // Only update if the new value is different from the old value
      if (link.value != value) {
        statisticsCount++

        // Insert before delete to preserve the URL
        text.insertText(link.end + indexChange, value)
        text.deleteText(link.start + indexChange, link.end - 1 + indexChange)

        // update indexChange to reflect changes in indices due to differing value lengths
        indexChange = indexChange + value.length - link.value.length
      }
    }
  }

  DocumentApp.getUi().alert("Updated " + statisticsCount + " statistics")
}

const getLinks = (document, tidystatsURL) => {
  const body = document.getBody()
  const text = body.asText()
  const indices = text.getTextAttributeIndices()

  let links = []
  let lastLink

  indices.forEach((index, i, indices) => {
    const url = text.getLinkUrl(index)

    if (url && url.indexOf(tidystatsURL) === 0) {
      let start = index
      let end =
        i < indices.length - 1 ? indices[i + 1] : text.getText().length - 1

      // check if this and the last found link are continuous
      if (lastLink && lastLink.url == url && lastLink.end == start) {
        lastLink.end = end
        lastLink.value = text.getText().substring(lastLink.start, end)
        return
      }

      lastLink = {
        section: "body",
        url: url,
        id: url.substring(tidystatsURL.length),
        value: text.getText().substring(start, end),
        start: start,
        end: end,
      }

      links.push(lastLink)
    }
  })

  return links
}

/** Below, the getAllLinks function and the related iterateSection function were
 * first modified for Zotero from https://stackoverflow.com/a/40730088/3199106.
 * Then that code from Zotero was modified for the purpose here.
 * (Zotero source code: https://github.com/zotero/zotero-google-docs-integration/)
 * So, technically, they should be licensed under Zotero's GNU AGPL as follows.
 	***** BEGIN LICENSE BLOCK *****
 	Copyright © 2018 Center for History and New Media
 					George Mason University, Fairfax, Virginia, USA
 					http://zotero.org
    Copyright © 2022 Gáspár Lukács
 	This is free software: you can redistribute it and/or modify
 	it under the terms of the GNU Affero General Public License as published by
 	the Free Software Foundation, either version 3 of the License, or
 	(at your option) any later version.
 	This software is distributed in the hope that it will be useful,
 	but WITHOUT ANY WARRANTY; without even the implied warranty of
 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 	GNU Affero General Public License for more details.
 	(http://www.gnu.org/licenses/)
 	***** END LICENSE BLOCK *****
 */

/**
 * Returns a flat array of links which appear in the active document's body.
 * Each link is represented by a simple Javascript object with the following
 * keys:
 *	 - "section": {ContainerElement} the document section in which the link is
 *		 found.
 *	 - "isFirstPageSection": {Boolean} whether the given section is a first-page
 *		 header/footer section.
 *	 - "paragraph": {ContainerElement} contains a reference to the Paragraph
 *		 or ListItem element in which the link is found.
 *	 - "text": the Text element in which the link is found.
 *	 - "startOffset": {Number} the position (offset) in the link text begins.
 *	 - "endOffsetInclusive": the position of the last character of the link
 *			text, or null if the link extends to the end of the text element.
 *	 - "url": the URL of the link.
 *
 *
 * @returns {Array} the aforementioned flat array of links.
 */

const getAllLinks = (tidyID) => {
  const links = []
  let footnoteIndex = 0
  iterateSections(
    doc,
    function iterateSection(
      section,
      sectionIndex,
      isFirstPageSection,
      footnote
    ) {
      if (typeof section.getParagraphs != "function") {
        // as we're using some undocumented API, adding this to avoid cryptic
        // messages upon possible API changes.
        throw new Error(
          "An API change has caused this script to stop " +
            "working.\n" +
            "Section #" +
            sectionIndex +
            " of type " +
            section.getType() +
            " has no .getParagraphs() method. " +
            "Stopping script."
        )
      }
      section.getParagraphs().forEach(function (par) {
        // skip empty paragraphs
        if (par.getNumChildren() == 0) {
          return
        }
        // go over all text elements in paragraph / list-item
        for (let el = par.getChild(0); el != null; el = el.getNextSibling()) {
          if (el.getType() == DocumentApp.ElementType.FOOTNOTE) {
            const sect = el.asFootnote().getFootnoteContents()
            footnoteIndex++
            if (!sect || typeof sect != "object") {
              continue
            }
            iterateSection(sect, -1, false, true)
            continue
          } else if (el.getType() != DocumentApp.ElementType.TEXT) {
            continue
          }
          // go over all styling segments in text element
          const attributeIndices = el.getTextAttributeIndices()
          let lastLink = null
          attributeIndices.forEach(function (startOffset, i, attributeIndices) {
            const url = el.getLinkUrl(startOffset)
            if (url != null && url?.indexOf(tidyID) === 0) {
              // we hit a link
              const endOffsetInclusive =
                i + 1 < attributeIndices.length
                  ? attributeIndices[i + 1] - 1
                  : el.getText().length - 1
              // check if this and the last found link are continuous
              if (
                lastLink != null &&
                lastLink.url == url &&
                lastLink.endOffsetInclusive == startOffset - 1
              ) {
                // this and the previous style segment are continuous
                lastLink.endOffsetInclusive = endOffsetInclusive
                return
              }
              lastLink = {
                // section: section,
                // isFirstPageSection: isFirstPageSection,
                // paragraph: par,
                text: el,
                startOffset: startOffset,
                endOffsetInclusive: endOffsetInclusive,
                url: url,
                id: url.substring(tidyID.length),
                value: el
                  .getText()
                  .substring(startOffset, endOffsetInclusive + 1),
                // footnoteIndex: footnote ? footnoteIndex : 0
              }
              links.push(lastLink)
            }
          })
        }
      })
    }
  )
  return links
}

/**
 * Calls the given function for each section of the document (body, header,
 * etc.). Sections are children of the DocumentElement object.
 *
 * @param {Document} doc The Document object (such as the one obtained via
 *		 a call to DocumentApp.getActiveDocument()) with the sections to iterate
 *		 over.
 * @param {Function} func A callback function which will be called, for each
 *		 section, with the following arguments (in order):
 *			 - {ContainerElement} section - the section element
 *			 - {Number} sectionIndex - the child index of the section, such that
 *				 doc.getBody().getParent().getChild(sectionIndex) == section.
 *			 - {Boolean} isFirstPageSection - whether the section is a first-page
 *				 header/footer section.
 */
const iterateSections = (doc, func) => {
  // get the DocumentElement interface to iterate over all sections
  // this bit is undocumented API
  const docEl = doc.getBody().getParent()

  const regularHeaderSectionIndex =
    doc.getHeader() == null ? -1 : docEl.getChildIndex(doc.getHeader())
  const regularFooterSectionIndex =
    doc.getFooter() == null ? -1 : docEl.getChildIndex(doc.getFooter())

  for (let i = 0; i < docEl.getNumChildren(); ++i) {
    const section = docEl.getChild(i)

    const sectionType = section.getType()
    const isFirstPageSection =
      i != regularHeaderSectionIndex &&
      i != regularFooterSectionIndex &&
      (sectionType == DocumentApp.ElementType.HEADER_SECTION ||
        sectionType == DocumentApp.ElementType.FOOTER_SECTION)

    // Footnotes are checked when going over the body of the doc
    if (section.getType() != DocumentApp.ElementType.FOOTNOTE_SECTION) {
      func(section, i, isFirstPageSection)
    }
  }
}

const findStatistic = (id, analyses) => {
  // Split the identifier up in the separate components
  const components = id.split("$")
  // Check if the statistic is a lower or upper bound statistic
  // If so, remove the last component
  if (components[components.length - 1].match(/lower|upper/)) {
    components.pop()
  }
  // Split up the components into the identifier, the statistics name, and everything else as group names
  const identifier = components[0]
  const statisticName = components[components.length - 1]
  const groupNames = components.slice(1, components.length - 1)
  // Find the analysis based on the identifier
  const analysis = analyses.find((x) => x.identifier === identifier)
  // Find the statistics
  let statistic, statistics
  if (groupNames.length) {
    let groups, group
    groups = analysis?.groups
    for (let i = 0; i < groupNames.length; i++) {
      group = groups?.find((x) => x.name === groupNames[i])
      if (i < groupNames.length) {
        group = groups?.find((x) => x.name === groupNames[i])
        groups = group?.groups
      }
    }
    statistics = group?.statistics
  } else {
    statistics = analysis?.statistics
  }

  // Find the statistic
  statistic = statistics?.find((x) => x.name === statisticName)

  return statistic
}

const SMOL = ["p", "r", "R²", "P"]
const INTEGERS = ["df", "df numerator", "df denominator", "count", "lag"]

const isNumeric = (str) => {
  if (typeof str.trim === "function") {
    str = str.trim()
  }
  return !isNaN(str) && !isNaN(parseFloat(str))
}

const formatValue = (x, decimals, bound) => {
  let name
  let value

  if (x.symbol) {
    name = x.symbol
  } else {
    name = x.name
  }

  if ("lower" in x) {
    switch (bound) {
      case "lower":
        value = x.lower
        break
      case "upper":
        value = x.upper
        break
      default:
        value = x.value
    }
  } else {
    value = x.value
  }

  if (isNumeric(value)) {
    value = Number(value)
  } else if (value == "") {
    value = "-"
  }

  if (typeof value == "number") {
    if (INTEGERS.includes(x.name)) {
      value = Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
      }).format(value)
    } else if (Math.abs(x.value) > 0.1) {
      value = Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value)
    } else {
      value = Intl.NumberFormat("en-US", {
        minimumSignificantDigits: decimals,
        maximumSignificantDigits: decimals,
      }).format(value)
    }

    if (SMOL.includes(name)) {
      if (value.charAt(0) === "-") {
        value = "-" + value.substring(2)
      } else {
        value = value.substring(1)

        if (name === "p") {
          if (x.value < 0.001) {
            value = "< .001"
          } else if (x.value == 1) {
            value = "1"
          }
        }
      }
    }
  }

  return value
}

const updateStatisticsOld = (statistics, replaceAll = false) => {
  const tidystatsURL = "https://www.tidystats.io/google-docs-statistic/#id="

  const doc = DocumentApp.getActiveDocument()
  const lock = LockService.getDocumentLock()

  lock.tryLock(0)
  if (!lock.hasLock()) {
    DocumentApp.getUi().alert(
      "The server seems busy at the moment. Perhaps the statistics are being updated. Please try again later."
    )
    return
  }

  const links = getAllLinks(tidystatsURL)
  const ids = []
  for (const link of links) {
    const rangeBuilder = doc.newRange()
    rangeBuilder.addElement(
      link.text,
      link.startOffset,
      link.endOffsetInclusive
    )
    doc.addNamedRange(link.id, rangeBuilder.build())
    if (ids.indexOf(link.id) === -1) {
      ids.push({ id: link.id, value: link.value })
    }
  }

  statistics = JSON.parse(statistics)
  let statistic, value
  let statisticsCount = 0

  for (const id of ids) {
    statistic = findStatistic(id.id, statistics)

    // Replace the statistic reported in the document with the new one, if there is one
    if (statistic) {
      // Check whether a lower or upper bound was reported
      const components = id.id.split("$")
      let bound
      if (components[components.length - 1].match(/lower|upper/)) {
        bound = components.pop()
      }
      value = formatValue(statistic, 2, bound)

      if (id.value != value) {
        statisticsCount++

        // Loop over the content controls items and update the statistics
        for (const myNamedRange of doc.getNamedRanges(id.id)) {
          // remove named range, update text, reset URL
          const myRange = myNamedRange.getRange()
          myNamedRange.remove()
          // update range elements
          for (const rangeElement of myRange.getRangeElements()) {
            if (rangeElement.isPartial()) {
              Logger.log("Partial")

              const tElement = rangeElement.getElement().asText()
              const startIndex = rangeElement.getStartOffset()
              const endIndex = rangeElement.getEndOffsetInclusive()

              Logger.log(tElement.getText())
              Logger.log(
                "startIndex: " + startIndex + "; endIndex: " + endIndex
              )

              tElement.insertText(endIndex + 1, value)
              tElement.deleteText(startIndex, endIndex)
            } else {
              const eElement = rangeElement.getElement()

              if (eElement.editAsText) {
                eElement.clear().asText().setText(value)
              } else {
                const parent = eElement.getParent()
                parent[parent.insertText ? "insertText" : "insertParagraph"](
                  parent.getChildIndex(eElement),
                  value
                )
                eElement.removeFromParent()
              }
            }
          }
        }
      }
    }
  }
}
