import React, { useEffect } from 'react';
import { Alert } from '@mui/material';

function CustomAlert({ text, severity, index, onRemove }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove();
        }, 3000); 

        return () => clearTimeout(timer);
    }, [onRemove]);

    return (
        <Alert severity={severity} variant='filled' style={{width: '25%', position: 'absolute', right: 0, zIndex: 1000, fontSize: '1em', top: 10 + index * 60}}>
            {text}
        </Alert>
    );
}

export default CustomAlert;