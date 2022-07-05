import { FC } from 'react'
import { IDashboard } from 'types/dashboard'
import s from './Dashboard.module.scss'

interface IDashboardCard {
  lbl: string
  val: number
}

interface IDashboardProps {
  dashboard: IDashboard
}

const Dashboard: FC<IDashboardProps> = ({ dashboard }) => {
  const TotalCard: FC<IDashboardCard> = ({ lbl, val }) => {
    return (
      <div className={s.totalCard}>
        <div className={s.val}>{val}</div>
        <div className={s.lbl}>{lbl}</div>
      </div>
    )
  }

  return (
    <div className={s.dashboardMain}>
      <TotalCard lbl={'Total Patients'} val={dashboard.totalPatients} />
      <TotalCard
        lbl={'Total Fully vaccinated Patients'}
        val={dashboard.fullyVaccinated}
      />
      <TotalCard
        lbl={'Total Partially vaccinated Patients'}
        val={dashboard.partiallyVaccinated}
      />
      <TotalCard
        lbl={'Total Not vaccinated Patients'}
        val={dashboard.notVaccinated}
      />
      {/* <TotalCard
        lbl={'Total Mumbai Site Patients'}
        val={dashboard.mumbaiPatients}
      />
      <TotalCard
        lbl={'Total Banglore Site Patients'}
        val={dashboard.banglorePatients}
      /> */}
      <TotalCard
        lbl={'Total Covishield vaccinated Patients'}
        val={dashboard.covishieldPatients}
      />
      <TotalCard
        lbl={'Total Covaxin vaccinated Patients'}
        val={dashboard.covaxinPatients}
      />
      <TotalCard lbl={'Total Male Patients'} val={dashboard.malePatients} />
      <TotalCard lbl={'Total Female Patients'} val={dashboard.femalePatients} />
      <TotalCard lbl={'Total Other Gender Patients'} val={dashboard.otherPatients} />
    </div>
  )
}
export default Dashboard
