import React, { FunctionComponent } from 'react'
import { Button } from 'antd'

import NetBoxFunctionArea from './dragging-area'

type NetBoxProps = {
  title?: String
}

const NetBoxPage: FunctionComponent<NetBoxProps> = () => {
  const handleFileDrop = (files: FileList) => {
    const n = files.length
    if (!n) return 
    
    for (let i = 0; i < n; ++ i) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const text = e.target?.result
        console.log(text)
      }
      
      reader.readAsText(files[i])
    }
  }

  return (
    <div className="net-box-page">
      <NetBoxFunctionArea handleDrop={handleFileDrop} />
    </div>
  )
}

export default NetBoxPage
