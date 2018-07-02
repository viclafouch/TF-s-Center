import React, { Component } from 'react'
import Button from '../Button';

export class ToolsFlag extends Component {
    render() {

        let { videos } = this.props;

        let videosSelected = videos.filter(x => x.selected === true);
        console.log(videosSelected.length === 0);


        return (
            <div className="tools">
                <div>
                    <Button
                        disabled={videosSelected.length === 0}
                        className="mgi--right-10"
                        onClick={this.props.onSubmit}
                    >Ajouter à la liste</Button>
                    <Button className="mgi--right-10">Cacher les vidéos supprimées</Button>
                    <Button className="mgi--right-10">Cacher les vidéos déjà reviewed</Button>
                </div>
                <div>
                    <div>{videosSelected.length} / {videos.length}</div>
                </div>
            </div>
        )
    }
}

export default ToolsFlag
