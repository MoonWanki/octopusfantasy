import React, { ReactElement } from 'react';
import './index.scss';

interface Props
{
    message: string,
}

export default function Loading({ message }: Props): ReactElement
{
    return (
        <div className='loading-container'>
            <div className='loading-content-image' />
            <p className='loading-content-text'>{message}</p>
        </div>
    );
}
