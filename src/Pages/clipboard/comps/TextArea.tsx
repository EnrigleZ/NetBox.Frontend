import React, { FunctionComponent, useCallback } from 'react';
import { Button, Card } from 'antd';
import { PostImage } from '../api';

function uploadImage(blob) {
    const formData = new FormData();
    formData.append('image', blob);
    PostImage(formData).then(res => {
        console.log(res)
    })
}

const TextArea: FunctionComponent<any> = (props) => {
    const onPaste = useCallback((event: React.ClipboardEvent) => {
        if (event.clipboardData.items.length > 0) {
            const item = event.clipboardData.items[0];
            const blob = item.getAsFile();
            console.log(blob);
            uploadImage(blob)
        } else {

        }
        // console.log(event.clipboardData)
        // console.log(event.clipboardData.types)
        // console.log (event.clipboardData.items)
        // console.log (event.clipboardData.files)
    }, []);
    return (<Card title="Paste here">
        <textarea onPaste={onPaste} />
        <img src="http://localhost:8000/api/image/image?id=8ff1a7b1-9f70-471a-b45f-244332eb05fb" />
    </Card>)
}

export default TextArea;
