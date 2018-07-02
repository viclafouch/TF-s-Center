import React, { Component } from 'react'
import Button from '../Button';

export class ToolsFlag extends Component {
    render() {
        return (
            <div className="tools">
                <Button className="mgi--right-10">Ajouter à la liste</Button>
                <Button className="mgi--right-10">Cacher les vidéos supprimées</Button>
                <Button className="mgi--right-10">Cacher les vidéos déjà reviewed</Button>
            </div>
        )
    }
}

export default ToolsFlag
