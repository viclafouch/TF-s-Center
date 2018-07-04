import React, { Component } from 'react'
import Button from '../Button';

export class ToolsFlag extends Component {
    render() {

        let { videos } = this.props;

        let videosSelected = videos.filter(x => x.selected === true);
        let videosRemoved = videos.filter(x => x.isRemoved === true);

        return (
            <div className="tools">
                <div>
                    {
                        this.props.onSubmit &&
                        <Button
                            blue
                            disabled={videosSelected.length === 0}
                            className="mgi--right-10"
                            onClick={this.props.onSubmit}
                        >Ajouter à la liste</Button>
                    }
                    <Button blue className="mgi--right-10">Cacher les vidéos supprimées</Button>
                    <Button blue className="mgi--right-10">Cacher les vidéos déjà reviewed</Button>
                </div>
                <div>
                    <div>
                        <span className={!this.props.onSubmit && videosRemoved.length > 0 ? 'red-color' : ''}>{this.props.onSubmit ? videosSelected.length : videosRemoved.length}</span>
                        {' / '}
                        {videos.length}
                    </div>
                </div>
            </div>
        )
    }
}

export default ToolsFlag
