import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../actions/index'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem  } from 'reactstrap';

class Header extends Component {

    state = {
        isOpen : false
    }

    toogle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    renderNavigation = ()=>{
        if(!this.props._username){
            return (
                <Nav className="ml-auto mr-5" navbar>
                    <NavItem>
                        <NavLink tag = {Link} className="" to ="/login">
                            <button className="btn btn-outline-success">Login</button>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} className="nav-link" to ="/register">
                            <button className="btn btn-outline-info">Register</button>
                        </NavLink>
                    </NavItem>

                </Nav>
            )
        }else{
            return (
                <Nav className="ml-auto mr-5" navbar>
                    <NavItem>
                        <NavLink tag = {Link} to ="/">Task</NavLink>
                    </NavItem>

                    <UncontrolledDropdown>
                        <DropdownToggle nav inNavbar>
                            Hello, {this.props._username}
                        </DropdownToggle>

                        <DropdownMenu>
                            <DropdownItem>
                                <NavLink tag={Link} className="dropdown-item" to='/profile'>Profile</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink tag={Link} className="dropdown-item" to='/editProfile'>Edit Profile</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink className="dropdown-item" onClick={this.props.logOut}>Logout</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
        }
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link className="navbar-brand" to ="/">Mongoose db</Link>
                    <NavbarToggler onClick={this.toogle}/>
                    <Collapse isOpen = {this.state.isOpen} navbar/>

                        {this.renderNavigation()}

                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        _id: state.auth._id,
        _username: state.auth.username
    }
}

export default connect(mapStateToProps,{logOut})(Header)
