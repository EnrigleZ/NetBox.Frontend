import React from 'react';
import { Button, Card } from 'antd';
import ImageGrid from '@/Components/image-grid';

const NoteContent: React.FunctionComponent<any> = (props) => {
    const { note, onReturn } = props;
    const button = (<Button onClick={onReturn}>Back</Button>);
    const imageUrls = note?.image_ids?.map((id: string) => `/api/image/image?id=${id}`);

    // React.useEffect(() => {
    //     document.addEventListener('keydown', onReturn, false);
    //     return () => {
    //         document.removeEventListener('keydown', onReturn, false);
    //     }
    // })

    if (!note) return <></>
    return (<Card title="Note Content" extra={button}>
        <h1>{note.title || ''}</h1>
        <div>{note.content}</div>
        <ImageGrid urls={imageUrls} />
    </Card>)
}

export default NoteContent;