import React, { Component } from 'react'
import Button from '../Button';
import ToolsFlag from '../ToolsFlag/ToolsFlag'

export class FormFlagging extends Component {
    render() {
        return (
            <form action="POST" method="/deputy?action_submit">
                <ToolsFlag />
                {this.props.children}
            </form>
        )
    }
}

export default FormFlagging
