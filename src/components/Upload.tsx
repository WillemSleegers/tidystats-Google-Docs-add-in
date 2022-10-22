import { useRef, ChangeEvent, useState } from "react"

import { Tidystats } from "../classes/Tidystats"

type UploadProps = {
  setTidystats: Function
}

const Upload = (props: UploadProps) => {
  const { setTidystats } = props

  const fileInput = useRef<HTMLButtonElement>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleClick = () => {
    if (null !== hiddenFileInput.current) {
      hiddenFileInput.current.click()

      hiddenFileInput.current.value = "" // Reset the value so a new file can be selected
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      fileInput.current!.innerHTML = file.name

      if (file.type === "application/json") {
        const reader = new FileReader()
        reader.onload = () => {
          const text = reader.result
          const data = JSON.parse(text as string)
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
  }

  return (
    <div className="upload">
      <button
        id="fileUpload"
        className="action"
        ref={fileInput}
        aria-roledescription="Upload/cancel file"
        onClick={handleClick}
      >
        Upload statistics
      </button>
      <input
        className="display-none"
        type="file"
        accept="application/json"
        ref={hiddenFileInput}
        onChange={handleChange}
        onClick={handleClick}
      />
      {showErrorMessage && (
        <p className="error">File must be a tidystats JSON file.</p>
      )}
    </div>
  )
}

export { Upload }
