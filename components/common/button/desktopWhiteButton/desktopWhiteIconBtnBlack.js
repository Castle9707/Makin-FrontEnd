import React from 'react'
import { BsPlus } from 'react-icons/bs'

export default function DesktopWhiteIconBtnBlack({
  text = 'button',
  className = 'chb-h5',
  iconWidth = 48,
  iconHeight = 48,
  iconMarginRight = 6,
  icon: IconComponent = BsPlus,
}) {
  return (
    <>
      <button className={`DesktopWhiteIconBtnBlack ${className}`}>
        <IconComponent
          style={{
            marginRight: `${iconMarginRight}px`,
            width: `${iconWidth}px`,
            height: `${iconHeight}px`,
          }}
        />
        {text}
      </button>
      <style jsx>{`
        .DesktopWhiteIconBtnBlack {
          padding: 0px 14px 0px 6px;
          color: black;
          background-color: white;
          border: 1px solid #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .DesktopWhiteIconBtnBlack:hover {
          border: 1px solid #685beb;
          color: #685beb;
        }
      `}</style>
    </>
  )
}
