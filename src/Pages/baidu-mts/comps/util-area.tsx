import React, { useCallback, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';

import { PostCreateRandomTree } from '../api';

const UtilArea = () => {
    const [limits, setLimits] = useState('10, 10, 20');
    const createRandomCallback = useCallback(() => {
        let floatLimits;
        try {
            floatLimits = limits.split(',').map(x => x.trim()).map(parseFloat);
        } catch (error) {
            message.error('检查输入格式');
            return;
        }
        const data = new FormData;
        data.append('limits', floatLimits);
        PostCreateRandomTree(data).then(res => {
            console.log(res.data);
            message.success(`成功创建TDM文件:${res.data.name}`);
        }).catch(res => {
            message.error('failed');
        })
    }, [limits]);

    return (<Card title="其他功能" className="util-area">
        <Form>
            <Form.Item label="每层节点子节点数目">
                <Input
                    value={limits}
                    onChange={e => {
                        setLimits(e.target.value);
                    }}
                    placeholder="每层子节点数目   e.g.: '10,20,100,200'"
                />
            </Form.Item>
            <Button
                type="primary"
                onClick={createRandomCallback}
            >创建测试树</Button>
        </Form>
    </Card>)
};

export default UtilArea;
