import './css/bootstrap.css';
import './../node_modules/rc-color-picker/assets/index.css';
import './CanvasControl.css';

import {Panel as ColorPickerPanel} from 'rc-color-picker';

import React from 'react';
import PropTypes from 'prop-types';

const PROP_TYPES = {
    onStyleChange: PropTypes.func,
    canvas: PropTypes.object
};

class CanvasControl extends React.Component {
    constructor(props) {
        super(props);
        // this.onColorChange = this.onColorChange.bind(this);
    }

    static get propTypes() {
        return PROP_TYPES;
    }

    onColorChange(obj) {
        this.props.canvas.updateOptions({colour: obj.color});
    }

    render() {
        return (
            <div className='StylingPane'>
                <ColorPickerPanel
                    mode='RGB'
                    color={'#36c'}
                    onChange={this.onColorChange.bind(this)}
                />
            </div>
        );
    }
}

export default CanvasControl;
