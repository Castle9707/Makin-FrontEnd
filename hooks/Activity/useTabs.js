import React, { useContext } from 'react'
import { createContext } from 'react'
import { useState } from 'react'

const TabContext = createContext(null)

export default function TabProviders({ children }) {
  const [activeTab, setActiveTab] = useState('allActivity') //頁籤 預設先給allActivity
  // const [ticketStatus, setTicketStatus] = useState('0') //下拉選單 預設是0， 0就是 "全部"

  const concertTickets = [
    // { id: 0, status: '全部', name: '全部' },
    { status: '未使用', name: '演唱會 1' },
    { status: '已使用', name: '演唱會 2' },
    // 添加更多票券資料
  ]

  const festivalTickets = [
    // { id: 0, status: '全部', name: '全部' },
    { status: '未使用', name: '音樂祭 1' },
    { status: '已使用', name: '音樂祭 2' },
    // 添加更多票券資料
  ]

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setTicketStatus('0') // 重置票券狀態
  }

  const handleStatusChange = (e) => {
    setTicketStatus(e.target.value)
  }

  const getFilteredTickets = () => {
    const tickets = activeTab === 'concert' ? concertTickets : festivalTickets
    if (ticketStatus === '0') {
      return tickets
    }
    return tickets.filter(
      (ticket) => ticket.status === (ticketStatus === '1' ? '未使用' : '已使用')
    )
  }
  return (
    <>
      {/* <TabContext.Provider
        value={{
          handleTabChange,
          handleStatusChange,
          getFilteredTickets,
          activeTab,
          ticketStatus,
        }}
      >
        {children}
      </TabContext.Provider> */}
    </>
  )
}

export const useTabs = () => useContext(TabContext)
