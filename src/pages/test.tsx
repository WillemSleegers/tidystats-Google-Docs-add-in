import { createRoot } from "react-dom/client"
import { Test } from "../components/Test"

const container = document.getElementById("test-container")
const root = createRoot(container!)

root.render(<Test />)
