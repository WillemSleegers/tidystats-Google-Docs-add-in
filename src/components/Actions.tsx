import { Button } from "@mui/material"
import { Tidystats } from "../classes/Tidystats"
import { updateStatistics } from "../functions/gas"

type ActionsProps = {
  tidystats?: Tidystats
}

export const Actions = (props: ActionsProps) => {
  const { tidystats } = props

  console.log(tidystats)

  return (
    <div style={{ margin: "1rem" }}>
      <h3>Update statistics</h3>
      <p>Update all statistics after uploading a new file.</p>
      <div>
        <Button
          variant="contained"
          disabled={tidystats ? false : true}
          disableElevation
          fullWidth
          onClick={() => updateStatistics(JSON.stringify(tidystats!.analyses))}
        >
          Update statistics
        </Button>
      </div>
    </div>
  )
}
