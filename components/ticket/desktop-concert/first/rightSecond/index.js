import React from 'react'
import TicketSeatBlock from './ticketSeatBlock'
import PriceTotal from './priceTotal'
import Info from './info'
import style from './rightSecond.module.scss'
import DesktopWhiteNoIconBtnPurple from '@/components/common/button/desktopWhiteButton/desktopWhiteNoIconBtnPurple'
import { useRouter } from 'next/router'
import { BsChevronLeft } from 'react-icons/bs'

export default function RightSecond({
  selectedSeats,
  onDeleteSeat,
  onDeleteAllSeat,
}) {
  const router = useRouter()

  const handleNext = () => {
    router.push('/ticket/concert/second')
  }

  return (
    <>
      {/* rightTitle */}
      <div className={`${style.rightTitle}`}>
        <button className="bg-white" onClick={onDeleteAllSeat}>
          <BsChevronLeft className={`${style.rightTitleIcon} text-black30`} />
        </button>
        <div className="chb-h6 text-black40">返回選擇區域</div>
      </div>

      {/* ticketSeatBlock */}
      {selectedSeats.length > 0 &&
        selectedSeats.map((seat) => (
          <TicketSeatBlock key={seat.id} seat={seat} onDelete={onDeleteSeat} />
        ))}

      {/* priceTotal */}
      <PriceTotal />

      {/* info */}
      <Info />

      {/* nextButton */}
      <DesktopWhiteNoIconBtnPurple
        text="下一步"
        className={`${style.nextButton} w-100 chb-h6`}
        onClick={handleNext}
      />
    </>
  )
}
