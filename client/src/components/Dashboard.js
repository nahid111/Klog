import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const Dashboard = (props) => {

    if (!props.auth.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className='jumbotron mt-5 bg-dark text-white text-center'>
                    <h1>Welcome {props.auth.user.name}</h1>
                    <p>This is a Protected Route</p>
                </div>
            </div>
        </div>
    )
}


Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(Dashboard);



