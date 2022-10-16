function onOpen() {
  DocumentApp.getUi()
    .createMenu("tidystats")
    .addItem("Show sidebar", "showSidebar")
    .addItem("Show test", "showTest")
    .addToUi()
}
