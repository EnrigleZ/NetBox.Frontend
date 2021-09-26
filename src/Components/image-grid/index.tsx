import React from 'react';
import { IImageGridProps } from './interface';
import './index.less';

const ImageGrid: React.FunctionComponent<IImageGridProps> = (props) => {
    const { urls, style, className = "", onClickImage } = props;

    return (<div className={`image-grid ${className}`} style={style}>
        {urls.map((url, index) => (<div
            className="image-item"
            style={{
                cursor: onClickImage ? 'pointer' : 'unset',
            }}
            key={index}
            onClick={() => {
                onClickImage && onClickImage(url, index);
            }}
        >
            <img src={url} />
        </div>))}
    </div>)
};

export default ImageGrid;