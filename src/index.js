import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'whatwg-fetch';

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
