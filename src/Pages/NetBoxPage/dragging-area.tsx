import React, { FunctionComponent, useEffect } from 'react'
import { Button, Card } from 'antd'
import axios from 'axios'

import { withDraggable, ReceivedComponentProps } from '../../Containers/draggable-wrapper'

type TooltipWrapperProps = {
  display: boolean
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

const NetBoxFunctionArea: FunctionComponent<ReceivedComponentProps> = (props) => {
  const { isDragging } = props
  const onClick: any = () => {
    axios.get('/test/').then(res => {
      console.log(res)
    })
  }
  return (
    <>
      <DropFileTooltipWrapper display={isDragging} />
      <Card>
        <Button onClick={onClick}>Create</Button>
      </Card>
    </>
  )
} 

export default withDraggable(NetBoxFunctionArea)
