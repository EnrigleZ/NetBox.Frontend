import React from 'react'

type WrappedComponentProps = {
  onDrag?: Function,
  handleDrop?: Function
}

const defaultHandler = (e: React.DragEvent) => {
  e.preventDefault()
}

export type ReceivedComponentProps = {
  isDragging: boolean
}

export function withDraggable<T> (Comp: React.FunctionComponent<ReceivedComponentProps & T>) {
  const DraggableComponent: React.FunctionComponent<WrappedComponentProps & T> = (props) => {
    const { handleDrop, children } = props

    const containerRef = React.useRef<HTMLDivElement>(null)
    const [draggingCount, setDraggingCount] = React.useState(0)

    React.useEffect(() => {
      function dropListener (event: DragEvent) {
        const files = event.dataTransfer?.files
        event.preventDefault()
        if (files && files.length) {
          setDraggingCount(c => c - 1)
          handleDrop && handleDrop(files)
        } else {
          setDraggingCount(0)
        }
      }

      const refElement = containerRef.current

      refElement && refElement.addEventListener("drop", dropListener)
      return function cleanDropListener () {
        refElement && refElement.removeEventListener("drop", dropListener)
      }
    }, [handleDrop, setDraggingCount])

    const onDragIn = React.useCallback(() => {
      setDraggingCount(c => c + 1)
    }, [setDraggingCount])

    const onDragOut = React.useCallback(() => {
      setDraggingCount(c => c - 1)
    }, [setDraggingCount])


    return (
      <div
        className="draggable-container"
        ref={containerRef}
        onDragOver={defaultHandler}
        onDragEnter={onDragIn}
        onDragLeave={onDragOut}
      >
        <Comp {...props} isDragging={draggingCount !== 0}>
          { children }
        </Comp>
      </div>
    )
  }

  return DraggableComponent
}
