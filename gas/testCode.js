function showTest() {
  var html = HtmlService.createHtmlOutputFromFile("test")
    .setWidth(400)
    .setHeight(300)
  DocumentApp.getUi().showModalDialog(html, "My test dialog")
}
