import React, { Component } from 'react'

export class Sidebar extends Component {
    render() {
        return (
            <aside className="sidebar">
                <div className="profile-wrapper">
                    <img src="https://yt3.ggpht.com/-S2LcjnxOoXc/AAAAAAAAAAI/AAAAAAAAAAA/SfHM8F50Xo0/s900-mo-c-c0xffffffff-rj-k-no/photo.jpg" alt=""/>
                </div>
                <nav className="navbar">
                    <ul className="nav-link">
                        <li>
                            <a href="/" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="nav-link">
                        <li>
                            <a href="/" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="youtube-link">
                                <span className="span-icon mgi--right-16">i</span>
                                <span className="text-link">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        )
    }
}

export default Sidebar
