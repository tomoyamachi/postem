// LICENSE : MIT
"use strict";
let React = require("react");
let ReactCodeMirror = require('react-codemirror');
require("codemirror/addon/mode/overlay.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/mode/gfm/gfm.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/meta.js");
require("codemirror/addon/edit/continuelist.js");
require("codemirror/addon/lint/lint.js");
const createValidator = require("codemirror-textlint");
const preset = require("textlint-rule-preset-japanese");
const validator = createValidator(preset);
import Mousetrap from "mousetrap";
export default class Editor extends React.Component {
    componentDidMount() {
        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((key, index) => {
            Mousetrap.bind(`command+${key}`, () => {
                this.props.enableServiceAtIndex(index)
            });
            Mousetrap.bind(`command+shift+${key}`, () => {
                this.props.disableServiceAtIndex(index);
            });
            Mousetrap.bind(`command+ctrl+${key}`, () => {
                this.props.disableServiceAtIndex(index);
            });
        });
    }

    render() {
        var extraKeys = {
            "Cmd-Enter": () => {
                this.props.onSubmit();
            }
        };
        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((key, index) => {
            extraKeys[`Cmd-${key}`] = () => {
                this.props.enableServiceAtIndex(index);
            };
            extraKeys[`Cmd-Ctrl-${key}`] = () => {
                this.props.disableServiceAtIndex(index);
            };
            extraKeys[`Shift-Cmd-${key}`] = () => {
                this.props.disableServiceAtIndex(index);
            }
        });
        var options = {
            lineWrapping: true,
            mode: "gfm",
            gutters: ["CodeMirror-lint-markers"],
            lint: {
                "getAnnotations": validator,
                "async": true
            },
            extraKeys: extraKeys
        };
        return <div className="Editor">
            <h2 className="l-header">Body</h2>
            <ReactCodeMirror value={this.props.value} onChange={this.props.onChange} options={options}/>
        </div>
    }
}