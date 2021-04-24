import React from 'react'
import { Divider } from 'antd'
import {
    CloseOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EyeOutlined,
    FileExcelOutlined,
    FileImageOutlined,
    FileMarkdownOutlined,
    FileOutlined,
    FilePdfOutlined,
    FilePptOutlined,
    FileTextOutlined,
    FileWordOutlined
} from '@ant-design/icons'

import { timestampToString, fileSizeToString } from '../../../utils/stringify'
import { getExtension } from '../../../utils/file'

import { BoxFileClass } from '../types'
import { downloadFromBoxFile, updateList, deleteBoxFile } from '../logic'

export function getTableData(boxFiles: BoxFileClass[]) {
    return boxFiles
}

function getExtensionIcon(filename: string = "") {
    const ext = getExtension(filename)
    switch (ext) {
        case 'doc':
        case 'docx':
            return (<FileWordOutlined />)
        case 'md':
            return (<FileMarkdownOutlined />)
        case 'ppt':
        case 'pptx':
            return (<FilePptOutlined />)
        case 'txt':
            return (<FileTextOutlined />)
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'bmp':
            return (<FileImageOutlined />)
        case 'pdf':
            return (<FilePdfOutlined />)
        case 'xlsx':
        case 'xls':
        case 'csv':
        case 'tsv':
            return (<FileExcelOutlined />)
        default:
            return (<FileOutlined />)
    }
}

export function getTableColumns() {
    const columns = [
        {
            Header: 'File name',
            accessor: (boxFile: BoxFileClass) => (<>
                <span className="ext">{getExtensionIcon(boxFile.name)}</span>
                <a onClick={downloadFromBoxFile.bind(null, boxFile)}>{boxFile.name}</a>
            </>),
            id: 'name',
            width: '35%'
        },
        {
            Header: 'Description',
            accessor: 'description',
            id: "desc",
            width: '30%'
        },
        {
            Header: 'Size',
            accessor: (boxFile: BoxFileClass) => (<div>
                {fileSizeToString(boxFile.size, '-')}
            </div>),
            id: 'size',
            width: '15%'
        },
        {
            Header: 'Create time',
            accessor: (boxFile: BoxFileClass) => timestampToString(boxFile.createdAt, '-'),
            id: 'create',
            width: '20%'
        },
        {
            Header: 'Actions',
            accessor: (boxFile: BoxFileClass) => {
                const isReady = boxFile.isReady()
                const DownloadIcon = isReady ? DownloadOutlined : CloseOutlined
                return (<div className="action-icons">
                    <a className={isReady ? '' : 'warning'}><DownloadIcon onClick={() => {
                        if (isReady) downloadFromBoxFile(boxFile)
                        else if (boxFile.loadingStatus) boxFile.loadingStatus.cancel()
                        updateList()
                    }} color="grey" /></a>
                    <Divider type="vertical" />
                    <a><EyeOutlined /></a>
                    <Divider type="vertical" />
                    <a className={isReady ? '' : 'disabled'}><DeleteOutlined onClick={() => { isReady && deleteBoxFile(boxFile) }} /></a>
                </div>)
            },
            id: 'actions'
        }
    ]
    return columns
}
