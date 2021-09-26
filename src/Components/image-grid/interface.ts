import React from 'react';

export interface IImageGridProps {
    urls: string[];
    style?: React.CSSProperties;
    className?: string;
    onClickImage?: Function;
}
