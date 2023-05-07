import { useEffect, useState } from "react"
import { Row, RowName, RowValue } from "./Row"
import { Statistic, RangedStatistic } from "../classes/Statistic"
import { formatValue } from "../functions/formatValue"
import { insertStatistic, insertStatistics } from "../functions/gas"

import { Checkbox } from "@mui/material"
import { Settings, Add } from "@mui/icons-material"

import { IconButton } from "@mui/material"

type StatisticsProps = {
  data: Statistic[]
}

type statistic = {
  identifier: string
  name: string
  symbol?: string
  subscript?: string
  interval?: string
  level?: number
  value: string
  checked: boolean
}

export const Statistics = (props: StatisticsProps) => {
  const { data } = props

  const [statistics, setStatistics] = useState<statistic[]>()
  const [clickedSettings, setClickedSettings] = useState(false)

  useEffect(() => {
    const initialStatistics: statistic[] = []

    data.forEach((x) => {
      const item = {
        identifier: x.identifier,
        name: x.name,
        symbol: x.symbol,
        subscript: x.subscript,
        value: formatValue(x, 2),
        checked: true,
      }
      initialStatistics.push(item)

      if ("level" in x) {
        const rangedStatistic = x as RangedStatistic

        const item_lower = {
          identifier: x.identifier + "$lower",
          name: "LL",
          interval: rangedStatistic.interval,
          level: rangedStatistic.level,
          value: formatValue(rangedStatistic, 2, "lower"),
          checked: true,
        }
        const item_upper = {
          identifier: x.identifier + "$upper",
          name: "UL",
          interval: rangedStatistic.interval,
          level: rangedStatistic.level,
          value: formatValue(rangedStatistic, 2, "upper"),
          checked: true,
        }

        initialStatistics.push(item_lower)
        initialStatistics.push(item_upper)
      }
    })

    setStatistics(initialStatistics)
  }, [])

  const toggleCheck = (name: string) => {
    setStatistics(
      statistics!.map((item) =>
        item.name === name ||
        (name === "LL" && item.name == "UL") ||
        (name === "UL" && item.name == "LL")
          ? { ...item, checked: !item.checked }
          : item
      )
    )
  }

  return (
    <>
      <Row indented hasBorder>
        <RowName isHeader isBold>
          Statistics:
        </RowName>
        <IconButton onClick={() => setClickedSettings((prev) => !prev)}>
          <Settings />
        </IconButton>
        <IconButton onClick={() => insertStatistics(statistics!)}>
          <Add />
        </IconButton>
      </Row>
      <div style={{ marginLeft: "2rem" }}>
        {statistics &&
          statistics.map((x, index: number) => {
            const lastRow = index === statistics.length - 1
            return (
              <Row
                key={x.identifier}
                indented={x.name === "UL" || x.name === "LL"}
                hasBorder={!lastRow}
              >
                <RowName isHeader={false}>
                  {x.symbol ? x.symbol : x.name}
                  {x.subscript && <sub>{x.subscript}</sub>}
                </RowName>
                <RowValue>{x.value}</RowValue>
                {clickedSettings && (
                  <Checkbox
                    checked={x.checked}
                    onClick={() => toggleCheck(x.name)}
                  />
                )}

                <IconButton
                  onClick={() => insertStatistic(x.value, x.identifier)}
                >
                  <Add />
                </IconButton>
              </Row>
            )
          })}
      </div>
    </>
  )
}
