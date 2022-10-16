function onOpen() {
  DocumentApp.getUi()
    .createMenu("tidystats")
    .addItem("Open tidystats", "showSidebar")
    .addItem("Help", "showHelp")
    .addToUi()
}
