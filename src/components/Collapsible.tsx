import { ReactNode, useState } from "react"

interface CollapsibleProps {
  open: boolean
  label: string
  identifier?: boolean
  children: ReactNode
}

export const Collapsible = (props: CollapsibleProps) => {
  const { open, label, identifier, children } = props
  const [isOpen, setIsOpen] = useState(open)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="collapsible">
      <div
        className={`collapsible-header row ${
          identifier ? "row-identifier" : ""
        }`}
      >
        {!isOpen && (
          <a className="chevron material-symbols-outlined" onClick={toggleOpen}>
            chevron_right
          </a>
        )}
        {isOpen && (
          <span
            className="chevron material-symbols-outlined"
            onClick={toggleOpen}
          >
            expand_more
          </span>
        )}

        <span>{label}</span>
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  )
}
