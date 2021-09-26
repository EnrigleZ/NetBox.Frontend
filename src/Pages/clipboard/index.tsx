import React, { useState, useEffect, FunctionComponent, useCallback } from 'react'
import { Col, Row, Card } from 'antd'
import render from '../../utils/render';
import ItemList from './comps/ItemList';
import ClipBoardTextArea from './comps/TextArea';
import './index.less';
import { GetNotes } from './api';

const ClipboardPage: FunctionComponent<any> = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDetail, setDetail] = useState<boolean>(true);

    const updateNoteList = useCallback(() => {
        setLoading(true);
        GetNotes().then(res => {
            const data = res.data.sort((a, b) => (b.updated_at - a.updated_at))
            setNotes(data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const displayNoteDetail = useCallback(id => {

    }, []);

    useEffect(updateNoteList, []);

    return (<Row className="clipboard-page">
        {isDetail ? (
            <Col span={24}>
                <Card>
                    asd
                </Card>
            </Col>
        ) : (<>
            <Col span={10} className="item-list">
                <ItemList onUpdate={updateNoteList} items={notes} loading={loading} />
            </Col>
            <Col span={14} className="text-area">
                <ClipBoardTextArea onUpdate={updateNoteList} />
            </Col>
        </>)}
    </Row >)
}

render(<ClipboardPage />);
