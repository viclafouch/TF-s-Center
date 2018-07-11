import React, { Component } from 'react'
import Button from '../../Button';
import Checkbox from '../../layouts/Checkbox'
import { YouTubeContext } from '../../../main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'
import { trySearch } from '../../../utils';

export class ListSearches extends Component {

    handleChange(e, context) {
        e.stopPropagation();
        let id = e.target.id;
        let searchIndex = context.state.searches.findIndex(x => x.id == id);
        let searches = context.state.searches;
        searches[searchIndex].selected = e.target.checked;
        return context.setState('searches', searches);
    }

    handleRemove(context) {
        let searchesSelected = context.state.searches.filter(x => x.selected)
        return context.removeSearch(searchesSelected);
    }

    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <div className="box-material table-searches">
                        <form>
                            <table className="table-material">
                                <thead>
                                    <tr>
                                        <th>
                                            <Checkbox
                                                onChange={e => context.selectAll('searches', e.target.checked)}
                                            />
                                        </th>
                                        <th>#</th>
                                        <th>Value</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        context.state.searches.map((elem, index) =>
                                            <tr key={elem.id}>
                                                <th>
                                                    <Checkbox
                                                        checked={elem.selected}
                                                        id={elem.id}
                                                        value={elem.id}
                                                        name="select_search"
                                                        checked={elem.selected}
                                                        onChange={e => this.handleChange(e, context)}
                                                    />
                                                </th>
                                                <th scope="row">{index}</th>
                                                <td>{elem.value}</td>
                                                <td style={{ width: 150 }}>
                                                    <Button onClick={() => trySearch(elem.value)}>Go</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <Button disabled={!context.state.searches.find(x => x.selected)} onClick={() => this.handleRemove(context)}>Remove</Button>
                        </form>
                    </div>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default ListSearches
