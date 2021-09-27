import React from 'react';

export interface IImageGridProps {
    urls: string[];
    style?: React.CSSProperties;
    className?: string;
    onClickImage?: Function;
}

export interface IImageModalProps {
    urls: string[];
    initIndex?: number;
    display: boolean;
    onClose: Function;
}
