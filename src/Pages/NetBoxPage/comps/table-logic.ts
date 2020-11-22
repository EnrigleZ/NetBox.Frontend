import { BoxFileClass, BoxFileLoadingStatusClass } from '../types'

export function getTableData(boxFiles: BoxFileClass[]) {
    return boxFiles
}

export function getTableColumns() {
    const columns = [
        {
            Header: 'File name',
            // accessor: (boxFile: BoxFileClass) => { console.log(boxFile); return 123 }
            accessor: 'name'
        },
        {
            Header: 'Create time',
            accessor: 'created at'
        }
    ]
    return columns
}
