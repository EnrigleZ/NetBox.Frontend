import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Form, Select, Button, message } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import render from '@/utils/render';
import { GetTreeIndex, GetTreeNames } from './api';

import './index.less';

const BaiduMtsPage = () => {
    const [treeNames, setTreeNames] = useState([]);
    const [selectedName, setSelectedName] = useState(null);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [treeIndex, setTreeIndex] = useState();
    const [indexLoading, setIndexLoading] = useState(false);

    const getTreeNamesCallback = useCallback(() => {
        setRefreshLoading(true);
        GetTreeNames().then(res => {
            setTreeNames([...res.data])
            if (!selectedName || res.data.indexOf(selectedName) === -1) {
                setSelectedName(res.data[0])
            }
        }).finally(() => {
            setRefreshLoading(false);
        });
    }, [selectedName]);

    const getTreeIndex = useCallback(() => {
        const params = {
            name: selectedName,
        }
        setIndexLoading(true)
        GetTreeIndex(params).then(res => {
            const nodes = res.data;
            message.info(`采样了${nodes.length}个节点`);
        }).finally(() => {
            setIndexLoading(false);
        })
    }, [selectedName]);

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
                        <Button
                            onClick={getTreeIndex}
                            type="primary"
                        >
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
        <div className="right-part">
            <Card title="可视化">

            </Card>
        </div>
    </div>);
};

render(<BaiduMtsPage />);
