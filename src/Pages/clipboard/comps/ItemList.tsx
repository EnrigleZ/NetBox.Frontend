import React, { FunctionComponent } from 'react';
import { Card, Empty } from 'antd';

import './index.less';

const TextItem: FunctionComponent<any> = (props) => {
    const { content, id } = props;
    return <div className="item">{content}</div>
}

const ItemList: FunctionComponent<any> = (props) => {
    const { items } = props;
    return (<Card className="note-item-list" title="Records">
        {items.length > 0 ? (
            items.map(item => (<TextItem key={item.id} {...item} />))
        ) : <Empty />}
    </Card>)
}

export default ItemList;
