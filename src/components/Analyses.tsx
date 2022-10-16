import { Analysis } from "../classes/Analysis"
import { Collapsible } from "./Collapsible"
import { Groups } from "./Groups"
import { Statistics } from "./Statistics"

type AnalysesProps = {
  data: Analysis[]
}

export const Analyses = (props: AnalysesProps) => {
  const { data } = props

  return (
    <>
      <h3>Analyses</h3>
      {data.map((x: Analysis) => {
        const statistics = x.statistics
        const groups = x.groups

        return (
          <Collapsible
            key={x.identifier}
            open={false}
            label={x.identifier}
            identifier={true}
          >
            <div className="row">
              <div className="row-name">Method</div>
              <div className="row-value">{x.method}</div>
            </div>
            {statistics && <Statistics data={statistics} />}
            {groups && <Groups data={groups} />}
          </Collapsible>
        )
      })}
    </>
  )
}
