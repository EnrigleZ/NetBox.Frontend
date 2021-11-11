import React, {} from 'react';
import { Table } from 'antd';
import { AxiosResponse } from 'axios';
import render from '../../utils/render';

import { GetCommits } from './api';
import { IGitCommit } from './interface';

import './index.less';

const cols = [
    {title: 'id', dataIndex: 'id', render: (id, record: IGitCommit) => {
        return (<a href={record.url} target="_blank">{id}</a>)
    }},
    {title: 'msg', dataIndex: 'message'},
]

const CommitDashboardPage: React.FunctionComponent<any> = () => {
    const [commits, setCommits] = React.useState<IGitCommit[]>([]);
    const getCommits = React.useCallback(() => {
        GetCommits().then((res: AxiosResponse<IGitCommit[]>) => {
            const commits = res.data.sort((a, b) => b.timestamp - a.timestamp);
            setCommits(commits);
        })
    }, []);

    React.useEffect(getCommits, []);

    return (<Table
        className="commit-table"
        dataSource={commits}
        rowKey="id"
        columns={cols}
    />)
};

render(<CommitDashboardPage />);