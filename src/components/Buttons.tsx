import { ReactNode, useState } from "react"

type ButtonProps = {
  onClick: Function
  children: ReactNode
}

export const Button = (props: ButtonProps) => {
  const { onClick, children } = props
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <div
      style={{
        width: "2.5rem",
        height: "2.5rem",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isHover && "var(--gray-hover)",
        color: "red",
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

type CheckboxProps = {
  onClick: Function
}

export const Checkbox = (props: CheckboxProps) => {
  const { onClick } = props

  const handleClick = () => {
    onClick()
  }

  return (
    <div
      style={{
        width: "3rem",
        height: "3rem",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      <input type="checkbox" />
    </div>
  )
}
