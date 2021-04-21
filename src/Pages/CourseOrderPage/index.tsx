import React from 'react';
import CourseTable from './comps/course-table';
import './index.less';

const mockData = {
    headers: ['小组编号', '选题'],
    items: ['ARS-WE-1;活动发布', 'ARS-WE-2; 活动发布']
}
function CourseOrderPage(): JSX.Element {
    return (<div className="course-order-page">
        <CourseTable
            items={mockData.items}
            headers={mockData.headers}
        />
    </div>)
}

export default CourseOrderPage
