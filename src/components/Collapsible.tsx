import { ReactNode, useState } from "react"
import { Button } from "./Buttons"
import { Row, RowName } from "./Row"
import { ChevronDown, ChevronRight, Table } from "./Icons"

interface CollapsibleProps {
  header: string
  headerBackground?: "gray"
  open?: boolean
  handleInsertClick?: Function
  children: ReactNode
}

export const Collapsible = (props: CollapsibleProps) => {
  const { open, header, headerBackground, handleInsertClick, children } = props
  const [isOpen, setIsOpen] = useState(open)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div>
      <Row background={headerBackground}>
        {!isOpen && (
          <Button onClick={toggleOpen}>
            <ChevronRight width={8} height={12} />
          </Button>
        )}

        {isOpen && (
          <Button onClick={toggleOpen}>
            <ChevronDown width={12} height={8} className="fill-blue" />
          </Button>
        )}

        <RowName isHeader={true}>{header}</RowName>

        {handleInsertClick && (
          <Button onClick={handleInsertClick}>
            <Table width={14} height={14} />
          </Button>
        )}
      </Row>
      {isOpen && <div>{children}</div>}
    </div>
  )
}
