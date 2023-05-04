import { ReactNode } from "react"

type RowProps = {
  indented?: boolean
  hasBorder?: boolean
  children: ReactNode
}

export const Row = (props: RowProps) => {
  const { indented, hasBorder, children } = props

  return (
    <div
      style={{
        minHeight: "2.5rem",
        display: "flex",
        alignItems: "center",
        marginLeft: indented ? "1rem" : "",
        borderBottom: hasBorder ? "1px solid var(--gray)" : "",
      }}
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
      style={{
        width: isHeader ? "100%" : "5rem",
        fontWeight: isBold ? "bold" : "normal",
      }}
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

  return <div style={{ flexGrow: 1 }}>{children}</div>
}
