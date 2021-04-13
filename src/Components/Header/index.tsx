import React, { useState, useEffect, useCallback } from 'react';
import WideHeader from './WideHeader';
import MobileHeader from './MobileHeader';

export default function Header()
{
    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect(() => {
        window.onresize = onResize;
    }, [])

    const onResize = useCallback(() => {
        setWidth(window.innerWidth);
    }, []);

    return width > 768 ? <WideHeader /> : <MobileHeader />;
}
