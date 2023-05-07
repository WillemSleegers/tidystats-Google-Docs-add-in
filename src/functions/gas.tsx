export const insertStatistic = (x: string, id: string) => {
  google.script.run.insertStatistic(x, id)
}

type StatisticProps = {
  identifier: string
  name: string
  symbol?: string
  subscript?: string
  interval?: string
  level?: number
  value: string
  checked: boolean
}

export const insertStatistics = (x: StatisticProps[]) => {
  google.script.run.insertStatistics(x)
}

export const updateStatistics = (x: string) => {
  google.script.run.updateStatistics(x)
}

export const insertTable = () => {}
