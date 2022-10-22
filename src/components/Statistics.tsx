import { useEffect, useState } from "react"
import { Row, RowName, RowValue } from "./Row"
import { Button, Checkbox } from "./Buttons"
import { Gear, Plus } from "./Icons"
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

  const handleAddClick = () => {
    console.log("Inserting statistic")
  }

  return (
    <>
      <Row indentationLevel={4} hasBorder={true}>
        <RowName isHeader={true} isBold={true}>
          Statistics:
        </RowName>

        <Button onClick={handleAddClick}>
          <Gear className="fill-blue" width={16} height={16} />
        </Button>

        <Button onClick={handleAddClick}>
          <Plus width={14} height={14} />
        </Button>
      </Row>
      {items.map((x: itemsProps, index: number) => {
        const lastRow = index === items.length - 1
        return (
          <Row key={x.identifier} indentationLevel={8} hasBorder={!lastRow}>
            <RowName isHeader={false}>{x.name}</RowName>
            <RowValue>{x.value}</RowValue>
            <Checkbox onClick={handleAddClick} />
            <Button onClick={handleAddClick}>
              <Plus width={14} height={14} />
            </Button>
          </Row>
        )
      })}
    </>
  )
}
