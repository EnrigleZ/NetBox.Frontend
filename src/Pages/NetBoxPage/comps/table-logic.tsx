import React from 'react'

import { timestampToString, fileSizeToString } from '../../../utils/stringify'
import { BoxFileClass, BoxFileLoadingStatusClass } from '../types'
import { downloadFromBoxFile, updateList, deleteBoxFile } from '../logic'
import { DescriptionComp } from './description-comp'
import { DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import { Divider } from 'antd'

export function getTableData(boxFiles: BoxFileClass[]) {
    return boxFiles
}

export function getTableColumns() {
    const columns = [
        {
            Header: 'File name',
            accessor: (boxFile: BoxFileClass) => (<a onClick={downloadFromBoxFile.bind(null, boxFile)}>{boxFile.name}</a>),
            id: 'name',
            width: '25%'
        },
        {
            Header: 'Description',
            accessor: (boxFile: BoxFileClass) => (<div className="progress">
                {<DescriptionComp boxFile={boxFile} updateList={updateList} />}
            </div>),
            id: "desc",
            width: '35%'
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
                return (<div className="action-icons">
                    <a className={isReady ? '' : 'disabled'}><DownloadOutlined onClick={() => { isReady && downloadFromBoxFile(boxFile) }} color="grey" /></a>
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
