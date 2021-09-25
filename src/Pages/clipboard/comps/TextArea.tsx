import React, { useMemo, useState, FunctionComponent, useCallback } from 'react';
import { Card, message, Input, Button } from 'antd';
import { PostImage, PostNote } from '../api';
import ImageGrid from '../../../Components/image-grid';

const { TextArea } = Input;

const ClipBoardTextArea: FunctionComponent<any> = (props) => {
    const { onUpdate } = props;
    const [text, setText] = useState<string>("");
    const [imageIds, setImageIds] = useState<string[]>([]);
    const imageUrls = useMemo(() => imageIds.map(id => `/api/image/image?id=${id}`), [imageIds]);

    const uploadImage = useCallback((blob) => {
        const formData = new FormData();
        formData.append('image', blob);
        PostImage(formData).then(res => {
            console.log(res);
            message.success(`Upload ${res.data.id}successfully!`);
            setImageIds(prev => [...prev, res.data.id]);
            // setImageId(res.data.id);
        }).catch(res => {
            console.log(res);
            message.error("Upload failed!");
        })
    }, []);

    const onPaste = useCallback((event: React.ClipboardEvent) => {
        if (event.clipboardData.files.length > 0) {
            message.info('updating image...')
            console.log(event.clipboardData.items)
            const item = event.clipboardData.items[0];
            const blob = item.getAsFile();
            console.log(blob);
            uploadImage(blob)
            event.preventDefault();
        }
    }, []);

    const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        const formData = new FormData();
        formData.append('title', new Date().toISOString());
        formData.append('content', text);
        formData.append('image_ids', imageIds.join(' '));

        PostNote(formData).then(res => {
            console.log(res);
            message.success('post note successfully');
            setText('');
            setImageIds([]);
        }).catch(res => {
            console.log(res);
            message.error('post note failed');
        }).finally(() => {
            onUpdate();
        });
    }, [text, imageIds]);

    return (<Card title="Paste here" onPaste={onPaste}>
        <TextArea
            value={text}
            onChange={onChange}
        />
        <Button type="primary" onClick={onSubmit}>Create</Button>
        <ImageGrid urls={imageUrls} />
    </Card>)
}

export default ClipBoardTextArea;
