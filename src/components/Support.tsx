import { Link } from "@mui/material"

export const Support = () => {
  return (
    <div style={{ margin: "1rem" }}>
      <h4>How to Use</h4>
      <ol style={{ marginTop: "0", paddingInlineStart: "1rem" }}>
        <li>
          Use the tidystats{" "}
          <Link href="https://www.tidystats.io/r-package/">R package</Link> to
          save statistics into a JSON file.
        </li>
        <li>Upload the JSON file in the Statistics tab.</li>
        <li>Click on statistics to insert them into the document.</li>
      </ol>

      <p>
        For more information on how to use tidystats, including examples and
        FAQs, see the tidystats{" "}
        <Link href="https://www.tidystats.io" target="_blank">
          website
        </Link>
        .
      </p>
    </div>
  )
}
