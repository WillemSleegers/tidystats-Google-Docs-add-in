function onOpen() {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Launch", "openSidebar")
    .addToUi()
}

function openSidebar() {
  return DocumentApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile("ui/index").setTitle("tidystats")
  )
}
