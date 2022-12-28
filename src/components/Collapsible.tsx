import { ReactNode, useState } from "react"
import { Button } from "./Buttons"
import { Row, RowName } from "./Row"
import { ChevronDown, ChevronRight, Table } from "./Icons"

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
    <>
      <div
        style={{
          background: isPrimary && "var(--gray)",
          fontStyle: isOpen && "italic",
        }}
      >
        <Row>
          {!isOpen && (
            <Button onClick={toggleOpen}>
              <ChevronRight width={8} height={12} />
            </Button>
          )}

          {isOpen && (
            <Button onClick={toggleOpen}>
              <ChevronDown width={12} height={8} />
            </Button>
          )}

          <RowName isHeader={true}>{header}</RowName>

          {onInsertClick && (
            <Button onClick={onInsertClick}>
              <Table width={14} height={14} />
            </Button>
          )}
        </Row>
      </div>
      {isOpen && <div>{children}</div>}
    </>
  )
}
