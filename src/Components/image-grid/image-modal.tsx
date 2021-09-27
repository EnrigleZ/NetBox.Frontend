import React from 'react';
import { Modal } from 'antd';
import { IImageModalProps } from './interface';

const ImageModal: React.FunctionComponent<IImageModalProps> = (props) => {
    const { display, urls, initIndex = 0, onClose = Function() } = props;
    const [index, setIndex] = React.useState<number>(initIndex);
    const [width, setWidth] = React.useState<number>(520);

    const imageUrl = React.useMemo(() => urls[index], [index]);
    const onImageLoad = React.useCallback((e: any) => {
        const imageElement: HTMLImageElement = e.target;
        const w = imageElement.naturalWidth;
        console.log('onload', w)
        if (w) {
            setWidth(Math.min(1000, w));
        }
    }, []);

    const onNextImage = React.useCallback((offset: number) => {
        console.log('on next image', urls.length)
        if (urls.length === 0) return;
        setIndex(prev => (prev + offset + urls.length) % urls.length);
    }, [urls]);

    React.useEffect(() => {
        setIndex(initIndex);
    }, [initIndex]);

    return (<Modal
        visible={display}
        title="View Image"
        onCancel={() => { onClose(); }}
        closable
        footer={null}
        width={width}
    >
        <img
            className="image-modal-img"
            src={imageUrl} onLoad={onImageLoad}
            onClick={onNextImage.bind(null, 1)}
            key={imageUrl}
        />
    </Modal>)
}

export default React.memo(ImageModal);
