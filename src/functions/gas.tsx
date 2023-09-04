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

export const updateStatistics = (x: string, callback: any) => {
  google.script.run.withSuccessHandler(callback).updateStatistics(x)
}

export const insertTable = (name: string, x: string) => {
  google.script.run.updateStatistics(name, x)
}

export const unlinkLinks = () => {
  google.script.run.unlinkLinks()
}
