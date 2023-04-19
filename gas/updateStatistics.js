const updateStatistics = () => {
  console.log("Updating statistics")
  Logger.log("Updating statistics")

  const lock = LockService.getDocumentLock()

  lock.tryLock(0)
  if (!lock.hasLock()) {
    DocumentApp.getUi().alert(
      "The server seems busy at the moment. Perhaps other users are updating the statistics. Please try again later."
    )
    return
  }

  const allLinks = getAllLinks()
  Logger.log(allLinks)
}
/**
 * Returns a flat array of links which appear in the active document's body.
 * Each link is represented by a simple Javascript object with the following
 * keys:
 *   - "section": {ContainerElement} the document section in which the link is
 *     found.
 *   - "isFirstPageSection": {Boolean} whether the given section is a first-page
 *     header/footer section.
 *   - "paragraph": {ContainerElement} contains a reference to the Paragraph
 *     or ListItem element in which the link is found.
 *   - "text": the Text element in which the link is found.
 *   - "startOffset": {Number} the position (offset) in the link text begins.
 *   - "endOffsetInclusive": the position of the last character of the link
 *      text, or null if the link extends to the end of the text element.
 *   - "url": the URL of the link.
 *
 * @param {boolean} mergeAdjacent Whether consecutive links which carry
 *     different attributes (for any reason) should be returned as a single
 *     entry.
 *
 * @returns {Array} the aforementioned flat array of links.
 */
function getAllLinks(mergeAdjacent) {
  var links = []

  var doc = DocumentApp.getActiveDocument()

  iterateSections(doc, function (section, sectionIndex, isFirstPageSection) {
    if (!("getParagraphs" in section)) {
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
      for (var el = par.getChild(0); el != null; el = el.getNextSibling()) {
        if (el.getType() != DocumentApp.ElementType.TEXT) {
          continue
        }

        // go over all styling segments in text element
        var attributeIndices = el.getTextAttributeIndices()
        var lastLink = null
        attributeIndices.forEach(function (startOffset, i, attributeIndices) {
          var url = el.getLinkUrl(startOffset)

          if (url != null) {
            // we hit a link
            var endOffsetInclusive =
              i + 1 < attributeIndices.length
                ? attributeIndices[i + 1] - 1
                : null

            // check if this and the last found link are continuous
            if (
              mergeAdjacent &&
              lastLink != null &&
              lastLink.url == url &&
              lastLink.endOffsetInclusive == startOffset - 1
            ) {
              // this and the previous style segment are continuous
              lastLink.endOffsetInclusive = endOffsetInclusive
              return
            }

            lastLink = {
              section: section,
              isFirstPageSection: isFirstPageSection,
              paragraph: par,
              textEl: el,
              startOffset: startOffset,
              endOffsetInclusive: endOffsetInclusive,
              url: url,
            }

            links.push(lastLink)
          }
        })
      }
    })
  })

  return links
}

/**
 * Calls the given function for each section of the document (body, header,
 * etc.). Sections are children of the DocumentElement object.
 *
 * @param {Document} doc The Document object (such as the one obtained via
 *     a call to DocumentApp.getActiveDocument()) with the sections to iterate
 *     over.
 * @param {Function} func A callback function which will be called, for each
 *     section, with the following arguments (in order):
 *       - {ContainerElement} section - the section element
 *       - {Number} sectionIndex - the child index of the section, such that
 *         doc.getBody().getParent().getChild(sectionIndex) == section.
 *       - {Boolean} isFirstPageSection - whether the section is a first-page
 *         header/footer section.
 */
function iterateSections(doc, func) {
  // get the DocumentElement interface to iterate over all sections
  // this bit is undocumented API
  var docEl = doc.getBody().getParent()

  var regularHeaderSectionIndex =
    doc.getHeader() == null ? -1 : docEl.getChildIndex(doc.getHeader())
  var regularFooterSectionIndex =
    doc.getFooter() == null ? -1 : docEl.getChildIndex(doc.getFooter())

  for (var i = 0; i < docEl.getNumChildren(); ++i) {
    var section = docEl.getChild(i)

    var sectionType = section.getType()
    var uniqueSectionName
    var isFirstPageSection =
      i != regularHeaderSectionIndex &&
      i != regularFooterSectionIndex &&
      (sectionType == DocumentApp.ElementType.HEADER_SECTION ||
        sectionType == DocumentApp.ElementType.FOOTER_SECTION)

    func(section, i, isFirstPageSection)
  }
}
