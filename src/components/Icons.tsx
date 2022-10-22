type LogoProps = {
  width: number
  height: number
}

export const Logo = (props: LogoProps) => {
  const { width, height } = props

  return (
    <svg width={width} height={height} viewBox="0 0 224 224">
      <g>
        <path
          d="M219 119.003 L219 149.003 C219 154.003 219 154.003 214 157.003 L119 214.003 C114 217.003 113 217.003 112 217.003 111 217.003 110 217.003 105 214.003 L10 157.003 C5 154.003 5 154.003 5 149.003 L5 119.003 C5 124.003 5 124.003 10 127.003 L105 184.003 C110 187.003 111 187.003 112 187.003 113 187.003 114 187.003 119 184.003 L214 127.003 C219 124.003 219 124.003 219 119.003 Z"
          fill="#e59215"
          fillOpacity="1"
          stroke="none"
        />
        <path
          d="M219 74.003 L219 108.003 C219 113.003 219 113.003 214 116.003 L119 173.003 C114 176.003 113 176.003 112 176.003 111 176.003 110 176.003 105 173.003 L10 116.003 C5 113.003 5 113.003 5 108.003 L5 74.003 C5 75.003 5 79.003 10 82.003 L105 139.003 C110 142.003 111 142.003 112 142.003 113 142.003 114 142.003 119 139.003 L214 82.003 C219 79.003 219 75.003 219 74.003 Z"
          fill="#26587b"
          fillOpacity="1"
          stroke="none"
        />
        <path
          d="M219 74.003 C219 73.003 219 108.003 219 108.003 219 113.003 219 113.003 214 116.003 L119 173.003 C114 176.003 113 176.003 112 176.003 L112 142.003 C113 142.003 114 142.003 119 139.003 L214 82.003 C219 79.003 219 75.003 219 74.003 Z"
          fill="#1a415a"
          fillOpacity="1"
          stroke="none"
        />
        <path
          d="M10 66.003 L105 9.003 C110 6.003 111.013 5.982 112 6.003 113.013 6.024 114 6.003 119 9.003 L214 66.003 C219 69.003 219 74.003 219 74.003 219 74.003 219 79.003 214 82.003 L119 139.003 C114 142.003 113 142.003 112 142.003 111 142.003 110 142.003 105 139.003 L10 82.003 C5 79.003 5 75.003 5 74.003 5 73.003 5 69.003 10 66.003 Z M42 74.003 L112 116.003 182 74.003 112 32.003 Z"
          fill="#5b9bba"
          fillOpacity="1"
          stroke="none"
        />
        <path
          d="M112 6.003 C113 6.003 114 6.003 119 9.003 L214 66.003 C219 69.003 219 73.003 219 74.003 219 75.003 219 79.003 214 82.003 L119 139.003 C114 142.003 113 142.003 112 142.003 L112 116.003 182 74.003 112 32.003 Z"
          fill="#38728d"
          fillOpacity="1"
          stroke="none"
        />
        <path
          d="M97 101.003 L107 107 129 94 119 88 Z"
          fill="#e59215"
          fillOpacity="1"
          stroke="#e59215"
          strokeWidth="1"
          strokeOpacity="1"
          strokeLinejoin="round"
        />
        <path
          d="M147 59 L87 95 77 89.003 137 53 Z"
          fill="#e59215"
          fillOpacity="1"
          stroke="#e59215"
          strokeWidth="1"
          strokeOpacity="1"
          strokeLinejoin="round"
        />
        <path
          d="M107 59 L67 83 57 77 97 53 Z"
          fill="#e59215"
          fillOpacity="1"
          stroke="#e59215"
          strokeWidth="1"
          strokeOpacity="1"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

type ChevronRightProps = {
  width: number
  height: number
  className?: string
}

export const ChevronRight = (props: ChevronRightProps) => {
  const { width, height, className } = props

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 8 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        stroke="none"
        d="M 1.415 0 L 0 1.415 L 4.585 6 L 0 10.585 L 1.415 12 L 7.415 6 Z"
      />
    </svg>
  )
}

type ChevronDownProps = {
  width: number
  height: number
  className?: string
}

export const ChevronDown = (props: ChevronDownProps) => {
  const { width, height, className } = props

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 12 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        stroke="none"
        d="M 0 2 L 1.5 0.5 L 6 5 L 10.5 0.5 L 12 2 L 6 8 Z"
      />
    </svg>
  )
}

type GearProps = {
  width: number
  height: number
  className?: string
}

export const Gear = (props: GearProps) => {
  const { width, height, className } = props

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        stroke="none"
        d="M 14.007465 8.784 C 14.039465 8.528 14.063465 8.272 14.063465 8 C 14.063465 7.728001 14.039465 7.472 14.007465 7.216 L 15.695465 5.896 C 15.847466 5.776 15.887466 5.559999 15.791466 5.384 L 14.191465 2.616 C 14.095466 2.440001 13.879465 2.375999 13.703465 2.440001 L 11.711465 3.24 C 11.295465 2.92 10.847466 2.656 10.359466 2.456 L 10.055466 0.336 C 10.031466 0.144 9.863465 0 9.663465 0 L 6.463465 0 C 6.263465 0 6.095465 0.144 6.071465 0.336 L 5.767465 2.456 C 5.279465 2.656 4.831465 2.927999 4.415465 3.24 L 2.423465 2.440001 C 2.239465 2.368 2.031465 2.440001 1.935465 2.616 L 0.335465 5.384 C 0.231465 5.559999 0.279465 5.776 0.431465 5.896 L 2.119465 7.216 C 2.087465 7.472 2.063465 7.736 2.063465 8 C 2.063465 8.264 2.087465 8.528 2.119465 8.784 L 0.431465 10.104 C 0.279465 10.224 0.239465 10.44 0.335465 10.616 L 1.935465 13.384 C 2.031465 13.56 2.247465 13.624 2.423465 13.56 L 4.415465 12.76 C 4.831465 13.08 5.279465 13.344 5.767465 13.544 L 6.071465 15.664 C 6.095465 15.856 6.263465 16 6.463465 16 L 9.663465 16 C 9.863465 16 10.031466 15.856 10.055466 15.664 L 10.359466 13.544 C 10.847466 13.344 11.295465 13.072 11.711465 12.76 L 13.703465 13.56 C 13.887465 13.632 14.095466 13.56 14.191465 13.384 L 15.791466 10.616 C 15.887466 10.44 15.847466 10.224 15.695465 10.104 L 14.007465 8.784 L 14.007465 8.784 Z M 8 11 C 6.345714 11 5 9.654285 5 8 C 5 6.345715 6.345714 5 8 5 C 9.654285 5 11 6.345715 11 8 C 11 9.654285 9.654285 11 8 11 L 8 11 Z"
      />
    </svg>
  )
}

type PlusProps = {
  width: number
  height: number
  className?: string
}

export const Plus = (props: PlusProps) => {
  const { width, height, className } = props

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#3079ed"
        stroke="none"
        d="M 16 9 L 9 9 L 9 16 L 7 16 L 7 9 L 0 9 L 0 7 L 7 7 L 7 0 L 9 0 L 9 7 L 16 7 L 16 9 Z"
      />
    </svg>
  )
}

type TableProps = {
  width: number
  height: number
  className?: string
}

export const Table = (props: TableProps) => {
  const { width, height, className } = props

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#3079ed"
        stroke="none"
        d="M 12.5 0 L 1.5 0 C 0.67 0 0 0.67 0 1.5 L 0 12.5 C 0 13.33 0.67 14 1.5 14 L 12.5 14 C 13.33 14 14 13.33 14 12.5 L 14 1.5 C 14 0.67 13.33 0 12.5 0 Z M 1.5 5.25 L 4.17 5.25 L 4.17 12.5 L 1.5 12.5 L 1.5 5.25 Z M 8.33 5.25 L 8.33 12.5 L 5.67 12.5 L 5.67 5.25 L 8.33 5.25 Z M 12.5 12.5 L 9.83 12.5 L 9.83 5.25 L 12.5 5.25 L 12.5 12.5 Z M 12.5 3.75 L 1.5 3.75 L 1.5 1.5 L 12.5 1.5 L 12.5 3.75 Z"
      />
    </svg>
  )
}
