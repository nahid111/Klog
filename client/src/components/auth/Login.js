import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';


const Login = (props) => {
    // component state
    const [formData, setFormData] = useState({ email: '', password: '' });

    // on change handler 
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.login(formData.email, formData.password);
    }

    if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />
    }



    return (
        <React.Fragment>
            <div className="row mt-5">
                <div className="col-6 offset-3">
                    <h1 className="large text-primary">Sign In</h1>
                    <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>


                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={formData.password}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-6 offset-3">
                    <p className='text-center'>
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);


