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
      className={`button-size-1 shrink-0 flex justify-content align-items ${
        isHover ? "hover-gray" : ""
      }`}
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
      className="button-size-1 shrink-0 flex justify-content align-items"
      onClick={handleClick}
    >
      <input type="checkbox" />
    </div>
  )
}
