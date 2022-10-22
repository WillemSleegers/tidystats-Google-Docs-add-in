import { ReactNode } from "react"

type RowProps = {
  indentationLevel?: number
  background?: "gray"
  hasBorder?: boolean
  children: ReactNode
}

export const Row = (props: RowProps) => {
  const { indentationLevel, background, hasBorder, children } = props

  return (
    <div
      className={`min-h-6 flex align-items ms-${indentationLevel} bg-${background} ${
        hasBorder ? "border-bottom" : ""
      }`}
    >
      {children}
    </div>
  )
}

type RowNameProps = {
  isHeader?: boolean
  isBold?: boolean
  children: ReactNode
}

export const RowName = (props: RowNameProps) => {
  const { isHeader, isBold, children } = props

  return (
    <div
      className={`min-h-1 flex align-items ${isHeader ? "w-100" : "w-23"} ${
        isBold ? "bold" : "normal"
      }`}
    >
      {children}
    </div>
  )
}

type RowValueProps = {
  children: ReactNode
}

export const RowValue = (props: RowValueProps) => {
  const { children } = props

  return <div className="grow-1">{children}</div>
}
