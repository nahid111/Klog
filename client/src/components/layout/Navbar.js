import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';


const NavigationBar = (props) => {
    const authLinks = (
        <a href="#!" className="nav-link" onClick={props.logout}>
            <i className="fas fa-sign-out-alt"></i> Logout
        </a>
    );

    const guestLinks = (
        <React.Fragment>
            <Link to="/register" className="nav-link">
                <i className="fas fa-user-plus"></i> Register
            </Link>
            <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt"></i> Login
            </Link>
        </React.Fragment>
    );

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link className='navbar-brand' to='/'>Klog</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/dashboard" className="nav-link">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                    </Link>
                </Nav>
                <Nav>
                    {!props.auth.loading && (<React.Fragment>{props.auth.isAuthenticated ? authLinks : guestLinks}</React.Fragment>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


NavigationBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logout })(NavigationBar);




