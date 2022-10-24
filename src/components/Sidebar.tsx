import { useState } from "react"
import { Header } from "./Header"
import { Upload } from "./Upload"
import { Analyses } from "./Analyses"
import { Tidystats } from "../classes/Tidystats"

export const Sidebar = () => {
  const [tidystats, setTidystats] = useState<Tidystats>()

  return (
    <div className="sidebar">
      <Header />
      <Upload setTidystats={setTidystats} />
      {tidystats && <Analyses data={tidystats.analyses} />}
    </div>
  )
}
