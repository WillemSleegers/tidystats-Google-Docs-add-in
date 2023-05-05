import { ReactNode, useState } from "react"
import { IconButton } from "@mui/material"
import { ExpandMore, ChevronRight, TableChart } from "@mui/icons-material"
import { Row, RowName } from "./Row"

interface CollapsibleProps {
  header: string
  isPrimary?: boolean
  onInsertClick?: Function
  open?: boolean
  children: ReactNode
}

export const Collapsible = (props: CollapsibleProps) => {
  const { header, isPrimary, onInsertClick, open, children } = props
  const [isOpen, setIsOpen] = useState(open)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: isPrimary ? "var(--gray)" : "white",
          borderRadius: "100px",
          fontStyle: isOpen ? "italic" : "normal",
        }}
      >
        <Row>
          {!isOpen && (
            <IconButton onClick={toggleOpen}>
              <ChevronRight />
            </IconButton>
          )}

          {isOpen && (
            <IconButton onClick={toggleOpen}>
              <ExpandMore />
            </IconButton>
          )}

          <RowName isHeader={true}>{header}</RowName>

          {onInsertClick && (
            <IconButton>
              <TableChart />
            </IconButton>
          )}
        </Row>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  )
}
