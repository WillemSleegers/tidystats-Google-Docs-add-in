import { Button } from "@mui/material"
import { Tidystats } from "../classes/Tidystats"
import { updateStatistics } from "../functions/gas"
import { useState } from "react"

type ActionsProps = {
  tidystats?: Tidystats
}

export const Actions = (props: ActionsProps) => {
  const { tidystats } = props

  const [disabled, setDisabled] = useState(false)
  const [status, setStatus] = useState("Update statistics")

  const handleClick = () => {
    setDisabled(true)
    setStatus("Updating...")
    updateStatistics(JSON.stringify(tidystats!.analyses), callback)
  }
  const callback = () => {
    setDisabled(false)
    setStatus("Update statistics")
  }

  return (
    <div style={{ margin: "1rem" }}>
      <h3>Update statistics</h3>
      <p>Update all statistics after uploading a new file.</p>
      <div>
        <Button
          variant="contained"
          disabled={disabled}
          disableElevation
          fullWidth
          onClick={handleClick}
        >
          {status}
        </Button>
      </div>
    </div>
  )
}
