import React from 'react';
import Tree from 'react-tree-graph';

const TreeArea = ({
    data
}) => {
    if (!data) return null;


    return (<Tree
        data={data}
        height={600}
        width={400}
    />);
}

export default TreeArea;
