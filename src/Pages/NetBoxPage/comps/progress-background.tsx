import React from 'react'
import styled from 'styled-components'

import { BoxFileClass, BoxFileLoadingStatusClass } from '../types'

const ProcessBackgroundTD = styled.td`
    position: absolute;
    left: 0;
    height: 100%;
    background: transparent;
    z-index: -1;
    transition: width 0.5s, background 0.5s;
    padding: 0 !important;

    &.pending {
        background: #f9f0ff;
    }
    &.upload.loading {
        background: #ffd6e7;
    }
    &.download.loading {
        background: #bae7ff;
    }
    &.finished {
        background: #d9f7be;
    }
`

type ProcessBackgroundPercentageProps = {
    progress: string | null,
    status: ("pending" | "loading" | "finished" | ''),
    loadType: ("upload" | "download" | '')
}

type ProcessBackgroundProps = {
    boxFile: BoxFileClass
}

let ProcessBackground: React.FunctionComponent<ProcessBackgroundPercentageProps> = ({ progress, status, loadType }) => {
    return (<ProcessBackgroundTD style={{width: progress + '%'}} className={`${status} ${loadType}`}/>)
}

ProcessBackground = React.memo(ProcessBackground)

const DebouncedComp: React.FunctionComponent<ProcessBackgroundProps> = ({ boxFile }) => {
    const [progress, setProgress] = React.useState<null | string>('0')
    const [enable, setEnable] = React.useState(true)
    const { loadingStatus } = boxFile
    const newProgress = loadingStatus ? loadingStatus.getProgress() : null
    const status = loadingStatus ? loadingStatus.status || '' : ''
    const loadType = loadingStatus ? loadingStatus.loadType || '' : ''

    if (enable && newProgress !== progress) {
        setEnable(false)
        setProgress(newProgress)
        setTimeout(() => { setEnable(true) }, 233)
    }
    return <ProcessBackground progress={progress} status={status} loadType={loadType} />
}

export default DebouncedComp
