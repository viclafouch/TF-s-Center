import React, { Component } from 'react'

export class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="profile-wrapper">
                    <img src="https://yt3.ggpht.com/-S2LcjnxOoXc/AAAAAAAAAAI/AAAAAAAAAAA/SfHM8F50Xo0/s900-mo-c-c0xffffffff-rj-k-no/photo.jpg" alt=""/>
                </div>
                <nav className="navbar">
                    <ul className="nav-link">
                        <li>
                            <a href="/flagging_history" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">History</span>
                            </a>
                        </li>
                        <li>
                            <a href="/deputy" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Statistics</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.contributorscommunity.com/t5/Trusted-Flagger-Forum/bd-p/EN_Flaggers_Board" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Contributor Forum</span>
                            </a>
                        </li>
                        <li>
                            <a href="" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Send mail</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="nav-link">
                        <li>
                            <a href="/" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Help</span>
                            </a>
                        </li>
                        <li>
                            <a href="/logout" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Sidebar
