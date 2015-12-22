// LICENSE : MIT
"use strict";
import React from "react"
export default class URLInput extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            value: this.props.URL
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.value === nextProps.URL) {
            return;
        }
        this.setState({
            value: nextProps.URL
        });
    }
    onChange({target}) {
        let value = target.value;
        this.props.updateURL(value);
        this.setState({value})
    }

    render() {
        return <div className="URLInput">
            <input type="text" placeholder="URL" value={this.state.value} onChange={this.onChange.bind(this)}/>
        </div>
    }
}