import { createRoot } from "react-dom/client"
import { Sidebar } from "../components/Sidebar"

const container = document.getElementById("sidebar-container")
const root = createRoot(container!)

root.render(<Sidebar />)
