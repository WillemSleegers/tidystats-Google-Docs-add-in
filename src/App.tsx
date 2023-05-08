import { useState, SyntheticEvent } from "react"
import {
  createTheme,
  ThemeProvider,
  Button,
  Link,
  Tabs,
  Tab,
} from "@mui/material"
import { Header } from "./components/Header"
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

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="Statistics" {...a11yProps(0)} />
        <Tab label="Actions" {...a11yProps(1)} />
        <Tab label="Support" {...a11yProps(2)} />
      </Tabs>

      <div style={{ marginBottom: "56px" }}>
        {value == 0 && (
          <>
            <Upload setTidystats={setTidystats} />
            {tidystats && <Analyses data={tidystats.analyses} />}
          </>
        )}
        {value == 1 && (
          <div style={{ margin: "1rem" }}>
            <h3>Update statistics</h3>
            <p>Update all statistics after uploading a new file.</p>
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
            <h4>How to Use</h4>
            <ol style={{ marginTop: "0", paddingInlineStart: "1rem" }}>
              <li>
                Use the tidystats{" "}
                <Link href="https://www.tidystats.io/r-package/">
                  R package
                </Link>{" "}
                to save statistics into a JSON file.
              </li>
              <li>Upload the JSON file in the Statistics tab.</li>
              <li>Click on statistics to insert them into the document.</li>
            </ol>

            <p>
              For more information on how to use tidystats, including examples
              and FAQs, see the tidystats{" "}
              <Link href="https://www.tidystats.io" target="_blank">
                website
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
