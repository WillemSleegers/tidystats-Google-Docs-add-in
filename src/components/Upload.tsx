import { ChangeEvent, useState, useEffect } from "react"
import { Button, Alert } from "@mui/material"
import { FileUpload } from "@mui/icons-material"
import { Tidystats } from "../classes/Tidystats"

type UploadProps = {
  setTidystats: Function
}

const Upload = (props: UploadProps) => {
  const { setTidystats } = props

  const [file, setFile] = useState<File>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handling file change")
    console.log(e.target.files)
    if (e.target.files) {
      if (e.target.files.length == 1) {
        setFile(e.target.files[0])
      }
    }
  }

  useEffect(() => {
    if (file) {
      if (file.type === "application/json") {
        const reader = new FileReader()
        reader.onload = () => {
          const data = JSON.parse(reader.result as string)
          const tidystats = new Tidystats(data)
          setTidystats(tidystats)
        }
        reader.readAsText(file)

        setShowErrorMessage(false)
      } else {
        setShowErrorMessage(true)
        setTidystats(null)
      }
    }
  }, [file])

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  return (
    <div style={{ margin: "1rem" }}>
      <Button
        id="fileUpload"
        variant="contained"
        component="label"
        disableElevation
        fullWidth
        startIcon={file ? null : <FileUpload />}
        style={{
          textTransform: "none",
          borderRadius: "100px",
          fontSize: "1rem",
          padding: "0.5rem",
        }}
      >
        {file ? file.name : "Upload statistics"}
        <input
          hidden
          type="file"
          accept="application/json"
          onChange={handleFileChange}
        />
      </Button>

      {showErrorMessage && (
        <Alert style={{ marginTop: "1rem" }} severity="error">
          File must be a tidystats JSON file.
        </Alert>
      )}
    </div>
  )
}

export { Upload }
