import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './UI/ErrorFallback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>window.location.replace('/')}>
            <App/>
        </ErrorBoundary>
        

    </React.StrictMode>
);
