import React, { FunctionComponent, useEffect } from 'react'
import { Button, Card, Table } from 'antd'
import axios from 'axios'

import { withDraggable, ReceivedComponentProps } from '../../Containers/draggable-wrapper'
import { boxFileTableColumns } from './logic'

type TooltipWrapperProps = {
  display: boolean
}

export type BoxFileType = {
  id: string,
  name?: string
  description?: string,
  author?: string,
  created_at?: number,
  updated_at?: number,
  size: number
}

const DropFileTooltipWrapper: React.FunctionComponent<TooltipWrapperProps> = ({display}) => {
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

type NetBoxFunctionAreaProps = {
  boxFiles: Array<BoxFileType>
}

const NetBoxFunctionArea: FunctionComponent<NetBoxFunctionAreaProps & ReceivedComponentProps> = (props) => {
  const { isDragging, boxFiles } = props
  const onClick: any = () => {
    axios.delete('/box/box-files').then(res => {
      console.log(res.data)
    })
  }
  return (
    <>
      <DropFileTooltipWrapper display={isDragging} />
      <Card>
        <Button onClick={onClick}>Clean</Button>
        <Table
          dataSource={boxFiles}
          columns={boxFileTableColumns}
          rowKey='id'
        />
      </Card>
    </>
  )
} 

export const DraggingArea = withDraggable<NetBoxFunctionAreaProps>(NetBoxFunctionArea)
