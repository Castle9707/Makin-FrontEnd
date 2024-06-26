import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/home.module.css'

export default function Index() {
  return (
    <>
      {/* banner一張（影片輪播） start */}
      <div className="bannerSty bg-purple3">
        <div className="row">
          <div className={`col-12 d-none d-md-block mx-auto text-white text-center ${styles['mt-120']}`}>
            <h1 className="eng-h3 my-2">Lose Yourself in Music</h1>
            <h1 className="eng-h3 my-2">Find Yourself in the Festivity</h1>
            <p className="eng-h5 my-2">
              <button className="btn btn-lg btn-primary" href="#">
                MY ACCOUNT
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* banner（影片輪播） end */}
      {/* <div className="container" > */}
      <div className={`row mb-5 ${styles['mt-120']}`}>
        <div className="d-flex flex-column align-items-center">
          <h1 className="eng-h3 text-white">Activities</h1>
          <h3 className="chb-h5 text-purple3">給你最盛大的視覺與聽覺饗宴</h3>
        </div>
      </div>
      {/* 第一個活動 start */}
      <div className={`row ${styles['mb-120']}`}>
        <div className={`col-md-7 col-12 p-2 ${styles['ov-hide']} ${styles['img-borderA']}`}>
          <div className={`${styles['custom-bg-01']}`} />
        </div>
        <div className="col-md-5 col-12">
          <div className="d-flex flex-column gap-3 ms-md-5 ms-0 mt-5">
            <h4 className="eng-h6 text-purple1">#Concert</h4>
            <h3 className="eng-h5 text-purple3">07/24</h3>
            <h1 className="chb-h3 text-purple3">建宮蓋廟</h1>
            <h6 className="chb-p text-white">
              演出活演出活動演出活動演出活動演出活動演出活動演出活動演出活動演出活動演出活動演出活動動
            </h6>
            <div className="row text-nowrap">
              <div className="col-3">
                <button className="btn btn-outline-secondary">活動資訊</button>
              </div>
              <div className="col-3">
                <button className="btn btn-primary">立即購票</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 第一個活動 end */}
      {/* 第二個活動 start */}
      <div className="row">
        <div className={`col-md-7 col-12 p-2 order-md-2 ${styles.cover} ${styles['img-borderA']}`}>
          <div className={`${styles['custom-bg-02']}`} />
        </div>
        <div className="col-md-5 col-12 order-md-1">
          <div className="d-flex flex-column gap-3 me-md-5 me-0 mt-5">
            <h4 className="eng-h6 text-purple1">#MusicFest</h4>
            <h3 className="eng-h5 text-purple3">05/22</h3>
            <h1 className="chb-h3 text-purple3">打狗祭</h1>
            <h6 className="chb-p text-white">
              演出活演出活動演出活動演出活動演出活動演出活動演出活動演出活動演出活動演出活動演出活動動
            </h6>
            <div className="row text-nowrap">
              <div className="col-3">
                <button className="btn btn-outline-secondary">活動資訊</button>
              </div>
              <div className="col-3">
                <button className="btn btn-primary">立即購票</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 第二個活動 end */}
      {/* 音樂人 start */}
      <>
        {/* 背景畫面待修改 */}
        <div className={`row mb-5 ${styles['mt-120']} ${styles['bg-img-flow']}`}>
          <div className="d-flex flex-column align-items-center">
            <h1 className="eng-h3 text-white">Discover More</h1>
            <h3 className="chb-h5 text-purple1">挖掘你還未聽過的好聲音</h3>
          </div>
        </div>
        <div className={`row d-flex justify-content-md-center justify-content-around align-items-center ${styles['mt-80']} ${styles['mb-120']}`}>
          {/* 最大那顆，到時候要隨著滑鼠事件移動 */}
          <div className="col-md-4 col-8 d-flex flex-column align-items-center order-md-3 mb-5 mb-md-0">
            <img
              src="https://i.postimg.cc/dtx1T54J/m-S62j-SACo-Ptq-Bo-YSHPi-Rwp.jpg"
              className={`rounded-circle mb-4 ${styles['artist-img-l']}`}
            />
            <h4 className="chb-h6 text-white">音樂人</h4>
          </div>
          {/* 其他顆 */}
          <div className="col-md-2 col-5 d-flex flex-column align-items-center order-md-1 mb-5 mb-md-0">
            <img
              src="https://i.postimg.cc/BbjpZhmX/Wmwi-Dkfdq-VH87seo-RLnge-U.jpg"
              className={`rounded-circle mb-4 ${styles['artist-img-s']}`}
            />
            <h4 className="chb-h6 text-white">音樂人</h4>
          </div>
          <div className="col-md-2 col-5 d-flex flex-column align-items-center order-md-2 mb-5 mb-md-0">
            <img
              src="https://i.postimg.cc/BbjpZhmX/Wmwi-Dkfdq-VH87seo-RLnge-U.jpg"
              className={`rounded-circle mb-4 ${styles['artist-img-s']}`}
            />
            <h4 className="chb-h6 text-white">音樂人</h4>
          </div>
          <div className="col-md-2 col-5 d-flex flex-column align-items-center order-md-4">
            <img
              src="https://i.postimg.cc/BbjpZhmX/Wmwi-Dkfdq-VH87seo-RLnge-U.jpg"
              className={`rounded-circle mb-4 ${styles['artist-img-s']}`}
            />
            <h4 className="chb-h6 text-white">音樂人</h4>
          </div>
          <div className="col-md-2 col-5 d-flex flex-column align-items-center order-md-5">
            <img
              src="https://i.postimg.cc/BbjpZhmX/Wmwi-Dkfdq-VH87seo-RLnge-U.jpg"
              className={`rounded-circle mb-4 ${styles['artist-img-s']}`}
            />
            <h4 className="chb-h6 text-white">音樂人</h4>
          </div>
        </div>
      </>

      {/* 音樂人 end */}
      {/* </div> */}
    </>
  )
}
