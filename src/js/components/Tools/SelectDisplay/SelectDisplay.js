import React, { Component } from 'react'
import Checkbox from '@components/layouts/Checkbox';
import { YouTubeContext } from '@stores/YouTubeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns } from '@fortawesome/free-solid-svg-icons/faColumns'

export class SelectDisplay extends Component {
    render() {
        return (
            <div className="flex-me flex-align">
                <label className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary flex-me flex-align" htmlFor="chooseDisplayed">
                    <span className="mgi--right-6">Change display</span>
                    <YouTubeContext.Consumer>
                        {(context) => (
                            <React.Fragment>
                                <Checkbox
                                    checked={context.state.displaying === 'column'}
                                    onChange={e => context.setState({
                                      displaying: e.target.checked ? 'column' : 'row'
                                    })}
                                    name="chooseDisplayed"
                                    hide={true}
                                />
                                <FontAwesomeIcon icon={faColumns} size="1x" fixedWidth />
                            </React.Fragment>
                        )}

                    </YouTubeContext.Consumer>
                </label>
            </div>
        )
    }
}

export default SelectDisplay
