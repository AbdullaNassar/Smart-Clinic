import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './UI/ErrorFallback';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>window.location.replace('/')}>
            <ThemeProvider theme={theme}>
            <App/>
            </ThemeProvider>
        </ErrorBoundary>
        
    </React.StrictMode>
);
