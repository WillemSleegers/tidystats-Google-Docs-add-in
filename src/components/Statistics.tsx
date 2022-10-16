import { useEffect, useState } from "react"
import { Statistic, RangedStatistic } from "../classes/Statistic"
import { formatValue } from "../functions/formatValue"

type StatisticsProps = {
  data: Statistic[]
}

type itemsProps = {
  name: string
  identifier: string
  symbol: string
  subscript?: string
  value: string
  checked: boolean
}

export const Statistics = (props: StatisticsProps) => {
  const { data } = props

  const [items, setItems] = useState<Array<itemsProps>>([])

  useEffect(() => {
    const initialItems: itemsProps[] = []

    data.forEach((x) => {
      if ("level" in x) {
        const y = x as RangedStatistic

        const item = {
          identifier: y.identifier,
          name: y.name,
          symbol: y.symbol !== undefined ? y.symbol : y.name,
          subscript: y.subscript,
          value: formatValue(y, 2),
          checked: true,
        }
        const item_lower = {
          identifier: y.identifier + "$lower",
          name: "lower",
          //symbol: y.level * 100 + "% " + y.interval,
          symbol: y.interval,
          subscript: "lower",
          value: formatValue(y, 2, "lower"),
          checked: true,
        }
        const item_upper = {
          identifier: y.identifier + "$upper",
          name: "upper",
          //symbol: y.level * 100 + "% " + y.interval,
          symbol: y.interval,
          subscript: "upper",
          value: formatValue(y, 2, "upper"),
          checked: true,
        }
        initialItems.push(item)
        initialItems.push(item_lower)
        initialItems.push(item_upper)
      } else {
        const item = {
          identifier: x.identifier,
          name: x.name,
          symbol: x.symbol !== undefined ? x.symbol : x.name,
          subscript: x.subscript,
          value: formatValue(x, 2),
          checked: true,
        }
        initialItems.push(item)
      }
    })

    setItems(initialItems)
  }, [data])

  return (
    <>
      <div className="row">
        <div className="row-name">Statistics:</div>
      </div>
      {items.map((x: itemsProps) => {
        return (
          <div key={x.identifier} className="row">
            <div className="row-name">{x.name}</div>
            <div className="row-value">{x.value}</div>
          </div>
        )
      })}
    </>
  )
}
