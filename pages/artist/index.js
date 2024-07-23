import React from 'react'
import { useEffect, useState, useRef } from 'react'

// 帶資料的api
import { ART_LIST } from '@/configs/api-path'
// import { getFavorites, addFavorite, removeFavorite } from '@/configs/fav-api'
// 路徑
import { useRouter } from 'next/router'
// 判斷登入
// import { useAuth } from '@/hooks/use-auth'
// import { useLogin } from '@/hooks/use-login'

// 先帶前端資料
import { artists } from '@/data/artist/artists-18'

// 內容元件
import Breadcrumbs from '@/components/common/breadcrumb/Breadcrumbs'
import BannerA from '@/components/Activity/banner-a'
import LeftBarArt from '@/components/artist/left-bar-art'
import ArtistItem from '@/components/artist/artist-item'
// import { useFav } from '@/hooks/use-Fav'

export default function Artist() {
  // const { favorite, handleToggleFav } = useFav()
  const router = useRouter()
  const topRef = useRef(null)
  // 會員相關，判斷是否登入 auth.isAuth
  // const { handleWakeLogin } = useLogin()
  // const { auth } = useAuth()

  // 活動資料陣列
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  // 查詢條件用(這裡用的初始值都與伺服器的預設值一致)
  const [keyword, setKeyword] = useState('')
  const [genres, setGenres] = useState('')

  // 麵包屑 內容定義
  const breadcrumbsURL = [
    { label: '首頁', href: '/' },
    { label: '音樂人', href: '/artist' },
  ]

  // 與伺服器作fetch獲得資料(建議寫在useEffect上面與外面比較容易維護管理)
  const getArtist = async (params = {}) => {
    // 轉換為查詢字串
    // console.log(router.query) // 是空的
    console.log(params) // keyword, actClass, area, dataRange
    const searchParams = new URLSearchParams(params)
    const url = `${ART_LIST}?${searchParams.toString()}`

    // 使用try-catch陳述式，讓和伺服器連線程式作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      if (resData.success === true) {
        // 檢查是否為陣列資料類型(基本保護)
        if (Array.isArray(resData.rows)) {
          // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)
          setData(resData)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 按下搜尋按鈕
  const handleSearch = (e) => {
    e.preventDefault()

    const params = {
      // sort: orderby.sort,
      // order: orderby.order,
      keyword: keyword,
      genres: genres,
    }
    console.log('params1')
    console.log(params)

    getArtist(params)
    scrollToTop()
  }

  // 按下Enter按鈕
  const handleKeyDown = (e) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch(e)
    }
  }

  // 滾動到Top
  const scrollToTop = (e) => {
    //console.log('scrollToTop called')
    if (topRef.current) {
      console.log('topRef.current:', topRef.current)
      topRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.log('topRef.current is null')
    }
  }

  // 頁面重新渲染時：取得列表、搜尋條件
  useEffect(() => {
    const params = {
      keyword: keyword,
      genres: genres,
    }

    getArtist(params)
    console.log('params2')
    console.log(params)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsURL} />
      <BannerA />
      <div ref={topRef}></div>
      <div className="music-container mt-3 mt-md-5">
        <div className="row">
          <LeftBarArt
            classValue={genres}
            onClassChange={(e) => {
              setGenres(e.target.value)
            }}
            nameValue={keyword}
            onNameChange={(e) => {
              setKeyword(e.target.value)
            }}
            handleSearch={handleSearch}
            handleKeyDown={handleKeyDown}
          />
          <div className="col-md-9 col-12 mb-5">
            <div className="chb-h4 mb-3 text-purple1">音樂人列表</div>
            <div className="row d-flex">
              {data.rows.map((r, i) => {
                return (
                  <ArtistItem
                    key={r.id}
                    // imgSrc={r.photo}
                    imgSrc={`/images/artist/${r.photoname}`}
                    artist_name={r.art_name}
                    artid={r.spotify_id}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
