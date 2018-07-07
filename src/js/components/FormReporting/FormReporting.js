import React, { Component } from 'react'
import Textarea from '../layouts/Textarea'
import Button from '../Button';
import { YouTubeContext } from '../../main';

export class FormReporting extends Component {
    constructor() {
        super();

        this.labels = [
            { value: 'P', text: 'Contenu à caractère sexuel' },
            { value: 'G', text: 'Contenu violent ou abject' },
            { value: 'R', text: 'Contenu violent ou incitant à la haine' },
            { value: 'X', text: 'Actes dangereux et pernicieux' },
            { value: 'J', text: 'Maltraitance d\'enfants' },
            { value: 'Z', text: 'Spam' },
        ]
    }

    render() {
        return (
            <div className="form-reporting">
                <div className="pdi--20">
                    <YouTubeContext.Consumer>
                        {(context) => (
                            <h3>Report videos ({context.state.videosDisplayed.filter(x => x.selected === true).length})</h3>
                        )}
                    </YouTubeContext.Consumer>
                    <fieldset className="form-reporting-fieldset">
                        <legend className="yt-uix-form-legend">What is the issue ?</legend>
                        <ul className="yt-uix-form-list-option paper-list">
                            {
                                this.labels.map((elem, index) => (
                                    <li key={index} className="paper-item">
                                        <label>
                                            <span className="paper-radio">
                                                <input type="radio" className="yt-uix-form-input-radio deputy-flag-reason" name="reason" value={elem.value} />
                                                <span className="paper-radio-element"></span>
                                            </span>
                                            <div className="mgi--left-12">
                                                <span>{elem.text}</span>
                                            </div>
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                    </fieldset>
                    <fieldset className="form-reporting-fieldset">
                        <Textarea
                            className="csstudio-frm-input u-full-width"
                            placeholder="Provide additional details"
                            value={this.props.description}
                            name="flag_comments"
                            maxLength="500"
                            onChange={this.props.handleChange}
                        />
                    </fieldset>
                </div>
                <div className="form-reporting-fieldset buttons">
                    <div className="mgi--left-10">
                        <Button type="button" white onClick={() => this.props.onClosed()}>Close</Button>
                    </div>
                    <div className="mgi--left-10">
                        <Button type="submit" blue>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormReporting
