import { Logo } from "./Icons"

export const Header = () => {
  return (
    <div className="mb-1 m-n1 p-1 bg-gray flex align-items gap-2">
      <Logo width={32} height={32} />
      <h1>tidystats</h1>
    </div>
  )
}
