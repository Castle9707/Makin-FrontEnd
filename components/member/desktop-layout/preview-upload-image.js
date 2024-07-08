import React, { useState, useEffect } from 'react'

export default function PreviewUploadImage({
  avatarImg = '',
  avatarBaseUrl = '',
  defaultImg = 'default.png',
  setSelectedFile,
  selectedFile,
}) {
  // 預覽圖片
  const [preview, setPreview] = useState('')

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleFileChang = (e) => {
    const file = e.target.files[0]

    if (file) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  const showImg = () => {
    if (selectedFile) {
      return preview
    }

    if (avatarImg) {
      return avatarBaseUrl + '/' + avatarImg
    }

    return avatarBaseUrl + '/' + defaultImg
  }

  return (
    <div className="image-upload text-center">
      <label htmlFor="file-input">
        <img
          src={showImg()}
          alt=""
          // width="240"
          // height="240"
          className="rounded-circle border border-5 border-purple1 wh-240"
        />
      </label>
      <input
        id="file-input"
        type="file"
        name="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChang}
      />
      <div className="text-center">
        <div className="chb-p">點按頭像可以上傳頭貼</div>
      </div>
      <style jsx>
        {`
          .image-upload > input {
            display: none;
          }
          .wh-240 {
            width: 240px;
            height: 240px;
          }
          @media (max-width: 575.98px) {
            /* CSS rules to apply */
            .wh-240 {
              width: 120px;
              height: 120px;
            }
          }
        `}
      </style>
    </div>
  )
}
