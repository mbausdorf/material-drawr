import './css/bootstrap.css';
import './../node_modules/rc-color-picker/assets/index.css';
import './CanvasControl.css';

import { Panel as ColorPickerPanel } from 'rc-color-picker';
import Slider, { Range } from 'rc-slider';
import Checkbox from 'rc-checkbox'
import './../node_modules/rc-slider/assets/index.css';
import './../node_modules/rc-checkbox/assets/index.css';

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
        this.props.canvas.updateOptions({ colour: obj.color });
    }

    onStyleChange(obj) {
        if (typeof obj.target == "undefined") {
            this.props.canvas.updateOptions({ width: obj })
        } else {
            if (obj.target.checked == true) {
                this.props.canvas.updateOptions({ type: 'eraser' });
            } else {
                this.props.canvas.updateOptions({ type: 'pen' });
            }
        }
    }

    render() {
        return (
            <div className='StylingPane'>
                <label>Colour</label>
                <ColorPickerPanel
                    mode='RGB'
                    color={'#36c'}
                    onChange={this.onColorChange.bind(this)}
                />
                <br />
                <label>Stroke-width</label>
                <Slider onChange={this.onStyleChange.bind(this)} />
                <br />
                <label>Eraser</label>
                <Checkbox onChange={this.onStyleChange.bind(this)} />
                <br />
            </div>
        );
    }
}

export default CanvasControl;
