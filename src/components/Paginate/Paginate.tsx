import { FC } from 'react'
import { TPatients } from 'types/patient'
import s from './Paginate.module.scss'

interface IPaginate {
  data: TPatients
  setData: (patients: TPatients) => void
  itemsPerPage: number
}

const Paginate: FC<IPaginate> = ({data, setData, itemsPerPage}) => {
  return (
    <div>
      <div className={s.pageNumberContainer}>
        <div className={s.arrowContainer}>
          <div>
            <span className={s.leftArrow}>{'<'}</span>
          </div>
        </div>
        <div className={s.pageNumberWrapper}></div>
        <div className={s.arrowContainer}>
          <div>
            <span className={s.rightArrow}>{'>'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paginate
