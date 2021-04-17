import React, { useEffect } from 'react';

export default function NotFound()
{
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            404 Not Found
        </div>
    );
}
