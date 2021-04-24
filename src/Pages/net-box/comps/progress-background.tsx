import React from 'react'
import { BoxFileClass, BoxFileLoadingStatusEnum } from '../types'


type ProcessBackgroundPercentageProps = {
    progress: string | null,
    status: BoxFileLoadingStatusEnum,
    loadType: ("upload" | "download" | '')
}

type ProcessBackgroundProps = {
    boxFile: BoxFileClass
}

let ProcessBackground: React.FunctionComponent<ProcessBackgroundPercentageProps> = ({ progress, status, loadType }) => {
    return (<td style={{width: progress + '%'}} className={`background-comp ${status || ''} ${loadType}`}/>)
}

ProcessBackground = React.memo(ProcessBackground)

const DebouncedComp: React.FunctionComponent<ProcessBackgroundProps> = ({ boxFile }) => {
    const [progress, setProgress] = React.useState<null | string>('0')
    const [enable, setEnable] = React.useState(true)
    const { loadingStatus } = boxFile
    const newProgress = loadingStatus ? loadingStatus.getProgress() : null
    const status = loadingStatus ? loadingStatus.status : undefined
    const loadType = loadingStatus ? loadingStatus.loadType || '' : ''

    if (enable && newProgress !== progress) {
        setEnable(false)
        setProgress(newProgress)
        setTimeout(() => { setEnable(true) }, 233)
    }
    return <ProcessBackground progress={progress} status={status} loadType={loadType} />
}

export default DebouncedComp
