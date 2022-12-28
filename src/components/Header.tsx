import { Logo } from "./Icons"

export const Header = () => {
  return (
    <div
      style={{
        marginTop: "-1rem",
        marginRight: "-1rem",
        marginBottom: "1rem",
        marginLeft: "-1rem",
        padding: "1rem",
        background: "var(--gray)",
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo width={42} height={42} />
      <h1 style={{ fontSize: "2rem" }}>
        <b>tidystats</b>
      </h1>
    </div>
  )
}
