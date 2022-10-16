function showHelp() {
  var html = HtmlService.createHtmlOutputFromFile("help")
    .setWidth(400)
    .setHeight(300)
  DocumentApp.getUi().showModalDialog(html, "Help")
}
