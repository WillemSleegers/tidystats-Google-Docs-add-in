import { useState, SyntheticEvent } from "react"
import { createTheme, ThemeProvider, Tabs, Tab } from "@mui/material"
import { Header } from "./components/Header"
import { Upload } from "./components/Upload"
import { Analyses } from "./components/Analyses"
import { Tidystats } from "./classes/Tidystats"
import { Actions } from "./components/Actions"
import { Support } from "./components/Support"

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

export const App = () => {
  const [tidystats, setTidystats] = useState<Tidystats>()
  const [value, setValue] = useState(0)

  const tabProps = (index: number) => {
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
        aria-label="Tabs"
        variant="fullWidth"
      >
        <Tab label="Statistics" {...tabProps(0)} />
        <Tab label="Actions" {...tabProps(1)} />
        <Tab label="Support" {...tabProps(2)} />
      </Tabs>

      {value == 0 && (
        <>
          <Upload setTidystats={setTidystats} />
          {tidystats && <Analyses data={tidystats.analyses} />}
        </>
      )}
      {value == 1 && <Actions />}
      {value == 2 && <Support />}
    </ThemeProvider>
  )
}
