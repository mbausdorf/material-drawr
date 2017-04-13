import './css/bootstrap.css';
import './ServerConfiguration.css';

import React from 'react';
import PropTypes from 'prop-types';

const PROP_TYPES = {
    clientCallback: PropTypes.func
};

class ServerConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: 'localhost',
            port: '3000',
            sessionId: '',
            username: '',
            connectedId: ''
        };
    }

    static get propTypes() {
        return PROP_TYPES;
    }

    handleChange(key, event) {
        let state = {};
        state[key] = event.target.value;
        this.setState(state);
    }

    handleSubmit(key) {
        let id;
        this.props.clientCallback(key, this.state).then(sessionInfo => {
            id = sessionInfo.id;
            this.setState({connectedId: id});
        });
    }

    render() {
        return (
            <div className='ServerForm'>
                <div className='Wrapper'>
                    <div className='AddressField'>
                    <label>
                        <input
                            value={this.state.address}
                            onChange={this.handleChange.bind(this, 'address')} />
                    </label>
                    </div>
                    <div className='PortField'>
                        <label>
                            <input
                                value={this.state.port}
                                onChange={this.handleChange.bind(this, 'port')} />
                        </label>
                    </div>
                </div>
                <div className='SessionId'>
                    <input
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.handleChange.bind(this, 'username')} />
                </div>
                <div className='SessionId'>
                    <input
                        placeholder='session id to join'
                        value={this.state.sessionId}
                        onChange={this.handleChange.bind(this, 'sessionId')} />
                </div>
                <div className='Wrapper'>
                    <div className='Submit'>
                        <input type='submit' value='Join'
                            onClick={this.handleSubmit.bind(this, 'join')}/>
                    </div>
                    <div className='Submit'>
                        <input type='submit' value='New'
                            onClick={this.handleSubmit.bind(this, 'new')}/>
                    </div>
                </div>
                <div>{this.state.connectedId}</div>
            </div>
        );
    }
}

export default ServerConfiguration;
