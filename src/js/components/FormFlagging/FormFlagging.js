import React, { Component } from 'react'
import Button from '../Button';

export class FormFlagging extends Component {
    render() {
        return (
            <form action="POST" method="/deputy?action_submit">
                {this.props.children}
                <Button id="deputy-flag-add-to-list" onClick={() => { return false; }}>Flag</Button>
            </form>
        )
    }
}

export default FormFlagging
