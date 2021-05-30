export function parseTreeIndexFromNodes(nodes) {
    const n = nodes.length;
    const idMap = {};
    let ret = null

    for (let i = 0; i < n; ++ i) {
        const node = nodes[i];
        if (node.parent === 0) {
            ret = node;
        }
        node.children = [];
        idMap[node.id] = node;
    }

    for (let i = 0; i < n; ++ i) {
        const node = nodes[i];
        if (node.parent === 0) continue;
        const parent = idMap[node.parent];
        parent.children.push(node);
    }

    return ret;
}