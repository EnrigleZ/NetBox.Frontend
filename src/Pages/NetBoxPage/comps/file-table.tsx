import React from 'react'
import { useTable } from 'react-table'

import { BoxFileClass } from '../types'
import { getTableData, getTableColumns } from './table-logic'

type FileTableProps =  {
    data: any[],
    columns: any[]
}

const FileTable: React.FunctionComponent<FileTableProps> = ({ data, columns }): JSX.Element => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        headers
    } = useTable({ data, columns })
    console.log(headers)
    return (
        <table {...getTableProps()}>
            <thead>
                <tr>
                    {headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            </thead>
        </table>
    )
}

type FileTableContainerProps = {
    boxFiles: BoxFileClass[]
}

const FileTableContainer: React.FunctionComponent<FileTableContainerProps> = ({ boxFiles }) => {
    const tableData = React.useMemo(() => getTableData(boxFiles), [boxFiles])
    const columns = React.useMemo(() => getTableColumns(), [])

    return <FileTable data={tableData} columns={columns} />
}

export default FileTableContainer
