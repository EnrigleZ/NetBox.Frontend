import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Empty, Select } from 'antd';
import CourseTable from './comps/course-table';
import mockData from './mock';
import './index.less';

function getShiftedItems(items: string[], offset: number = 1): string[] {
    const { length } = items;
    if (!length) return items;
    offset = (offset + length) % length;
    if (!offset) return items

    const front = items.slice(0, offset);
    return items.slice(offset).concat(front);
}

function CourseOrderPage(): JSX.Element {
    const options = useMemo<string[]>(() => mockData.keys, []);
    const [selected, setSelected] = useState<string>('');
    const headers = useMemo<string[]>(() => {
        return (mockData.data[selected] || {}).headers || [];
    }, [selected]);
    const [items, setItems] = useState<string[]>([]);

    const upwardCallback = useCallback(() => {
        setItems(items => getShiftedItems(items, 1));
    }, []);

    const downwardCallback = useCallback(() => {
        setItems(items => getShiftedItems(items, -1));
    }, []);

    const onChangeCallback = useCallback((opt: string) => {
        setSelected(opt);
        setItems(mockData.data[opt].items);
        console.log(mockData.data[opt].items)
    }, []);

    useEffect(() => {
        if (options.length) onChangeCallback(options[0]);
    }, []);

    return (<div className="course-order-page">
        <div className="config-area">
            <div className="config-inner-area">
                <div style={{ marginTop: 20 }}>
                </div>
            </div>
        </div>
        <div className="table-area">
            <Select className="select" onChange={onChangeCallback} value={selected}>
                {options.map(opt => (<Select.Option key={opt} value={opt}>{
                    opt}</Select.Option>))}
            </Select>
            {headers.length ? (<div className="table-inner-area">
                <Button className="table-button upward" onClick={upwardCallback}>Upward</Button>
                <CourseTable
                    items={items}
                    headers={headers}
                />
                <Button className="table-button downward" onClick={downwardCallback}>Downward</Button>
            </div>) : <Empty description="Select an option above" />}
        </div>
    </div>)
}

export default CourseOrderPage
