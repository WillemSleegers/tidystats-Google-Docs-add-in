import { useState } from "react"
import {
  createTheme,
  ThemeProvider,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material"
import { BarChart, MiscellaneousServices, Help } from "@mui/icons-material"
import { Upload } from "./components/Upload"
import { Analyses } from "./components/Analyses"
import { Tidystats } from "./classes/Tidystats"
import { updateStatistics } from "./functions/gas"

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: "1rem",
      padding: "0.5rem",
    },
  },
  shape: {
    borderRadius: 100,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
})

function App() {
  const [tidystats, setTidystats] = useState<Tidystats>()
  const [value, setValue] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginBottom: "56px" }}>
        {value == 0 && (
          <>
            <Upload setTidystats={setTidystats} />
            {tidystats && <Analyses data={tidystats.analyses} />}
          </>
        )}
        {value == 1 && (
          <div style={{ margin: "1rem" }}>
            <h2>Actions</h2>
            <div>
              <Button
                variant="contained"
                disabled={tidystats ? false : true}
                disableElevation
                fullWidth
                onClick={() =>
                  updateStatistics(JSON.stringify(tidystats!.analyses))
                }
              >
                Update statistics
              </Button>
            </div>
          </div>
        )}
        {value == 2 && (
          <div style={{ margin: "1rem" }}>
            <h2>Support</h2>
            <p>
              For more information on how to use tidystats, including examples
              and FAQs, see the tidystats{" "}
              <a href="https://www.tidystats.io" target="_blank">
                website
              </a>
              .
            </p>
          </div>
        )}
      </div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
        sx={{
          position: "fixed",
          bottom: 0,
          width: "300px",
        }}
      >
        <BottomNavigationAction label="Analyses" icon={<BarChart />} />
        <BottomNavigationAction
          label="Actions"
          icon={<MiscellaneousServices />}
        />
        <BottomNavigationAction label="Support" icon={<Help />} />
      </BottomNavigation>
    </ThemeProvider>
  )
}

export default App
