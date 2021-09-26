import React, { FunctionComponent } from 'react';
import { Button, Card, Empty } from 'antd';
import { timestampToString } from '../../../utils/stringify'

import './index.less';

const TextItem: FunctionComponent<any> = (props) => {
    const { content, id, title, updated_at } = props;
    return <div className="item">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <div className="time">{timestampToString(updated_at)}</div>
    </div>
}

const ItemList: FunctionComponent<any> = (props) => {
    const { items, loading, onUpdate } = props;
    const button = (<Button
        type="primary"
        onClick={onUpdate}
        disabled={loading}
    >Refresh</Button>)
    return (<Card
        extra={button}
        className="note-item-list"
        title="Records"
        loading={loading}
    >
        {items.length > 0 ? (
            items.map(item => (<TextItem key={item.id} {...item} />))
        ) : <Empty />}
    </Card>)
}

export default ItemList;
