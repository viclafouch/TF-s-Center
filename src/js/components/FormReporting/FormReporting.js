import React, { Component } from 'react'
import Textarea from '../layouts/Textarea'
import Button from '../Button';
import { YouTubeContext } from '../../main';
import { labels } from '../../config';
import CountLetter from '../layouts/CountLetter';
import Select from '../layouts/Select';

export class FormReporting extends Component {
    render() {
        return (
            <div className="form-reporting">
                <div className="pdi--20">
                    <YouTubeContext.Consumer>
                        {(context) => (
                            <div className="flex-me flex-justify-between">
                                <h3>Report videos ({context.state.videosDisplayed.filter(x => x.selected === true).length})</h3>
                                <Select
                                    options={context.state.templates.map(e => {
                                        return {
                                            title: e.title,
                                            value: e.id
                                        }
                                    })}
                                    defaultOptionTitle="Choose template"
                                    null
                                    name="templateIdSelected"
                                    value={this.props.templateIdSelected || ''}
                                    onChange={(e) => this.props.handleChange(e, context)}
                                />
                            </div>
                        )}
                    </YouTubeContext.Consumer>
                    <fieldset className="form-reporting-fieldset">
                        <legend className="yt-uix-form-legend">What's the issue ?</legend>
                        <ul className="yt-uix-form-list-option paper-list">
                            {
                                labels.map((elem, index) => (
                                    <li key={index} className="paper-item">
                                        <label>
                                            <span className="paper-radio">
                                                <input
                                                    type="radio"
                                                    className="yt-uix-form-input-radio deputy-flag-reason" name="reason"
                                                    onChange={this.props.handleChange}
                                                    checked={this.props.reason === elem.value}
                                                    value={elem.value}
                                                />
                                                <span className="paper-radio-element"></span>
                                            </span>
                                            <div className="mgi--left-12">
                                                <span>{elem.title}</span>
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
                            spellCheck="false"
                            maxLength="500"
                            onChange={this.props.handleChange}
                        />
                    </fieldset>
                    <CountLetter text={this.props.description} limit={500} style={{textAlign: 'right'}} />
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
