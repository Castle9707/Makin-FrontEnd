import React, { useCallback, useEffect, useState } from 'react'
import WhiteLayout from '@/components/layout/ticket-layout/desktopLayout/whiteLayout'
import Breadcrumbs from '@/components/common/breadcrumb/Breadcrumbs'
import ProgressBar from '@/components/ticket/progressBar'
import ActivityImage from '@/components/ticket/desktop-music-festival/activityImage'
import Info from '@/components/ticket/desktop-music-festival/info'
import SelectTicket from '@/components/ticket/desktop-music-festival/selectTicket'
import PhoneActivityImage from '@/components/ticket/phone-music-festival/phoneActivityImage'
import PhoneInfo from '@/components/ticket/phone-music-festival/phoneInfo'
import PhoneSelectTicket from '@/components/ticket/phone-music-festival/phoneSelectTicket'
import style from '@/styles/ticket/musicFestival/first.module.scss'
import DesktopWhiteNoIconBtnPurple from '@/components/common/button/desktopWhiteButton/desktopWhiteNoIconBtnPurple'
import PhoneWhiteNoIconBtnPurple from '@/components/common/button/phoneWhiteButton/phoneWhiteNoIconBtnPurple'
import { useRouter } from 'next/router'
import { useTicketContext } from '@/context/ticket/ticketContext'
import { GET_TICKET } from '@/configs/api-path'

export default function SelectSeat() {
  const breadcrumbsURL = [
    { label: '首頁', href: '/' },
    { label: '演出活動', href: '/activity' },
    { label: '一生到底', href: '/activity/[aid]' },
    { label: '選擇座位', href: '/ticket/concert/first' },
  ]

  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()
  const { actid } = router.query
  const {
    setActid,
    setTickets,
    selectedCount,
    tickets,
    setSelectedSeatDetails,
  } = useTicketContext()

  const fetchTickets = useCallback(
    async (actid) => {
      const url = `${GET_TICKET}/activity/${actid}`
      try {
        const res = await fetch(url, {
          credentials: 'include',
        })
        const resData = await res.json()
        if (resData.success) {
          setTickets(resData.rows)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [setTickets]
  )

  useEffect(() => {
    setActid(actid)
  }, [actid, setActid])

  useEffect(() => {
    if (actid) {
      fetchTickets(actid)
      setActid(actid)
    }
  }, [actid, setActid, fetchTickets])

  const handleNext = () => {
    const selectedTickets = tickets.slice(0, selectedCount)
    setSelectedSeatDetails(selectedTickets)
    router.push(`/ticket/musicFestival/payment/${actid}`)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 390)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* breadcrumb */}

      {isMobile ? (
        <Breadcrumbs breadcrumbs={breadcrumbsURL} className="" />
      ) : (
        <Breadcrumbs breadcrumbs={breadcrumbsURL} />
      )}

      {/* progressBar + timeCounter */}
      <ProgressBar />

      {/* Form */}
      <div className={`${style.thirdContainer}`}>
        {isMobile ? (
          <>
            {/* PhoneActivityImage */}

            <PhoneActivityImage />

            {/* PhoneInfo */}

            <PhoneInfo />

            {/* PhoneSelectTicket */}

            <PhoneSelectTicket />
          </>
        ) : (
          <>
            {/* activityImage */}

            <ActivityImage />

            {/* info */}

            <Info />

            {/* selectTicket */}

            <SelectTicket />
          </>
        )}
        {isMobile ? (
          <div style={{ margin: '20px 0' }}>
            <PhoneWhiteNoIconBtnPurple
              text="下一步"
              className="w-100 chb-h6"
              onClick={handleNext}
            />
          </div>
        ) : (
          <div style={{ margin: '60px 0' }}>
            <DesktopWhiteNoIconBtnPurple
              text="下一步"
              className="w-100 chb-h6"
              onClick={handleNext}
            />
          </div>
        )}
      </div>
    </>
  )
}

SelectSeat.getLayout = function getLayout(page) {
  return <WhiteLayout title="select-Seat">{page}</WhiteLayout>
}
