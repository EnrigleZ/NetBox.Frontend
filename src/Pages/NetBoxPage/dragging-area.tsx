import { Button, Card } from 'antd'
import React, { FunctionComponent, useEffect } from 'react'
import { withDraggable, ReceivedComponentProps } from '../../Containers/draggable-wrapper'

type TooltipWrapperProps = {
  display: boolean
}

const DropFileTooltipWrapper: React.FunctionComponent<TooltipWrapperProps> = ({display}) => {
  const className = 'covered drop-tooltip faded'
  const ref = React.useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = React.useState<boolean>(true)

  const element = ref.current

  useEffect(() => {
    let timeout: any

    if (!display) {
      element?.classList.add('animate')
    } else {

    }

    return function () {
      clearTimeout(timeout)
    }
  }, [display, setHidden])

  return (
    <div className={className} ref={ref} hidden={hidden}>

    </div>
  )
}

const NetBoxFunctionArea: FunctionComponent<ReceivedComponentProps> = (props) => {
  const { isDragging } = props
  return (
    <>
      <DropFileTooltipWrapper display={isDragging} />
      <Card>
        <Button>Whoa</Button>
      </Card>
    </>
  )
} 

export default withDraggable(NetBoxFunctionArea)
