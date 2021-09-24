import React, { useState, FunctionComponent } from 'react'
import { Col, Row } from 'antd'
import render from '../../utils/render';
import ItemList from './comps/ItemList';
import TextArea from './comps/TextArea';
import './index.less';

const defaultList = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorum voluptatibus repellendus sed assumenda sequi ab cum enim minus consequuntur, ullam mollitia est labore exercitationem similique totam eligendi cumque recusandae?',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, enim?',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sunt velit nostrum recusandae fugiat in, labore tempore maiores cum officia, sequi molestias aut dolore reiciendis, saepe placeat deserunt? Non eum architecto perferendis magnam expedita iure reiciendis excepturi, deserunt, officia eos omnis in. Quaerat dolor pariatur unde iure repellat autem iste?',
]

function getDefaultList() {
    console.log('get default');
    return defaultList.map((text, index) => ({
        id: index,
        text,
    }))
}

const ClipboardPage: FunctionComponent<any> = () => {
    const ls = getDefaultList();
    const [textList, setTextList] = useState<any[]>(getDefaultList);
    console.log(textList);

    return (<Row className="clipboard-page">
        <Col span={10} className="item-list">
            <ItemList items={textList} />
        </Col>
        <Col span={14} className="text-area">
            <TextArea />
        </Col>
    </Row>)
}

render(<ClipboardPage />);
