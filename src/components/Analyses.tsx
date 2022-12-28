import { Analysis } from "../classes/Analysis"
import { Collapsible } from "./Collapsible"
import { Groups } from "./Groups"
import { Statistics } from "./Statistics"
import { Row, RowName } from "./Row"
import { updateStatistics } from "../functions/gasFunctions"

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
            isPrimary
          >
            <Row indented hasBorder>
              <RowName isHeader={false} isBold>
                Method
              </RowName>
              <div>{x.method}</div>
            </Row>
            {statistics && <Statistics data={statistics} />}
            {groups && <Groups data={groups} />}
          </Collapsible>
        )
      })}
      <h2>Actions</h2>
      <div>
        <button
          aria-roledescription="Update statistics"
          onClick={updateStatistics}
        >
          Update statistics
        </button>
      </div>
    </>
  )
}
