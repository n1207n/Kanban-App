import './scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

import App from './components/App.jsx';

persist(alt, storage, 'app');

ReactDOM.render(<App />, document.getElementById('app'));
