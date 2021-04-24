import React, { FunctionComponent, useEffect } from 'react'
import { Button, Card, Spin, Table } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

import { withDraggable, ReceivedComponentProps } from '../../../Containers/draggable-wrapper'
import { DeleteBoxFilesAPI } from '../api'
import { TooltipWrapperProps, NetBoxFunctionAreaProps } from '../types'
import FileTable from './file-table'

const DropFileTooltipWrapper: React.FunctionComponent<TooltipWrapperProps> = ({ display }) => {
  const className = 'covered drop-tooltip faded'
  const ref = React.useRef<HTMLDivElement>(null)

  const TRANSITION_TIMEOUT = 300

  useEffect(() => {
    let timeout: any
    const element = ref.current
    if (!element) return

    if (!display) {
      // display -> hide, which means to stop dragging
      element.classList.add('faded')
      timeout = setTimeout(() => {
        element.classList.add('hidden')
      }, TRANSITION_TIMEOUT)
    } else {
      // hide -> display, which means to start dragging
      element.classList.remove('hidden')
      element.classList.remove('faded')
    }

    return function () {
      timeout && clearTimeout(timeout)
    }
  }, [display, ref])


  return (
    <div className={className} ref={ref}>

    </div>
  )
}

const NetBoxFunctionArea: FunctionComponent<NetBoxFunctionAreaProps & ReceivedComponentProps> = (props) => {
  const { isDragging, boxFiles, refreshBoxFiles, setLoading, loading } = props
  const onClick: any = () => {
    setLoading(true)
    DeleteBoxFilesAPI().then(res => {
      refreshBoxFiles()
    })
  }
  const refresh = () => {
    refreshBoxFiles()
  }

  return (
    <>
      <DropFileTooltipWrapper display={isDragging} />
      <Spin spinning={loading}>
        <Card bordered={false} style={{backgroundColor: 'transparent'}}>
          <div className="table-circle-button-group">
            <Button
              type="ghost"
              shape="circle"
              icon={<SyncOutlined />}
              onClick={refresh}
              loading={loading}
            />
          </div>
          {/* <Button onClick={refresh}>Refresh</Button>
          <Button onClick={onClick}>Clean</Button> */}
          <FileTable boxFiles={boxFiles} />
        </Card>
      </Spin>
    </>
  )
}

export const DraggingArea = withDraggable<NetBoxFunctionAreaProps>(NetBoxFunctionArea)
