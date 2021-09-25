import React, { useState, useEffect, FunctionComponent, useCallback } from 'react'
import { Col, Row, Spin } from 'antd'
import render from '../../utils/render';
import ItemList from './comps/ItemList';
import TextArea from './comps/TextArea';
import './index.less';
import { GetNotes } from './api';

const ClipboardPage: FunctionComponent<any> = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const updateNoteList = useCallback(() => {
        setLoading(true);
        GetNotes().then(res => {
            const data = res.data.sort((a, b) => (b.updated_at - a.updated_at))
            setNotes(data);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    useEffect(updateNoteList, []);

    return (<Row className="clipboard-page">
        <Col span={10} className="item-list">
            <Spin spinning={loading}>
                <ItemList items={notes} />
            </Spin>
        </Col>
        <Col span={14} className="text-area">
            <TextArea onUpdate={updateNoteList} />
        </Col>
    </Row>)
}

render(<ClipboardPage />);
