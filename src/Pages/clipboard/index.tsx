import React, { useState, useEffect, FunctionComponent, useCallback } from 'react'
import { Col, Row, Card } from 'antd'
import render from '../../utils/render';
import { GetNote, GetNotes } from './api';

import ItemList from './comps/ItemList';
import ClipBoardTextArea from './comps/TextArea';
import NoteContent from './comps/NoteContent';

import './index.less';

const ClipboardPage: FunctionComponent<any> = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewDetail, setViewDetail] = useState<boolean>(false);
    const [detailNote, setDetailNote] = useState<any>(null);

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
        const params = { id };
        GetNote(params).then(res => {
            setViewDetail(true);
            const note = res.data;
            setDetailNote(note);
            console.log(note);
        })
    }, []);

    const closeDetail = useCallback(() => {
        setViewDetail(false);
    }, []);

    useEffect(updateNoteList, []);

    return (<Row className="clipboard-page">
        {viewDetail ? (
            <Col span={24}>
                <NoteContent
                    note={detailNote}
                    onReturn={closeDetail}
                />
            </Col>
        ) : (<>
            <Col span={10} className="item-list">
                <ItemList
                    onUpdate={updateNoteList}
                    onItemClick={displayNoteDetail}
                    items={notes}
                    loading={loading}
                />
            </Col>
            <Col span={14} className="text-area">
                <ClipBoardTextArea onUpdate={updateNoteList} />
            </Col>
        </>)}
    </Row >)
}

render(<ClipboardPage />);
