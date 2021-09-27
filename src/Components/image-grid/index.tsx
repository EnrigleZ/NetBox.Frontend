import React from 'react';
import ImageModal from './image-modal';
import { IImageGridProps } from './interface';
import './index.less';

const ImageGrid: React.FunctionComponent<IImageGridProps> = (props) => {
    const { urls, style, className = "", onClickImage } = props;
    const [displayModal, setDisplayModal] = React.useState<boolean>(false);
    const [viewIndex, setIndex] = React.useState<number>(0);

    return (<>
        <div className={`image-grid ${className}`} style={style}>
            {urls.map((url, index) => (<div
                className="image-item"
                style={{
                    cursor: onClickImage ? 'pointer' : 'unset',
                }}
                key={index}
                onClick={() => {
                    if (onClickImage) {
                        onClickImage(url, index);
                    } else {
                        setIndex(index);
                        setDisplayModal(true);
                    }
                }}
            >
                <img src={url} />
            </div>))}
        </div>
        <ImageModal
            display={displayModal}
            initIndex={viewIndex}
            urls={urls}
            onClose={setDisplayModal.bind(null, false)}
        />
    </>)
};

export default ImageGrid;