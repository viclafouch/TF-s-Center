import React, { Component } from 'react'
import Textarea from '../layouts/Textarea'
import Button from '../Button';

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
                <fieldset className="yt-uix-form-fieldset">
                    <legend className="yt-uix-form-legend">Motif du signalement :</legend>
                    <ul className="yt-uix-form-list-option">
                        {
                            this.labels.map((elem, index) =>
                                <li>
                                    <label>
                                        <span className="yt-uix-form-input-radio-container">
                                            <input type="radio" class="yt-uix-form-input-radio deputy-flag-reason" name="reason" value={elem.value}/>
                                            <span className="yt-uix-form-input-radio-element"></span>
                                        </span>
                                        {elem.text}
                                    </label>
                                </li>
                            )
                        }
                    </ul>
                </fieldset>
                <fieldset>
                    <Textarea
                        className="csstudio-frm-input u-full-width"
                        placeholder="Description"
                        value=""
                        onChange={this.handleChange}
                    />
                </fieldset>
                <fieldset>
                    <Button type="submit">Send</Button>
                </fieldset>
            </div>
        )
    }
}

export default FormReporting
