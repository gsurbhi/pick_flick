import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from "./app";



ReactDOM.render(<App/>, document.getElementById('root'));




serviceWorker.unregister();
