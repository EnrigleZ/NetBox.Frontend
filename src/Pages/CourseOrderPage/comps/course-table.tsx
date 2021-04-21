import React from 'react';
import { ICourseTableProps } from './interface';

function CourseTable(props: ICourseTableProps) {
    const { items, headers } = props;
    const parsedRows = React.useMemo(() => {
        return items.map(item => ((item || '').split(';').map(x => x.trim())))
    }, [items]);

    return (<table className="course-table">
        <thead>
            <tr>
                {headers.map(header => (<th key={header}>{header}</th>))}
            </tr>
        </thead>
        <tbody>
            {parsedRows.map((row, index) => (<tr key={index}>
                {row.map((field, _index) => (<td key={`${field}${_index}`}>{field}</td>))}
            </tr>))}
        </tbody>
    </table>);
}

export default CourseTable;
