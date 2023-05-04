import { useState } from "react"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { BarChart, MiscellaneousServices, Help } from "@mui/icons-material"
import { Upload } from "./components/Upload"
import { Analyses } from "./components/Analyses"
import { Tidystats } from "./classes/Tidystats"
import { updateStatistics } from "./functions/gas"

function App() {
  const [tidystats, setTidystats] = useState<Tidystats>()
  const [value, setValue] = useState(0)

  return (
    <div className="sidebar">
      {value == 0 && (
        <>
          <Upload setTidystats={setTidystats} />
          {tidystats && <Analyses data={tidystats.analyses} />}
        </>
      )}
      {value == 1 && tidystats && (
        <>
          <h2>Actions</h2>
          <div>
            <button
              aria-roledescription="Update statistics"
              onClick={updateStatistics}
            >
              Update statistics
            </button>
          </div>
        </>
      )}

      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
        sx={{ position: "fixed", bottom: 0, width: "300px" }}
      >
        <BottomNavigationAction label="Analyses" icon={<BarChart />} />
        <BottomNavigationAction
          label="Actions"
          icon={<MiscellaneousServices />}
        />
        <BottomNavigationAction label="Support" icon={<Help />} />
      </BottomNavigation>
    </div>
  )
}

export default App
