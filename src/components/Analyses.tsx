import { Analysis } from "../classes/Analysis"
import { Collapsible } from "./Collapsible"
import { Groups } from "./Groups"
import { Statistics } from "./Statistics"
import { Row, RowName } from "./Row"

type AnalysesProps = {
  data: Analysis[]
}

export const Analyses = (props: AnalysesProps) => {
  const { data } = props

  return (
    <>
      <h2>Analyses</h2>
      {data.map((x: Analysis) => {
        const statistics = x.statistics
        const groups = x.groups

        return (
          <Collapsible
            key={x.identifier}
            open={false}
            header={x.identifier}
            headerBackground="gray"
          >
            <Row indentationLevel={4} hasBorder={true}>
              <RowName isHeader={false} isBold={true}>
                Method
              </RowName>
              <div>{x.method}</div>
            </Row>
            {statistics && <Statistics data={statistics} />}
            {groups && <Groups data={groups} />}
          </Collapsible>
        )
      })}
    </>
  )
}
