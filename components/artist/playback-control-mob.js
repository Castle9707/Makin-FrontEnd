import React, { useState, useEffect, useRef } from 'react'
import { Slider } from 'rsuite'
// import 'rsuite/dist/styles/rsuite-default.css'
// import './custom-slider.css'
import 'rsuite/Slider/styles/index.css'
import Image from 'next/image'

import {
  BsFillVolumeDownFill,
  BsVolumeUpFill,
  BsVolumeMuteFill,
} from 'react-icons/bs'
import {
  BsPlayCircle,
  BsPlayCircleFill,
  BsPauseCircle,
  BsPauseCircleFill,
} from 'react-icons/bs'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'

const PlaybackControlMob = ({
  player,
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNextTrack,
  onPreviousTrack,
  onSeek,
  onVolumeChange,
}) => {
  const [volume, setVolume] = useState(50)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressInterval = useRef(null)
  const lastPosition = useRef(0) // 記錄最後播放位置

  useEffect(() => {
    if (player) {
      player.getVolume().then((vol) => {
        setVolume(vol * 100)
      })

      const handleStateChange = (state) => {
        if (state) {
          setDuration(state.duration)
          setProgress(state.position)

          if (progressInterval.current) {
            clearInterval(progressInterval.current)
          }

          if (state.paused) {
            // 如果暫停，不要更新進度
            return
          }

          // 播放進度的邏輯
          progressInterval.current = setInterval(() => {
            setProgress((prev) => {
              const newProgress = prev + 1000
              // 還沒播完的話，記錄上次播放的位置
              if (newProgress < state.duration) {
                lastPosition.current = newProgress
                return newProgress
              } else {
                clearInterval(progressInterval.current)
                return prev
              }
            })
          }, 1000)
        }
      }

      player.addListener('player_state_changed', handleStateChange)

      //播放器卸載時，也移除事件監聽器
      return () => {
        player.removeListener('player_state_changed', handleStateChange)
        if (progressInterval.current) {
          clearInterval(progressInterval.current)
        }
      }
    }
  }, [player])

  // 處理暫停狀態
  useEffect(() => {
    if (!isPlaying && progressInterval.current) {
      clearInterval(progressInterval.current)
    } else if (isPlaying && !progressInterval.current) {
      // 恢復播放時，從上次的位置繼續
      setProgress(lastPosition.current)
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          // 更新進度的邏輯
          const newProgress = prev + 1000
          if (newProgress < duration) {
            lastPosition.current = newProgress
            return newProgress
          } else {
            clearInterval(progressInterval.current)
            return prev
          }
        })
      }, 1000)
    }
  }, [isPlaying, duration])

  const handleVolumeChange = (newValue) => {
    setVolume(newValue)
    onVolumeChange(newValue / 100)
  }

  // 手動控制時間軸的位置
  const handleProgressChange = (newValue) => {
    setProgress(newValue)
    lastPosition.current = newValue
    onSeek(newValue)
  }
  // 時間格式換算
  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // 確保從上次暫停的位置開始播放
  const handlePlay = () => {
    onPlay()
    player.seek(lastPosition.current)
  }
  return (
    <>
      <div className="position-sticky bottom-0 bg-dark outline">
        <div className="m-2 text-white d-flex align-items-center">
          {currentTrack ? (
            <>
              {/* 有專輯正在播放 */}
              <div className="m-2">
                <Image
                  width={50}
                  height={50}
                  src={currentTrack.album.images[1].url}
                  alt={currentTrack.name}
                />
              </div>
              <div className="d-flex flex-column ms-2">
                <div className="marquee mb-2">
                  <span className="chb-p">{currentTrack.name}</span>
                </div>
                <div className="chr-p-10 text-purple3">
                  {currentTrack.artists[0].name}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 未播放狀態 */}
              <div className="m-3">
                <Image
                  width={50}
                  height={50}
                  src="/images/artist/no-music.jpg"
                  alt="No music playing"
                />
              </div>
              <div className="chb-p mb-1">未播放</div>
            </>
          )}
          <div className="ms-auto me-2">
            {isPlaying ? (
              <BsPauseCircleFill
                onClick={onPause}
                className="text-white eng-h3 mx-2"
              />
            ) : (
              <BsPlayCircle
                onClick={handlePlay}
                className="text-white eng-h3 mx-2"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .outline {
            border: 1px solid #dbd7ff;
          }
          .marquee {
            position: relative;
            width: 200px;
            height: 18px;
            margin: auto;
            overflow: hidden;
          }
          .marquee span {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            padding-left: 100%;
            animation: run 8s infinite linear;
          }

          @keyframes run {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </>
  )
}

export default PlaybackControlMob
