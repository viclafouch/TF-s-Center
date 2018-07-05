import React, { Component } from 'react'
import Button from '../Button';

export class ToolsFlag extends Component {
    render() {

        let { videos, pagination } = this.props;

        let videosSelected = videos.filter(x => x.selected === true);
        let videosRemoved = videos.filter(x => x.isRemoved === true);

        return (
            <div className="tools">
                <div>
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
                {
                    pagination.length !== 0 &&
                    <div className="mgi--top-10">
                        <div className="tools-pagination">
                            {
                                pagination.map((elem, index) =>
                                    <a href={elem.url} className="mgi--right-4" key={index}>
                                        <Button blue className={elem.isActual ? 'active' : ''}>
                                            {elem.isNext ? 'Next' : elem.isPrev ? 'Prev' : elem.numPage}
                                        </Button>
                                    </a>
                                )
                            }

                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ToolsFlag
