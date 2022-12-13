function insertText(x) {
  // Insert some text at the cursor position and make it bold.
  var cursor = DocumentApp.getActiveDocument().getCursor()
  if (cursor) {
    // Attempt to insert text at the cursor position. If the insertion returns null, the cursor's
    // containing element doesn't allow insertions, so show the user an error message.
    var element = cursor.insertText(x)
    if (element) {
      element.setBold(true)
    } else {
      DocumentApp.getUi().alert("Cannot insert text here.")
    }
  } else {
    DocumentApp.getUi().alert("Cannot find a cursor.")
  }
}
