function showSidebar() {
  var html =
    HtmlService.createHtmlOutputFromFile("sidebar").setTitle("tidystats")
  DocumentApp.getUi().showSidebar(html)
}
