import * as React from "react";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import { generateSeed, isOSX } from "../lib/utils";

@observer
export default class App extends React.Component<any, any> {
    private seedElem: HTMLTextAreaElement;

    @observable private seed = "000000000000000000000000000000000000000000000000000000000000000000000000000000000";

    @action private generate = async () => {
        this.seed = await generateSeed();
        this.copySeed();
    }

    private copySeed = () => {
        this.seedElem.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    public render() {
        return (
            <div id="app">
                { !isOSX() ? (
                    <div id="close">
                        <button onClick={ window.close }>x</button>
                    </div>
                ) : null }

                <div id="heading">
                    <h1>IOTA Seed Generator</h1>
                </div>

                <textarea
                    onClick={ this.copySeed }
                    minLength={81}
                    maxLength={81}
                    ref={ elem => this.seedElem = elem }
                    id="seed"
                    value={ this.seed }
                    readOnly />

                <div className="spacer" />

                <button
                    className="button"
                    onClick={ this.generate }
                    >Generate & Copy</button>
            </div>
        )
    }
}
