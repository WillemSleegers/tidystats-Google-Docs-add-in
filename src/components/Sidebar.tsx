import { useState } from "react"
import { Tidystats } from "../classes/Tidystats"
import { Logo } from "./Logo"
import { Upload } from "./Upload"
import { Analyses } from "./Analyses"

export const Sidebar = () => {
  const [tidystats, setTidystats] = useState<Tidystats>()

  return (
    <div className="sidebar">
      <Logo />
      <Upload setTidystats={setTidystats} />
      {tidystats && <Analyses data={tidystats.analyses} />}
    </div>
  )
}
