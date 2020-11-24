// @ts-nocheck
import { Button } from 'antd'
import React from 'react'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'

import { BoxFileClass } from '../types'
import { getTableData, getTableColumns } from './table-logic'
import ProgressBackground from './progress-background'

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
    color: rgb(128, 128, 128);

    thead {
        background: #fafafa
    }

    tr {
      transition: background 0.3s;
      transform: scale(1);
      background: transparent;
      display: inline-flex;
      width: 100%;

      :hover {
        background: #fafafa;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid rgb(240, 240, 240);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }

    tr {
    }

    th.name,
    td.name {
        text-align: left !important;
        padding-left: 20px;
    }

  .pagination {
    padding: 0.5rem;
  }

  .progress-bg {
      position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ee6666;
    z-index: -1;
  }
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
                        const boxFile = row.original
                        return (
                            <tr {...row.getRowProps()} key={i}>
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
            <Button disabled={!canPreviousPage} onClick={() => {previousPage()}}>Previous</Button>
            <Button disabled={!canNextPage} onClick={() => {nextPage()}}>Next</Button>
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
        <Styles>
            <div className="tableWrap">
                <FileTable data={tableData} columns={columns} />
            </div>
        </Styles>
    )
}

export default FileTableContainer
