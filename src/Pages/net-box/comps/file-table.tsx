// @ts-nocheck
import React from 'react'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { BoxFileClass } from '../types'
import { getTableData, getTableColumns } from './table-logic'
import ProgressBackground from './progress-background'
import { updateList } from '../logic'

const Styles = styled.div`
`

type FileTableProps = {
    data: any[],
    columns: any[]
}

const FileTable: React.FunctionComponent<FileTableProps> = ({ data, columns }): JSX.Element => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
        headers,
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: 12
            },
        },
        usePagination
    )

    return (
        <>
            <table {...getTableProps()} className="file-table">
                <thead>
                    <tr>
                        {headers.map(column => (
                            <th className={`ant-table-cell align-center ${column.id}`} 
                            style={{width: column.width}}{...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {page.map((row, i) => {
                        prepareRow(row)
                        const boxFile: BoxFileClass = row.original
                        return (
                            <tr {...row.getRowProps()} key={i} onClick={() => {
                                if (boxFile.loadingStatus) {
                                    const { status } = boxFile.loadingStatus
                                    if (status === "finished" || status === "canceled") {
                                        boxFile.setLoadingStatus(undefined)
                                        updateList()
                                    }
                                }
                            }}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className={cell.column.id}
                                            style={{width: cell.column.width}}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                                <ProgressBackground boxFile={boxFile} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div hidden={!canPreviousPage && !canNextPage} className="bottom-icons">
                <Button
                    shape="circle"
                    type="primary"
                    icon={<LeftOutlined />}
                    size="small"
                    style={{float: 'left'}}
                    disabled={!canPreviousPage}
                    onClick={() => { previousPage() }}
                />
                <Button
                    shape="circle"
                    type="primary"
                    icon={<RightOutlined />}
                    size="small"
                    style={{float: 'right'}}
                    disabled={!canNextPage}
                    onClick={() => { nextPage() }}
                />
            </div>
            {/* <Button disabled={!canPreviousPage} onClick={() => {previousPage()}}>Previous</Button>
            <Button disabled={!canNextPage} onClick={() => {nextPage()}}>Next</Button> */}
        </>
    )
}

type FileTableContainerProps = {
    boxFiles: BoxFileClass[]
}

const FileTableContainer: React.FunctionComponent<FileTableContainerProps> = ({ boxFiles }) => {
    const tableData = React.useMemo(() => getTableData(boxFiles), [boxFiles])
    const columns = React.useMemo(() => getTableColumns(), [])

    return (
        <div className="table-outer-wrapper">
            <FileTable data={tableData} columns={columns} />
        </div>
    )
}

export default FileTableContainer
