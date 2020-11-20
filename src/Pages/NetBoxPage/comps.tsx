import React from 'react'
import { Progress } from 'antd'

import { BoxFileClass } from './types'

type DescriptionCompType = {
  boxFile: BoxFileClass
}

const Pending = () => (
  <span style={{color: "#666", fontStyle: "italic"}}>Pending...</span>
)

export const DescriptionComp: React.FunctionComponent<DescriptionCompType> = ({ boxFile }) => {
  const { loadingStatus, description, size } = boxFile
  if (!loadingStatus) return (<>
    {description}
  </>)

  const { loadType, loadedSize, status } = loadingStatus
  if (status === 'pending') return (<Pending />)
  
  const finished: boolean = status === "finished"
  let progress = size === 0 ? 0 : loadedSize / size
  if (!finished) progress = Math.min(progress, 0.999)

  const color = finished
    ? '#52c41a'
    : loadType === 'upload'
      ? '#faad14'
      : '#1890ff'

  return (<Progress
    percent={progress * 100}
    size="small"
    strokeColor={color}
    status={finished ? 'success' : 'active'}
    format={() => ''}
  />)
}
