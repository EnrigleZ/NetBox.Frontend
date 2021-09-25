import React from 'react';
import { IImageGridProps } from './interface';
import './index.less';

const ImageGrid: React.FunctionComponent<IImageGridProps> = (props) => {
    const { urls, style, className = "" } = props;

    return (<div className={`image-grid ${className}`} style={style}>
        {urls.map((url, index) => (<div className="image-item" key={index}>
            <img src={url}/>
        </div>))}
    </div>)
};

export default ImageGrid;