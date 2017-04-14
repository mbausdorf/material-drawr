import './css/bootstrap.css';
import './index.css';
import './../node_modules/material-design-lite/dist/material.cyan-light_blue.min.css'
import './../node_modules/material-design-lite/material.js'

import drawr from 'drawr';
import ServerConfiguration from './ServerConfiguration.jsx';
import CanvasControl from './CanvasControl.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

let canvas = new drawr.DrawrCanvas('canvas');

let client;
function handleConnectionInput(key, config) {
    client = new drawr.DrawrClient({
        name: config.username,
    }, {
            host: config.address,
            port: config.port
        });
    let sessionInfo = {};
    if (key === 'new') {
        return client.newSession('test').then(success => {
            sessionInfo.id = success;
            client.addEventListener('update-canvas', function (data) {
                if (client._user.name !== data.username) {
                    canvas.remoteUpdate(JSON.parse(data.canvasState));
                }
            });
            canvas.addEventListener('new-click', function (clicks) {
                client.sendCanvasUpdate(clicks);
            });
            return sessionInfo;
        });
    } else {
        return client.joinSession(config.sessionId).then(() => {
            client.addEventListener('update-canvas', function (data) {
                if (client._user.name !== data.username) {
                    canvas.remoteUpdate(JSON.parse(data.canvasState));
                }
            });
            canvas.addEventListener('new-click', function (clicks) {
                client.sendCanvasUpdate(clicks);
            });
        });
    }
}

ReactDOM.render(
    <ServerConfiguration clientCallback={handleConnectionInput} />,
    document.getElementById('session')
);

ReactDOM.render(
    <CanvasControl canvas={canvas} />,
    document.getElementById('styling')
);
