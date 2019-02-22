import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import { Navbar} from 'reactstrap'



class NavBar extends Component {




    render() {
        return (
            <Navbar color="dark" light expand="md">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/idea">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={this.props.clearStorage}>/ Log out</Link>
                    </li>
                </ul>
            </Navbar>
        )
    }
}

export default NavBar