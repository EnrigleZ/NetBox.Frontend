// @ts-nocheck
import React from 'react'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'

import { BoxFileClass } from '../types'
import { getTableData, getTableColumns } from './table-logic'

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
    color: rgb(128, 128, 128);

    tr {
      transition: background 0.3s;
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

      /* The secret sauce */
      /* Each cell should grow equally */
    //   width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }

    th.name,
    td.name {
        max-width: 200px;
        text-align: left !important;
        padding-left: 20px;
    }
    th.desc {
        width: 30%
    }
    td.size {
        max-width: 100px
    }
  }

  .pagination {
    padding: 0.5rem;
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
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    return (
        <table {...getTableProps()} className="file-table">
            <thead className="ant-table-thead">
                <tr>
                    {headers.map(column => (
                        <th className={`ant-table-cell align-center ${column.id}`} {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                console.log(cell)
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className={cell.column.id}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
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
