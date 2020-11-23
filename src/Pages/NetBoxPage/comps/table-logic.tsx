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
            id: 'name'
        },
        {
            Header: 'Description',
            accessor: (boxFile: BoxFileClass) => (<div className="progress">
                {<DescriptionComp boxFile={boxFile} updateList={updateList} />}
            </div>),
            id: "desc"
        },
        {
            Header: 'Size',
            accessor: (boxFile: BoxFileClass) => (<div>
                {fileSizeToString(boxFile.size, '-')}
            </div>),
            id: 'size'
        },
        {
            Header: 'Create time',
            accessor: (boxFile: BoxFileClass) => timestampToString(boxFile.createdAt, '-'),
            id: 'create'
        },
        {
            Header: 'Actions',
            accessor: (boxFile: BoxFileClass) => {
                return (<div className="action-icons">
                    <a><DownloadOutlined onClick={() => { downloadFromBoxFile(boxFile) }} color="grey" /></a>
                    <Divider type="vertical" />
                    <a><EyeOutlined /></a>
                    <Divider type="vertical" />
                    <a><DeleteOutlined onClick={() => { deleteBoxFile(boxFile) }} /></a>
                </div>)
            },
            id: 'actions'
        }
    ]
    return columns
}
