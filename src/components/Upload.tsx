import { ChangeEvent, useState, useEffect } from "react"
import { Button, Alert } from "@mui/material"
import { Tidystats } from "../classes/Tidystats"

type UploadProps = {
  setTidystats: Function
}

const Upload = (props: UploadProps) => {
  const { setTidystats } = props

  const [file, setFile] = useState<File>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
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
    <>
      <Button
        id="fileUpload"
        variant="contained"
        component="label"
        disableElevation
        style={{ margin: "1rem", textTransform: "none" }}
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
        <Alert severity="error">File must be a tidystats JSON file.</Alert>
      )}
    </>
  )
}

export { Upload }
