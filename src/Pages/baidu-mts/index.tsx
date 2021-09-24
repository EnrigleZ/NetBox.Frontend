import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Form, Select, Button, message, Slider } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import render from '@/utils/render';
import { parseTreeIndexFromNodes } from './logic';
import { GetTreeIndex, GetTreeNames } from './api';
import UtilArea from './comps/util-area';
import TreeArea from './comps/tree-area';

import './index.less';

const BaiduMtsPage = () => {
    const [treeNames, setTreeNames] = useState([]);
    const [selectedName, setSelectedName] = useState(null);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [treeIndex, setTreeIndex] = useState();
    const [indexLoading, setIndexLoading] = useState(false);
    const [sampleDepth, setSampleDepth] = useState(3)
    const [sampleChildren, setSampleChildren] = useState(5);

    const getTreeNamesCallback = useCallback(() => {
        setRefreshLoading(true);
        setTreeIndex(undefined);
        GetTreeNames().then(res => {
            setTreeNames([...res.data])
            if (!selectedName || res.data.indexOf(selectedName) === -1) {
                setSelectedName(res.data[0])
            }
        }).finally(() => {
            setRefreshLoading(false);
        });
    }, [selectedName]);

    const getTreeIndexCallback = useCallback(() => {
        const params = {
            name: selectedName,
            depth: sampleDepth,
            children: sampleChildren,
        }
        setIndexLoading(true)
        GetTreeIndex(params).then(res => {
            const nodes = res.data;
            console.log(nodes);
            const tree = parseTreeIndexFromNodes(nodes);
            console.log(tree);
            setTreeIndex(tree);
            message.info(`采样了${nodes.length}个节点`);
        }).finally(() => {
            setIndexLoading(false);
        })
    }, [selectedName, sampleChildren, sampleDepth]);

    const drawCallback = useCallback(() => {

    }, []);

    useEffect(() => {
        getTreeNamesCallback();
    }, []);

    return (<div className="baidu-mts-page">
        <div className="left-part">
            <Card title="一些配置">
                <Form>
                    <Form.Item>
                        <Button
                            icon={<RedoOutlined />}
                            onClick={getTreeNamesCallback}
                            disabled={refreshLoading}
                        />
                        <Select
                            className="tree-selection"
                            value={selectedName}
                            onChange={setSelectedName}
                        >
                            {treeNames.map(name => (<Select.Option
                                value={name}
                                key={name}
                            >
                                {name}
                            </Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="最深采样层数">
                        <Slider
                            min={1}
                            max={5}
                            value={sampleDepth}
                            onChange={setSampleDepth}
                        />
                    </Form.Item>
                    <Form.Item label="最大采样子节点数">
                        <Slider
                            min={1}
                            max={30}
                            value={sampleChildren}
                            onChange={setSampleChildren}
                        />
                    </Form.Item>
                    <Button
                        onClick={getTreeIndexCallback}
                        type="primary"
                    >
                        确认
                    </Button>
                </Form>
            </Card>
            <UtilArea />
        </div>
        <div className="right-part">
            <Card title="可视化" extra={(<Button
                onClick={drawCallback}
            >绘制</Button>)}>
                <TreeArea data={treeIndex} />
            </Card>
        </div>
    </div>);
};

render(<BaiduMtsPage />);
