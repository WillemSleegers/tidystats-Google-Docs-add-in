const unlinkAll = () => {
  lock.tryLock(0)
  if (!lock.hasLock()) {
    DocumentApp.getUi().alert(
      "The server seems busy at the moment. Perhaps other users are updating the statistics. Please try again later."
    )
    return
  }
  for (const link of getAllLinks()) {
    link.text.setLinkUrl(link.startOffset, link.endOffsetInclusive, null)
  }
  closeDialog()
  Utilities.sleep(1000)
}
