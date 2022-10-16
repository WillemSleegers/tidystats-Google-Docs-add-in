import { createRoot } from "react-dom/client"

const container = document.getElementById("help-container")
const root = createRoot(container!)

root.render(
  <>
    <h2>How to use tidystats</h2>
    <p>
      Run your analyses in R and use the <code>tidystats</code>{" "}
      <a href="https://www.tidystats.io/r-package/">R package</a> to create a
      JSON file containing all statistics. Upload this file via the 'Upload
      statistics' button to reveal a list containing the output of your
      statistical analyses. Click on groups or individual statistics to insert
      them in the document.
    </p>
  </>
)
