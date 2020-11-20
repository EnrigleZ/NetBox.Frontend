import React, { FunctionComponent, useEffect } from 'react'
import { Button, Card, Spin, Table } from 'antd'

import { withDraggable, ReceivedComponentProps } from '../../Containers/draggable-wrapper'
import { DeleteBoxFilesAPI } from './api'
import { boxFileTableColumns } from './logic'
import { TooltipWrapperProps, NetBoxFunctionAreaProps } from './types'

const DropFileTooltipWrapper: React.FunctionComponent<TooltipWrapperProps> = ({ display }) => {
  const className = 'covered drop-tooltip faded'
  const ref = React.useRef<HTMLDivElement>(null)
  // const [hidden, setHidden] = React.useState<boolean>(true)

  const TRANSITION_TIMEOUT = 300

  useEffect(() => {
    let timeout: NodeJS.Timeout
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
  const [displayFiles, setDisplayFiles] = React.useState<Array<any>>([])
  useEffect(() => {
    setDisplayFiles(boxFiles)
  }, [setDisplayFiles, boxFiles])
  return (
    <>
      <DropFileTooltipWrapper display={isDragging} />
      <Spin spinning={loading}>
        <Card>
          <Button onClick={refresh}>Refresh</Button>
          <Button onClick={onClick}>Clean</Button>
          <Table
            dataSource={displayFiles}
            columns={boxFileTableColumns}
            rowKey='id'
          />
        </Card>
      </Spin>
    </>
  )
}

export const DraggingArea = withDraggable<NetBoxFunctionAreaProps>(NetBoxFunctionArea)
