import React, { Component } from 'react'
import Button from '../Button';

export class ToolsFlag extends Component {
    render() {

        let { videos } = this.props;

        let videosSelected = videos.filter(x => x.selected === true);
        let videosRemoved = videos.filter(x => x.isRemoved === true);

        return (
            <div className="tools">
                <div className="mgi--bottom-10">
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
                        {
                            !this.props.canFlag &&
                            <React.Fragment>
                                <Button
                                    blue
                                    className={"mgi--right-10 " + (this.props.hideRemoved ? 'active' : '')}
                                    onClick={this.props.handleTools}
                                    name="hideRemoved"
                                >Cacher les vidéos supprimées</Button>
                                <Button
                                    blue
                                    className={"mgi--right-10 " + (this.props.hideReviewed ? 'active' : '')}
                                    onClick={this.props.handleTools}
                                    name="hideReviewed"
                                >Cacher les vidéos déjà reviewed</Button>
                            </React.Fragment>
                        }
                    </div>
                    <div>
                        <div>
                            <span className={!this.props.onSubmit && videosRemoved.length > 0 ? 'red-color' : ''}>{this.props.onSubmit ? videosSelected.length : videosRemoved.length}</span>
                            {' / '}
                            {videos.length}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="tools-pagination">
                        <a href="/">
                            <Button blue>1</Button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToolsFlag
