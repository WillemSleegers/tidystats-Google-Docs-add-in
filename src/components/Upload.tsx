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
    if (e.target.files) {
      if (e.target.files.length == 1) {
        console.log("Resetting")
        setTidystats(null) // Reset state in case a file was already uploaded
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
          console.log("Setting tidystats")
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
