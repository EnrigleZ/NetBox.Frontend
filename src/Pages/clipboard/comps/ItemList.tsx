import React, { FunctionComponent } from 'react';
import { Card } from 'antd';

const TextItem: FunctionComponent<any> = (props) => {
    const { text, id } = props;
    return <div>{text}</div>
}

const ItemList: FunctionComponent<any> = (props) => {
    const {items} = props;
    return (<Card title="Records">{
        items.map(item => (<TextItem key={item.id} {...item} />))
    }</Card>)
}

export default ItemList;
