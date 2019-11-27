import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';


const Register = (props) => {
    // component state
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: ''
    });

    // on change handler 
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            // fire action
            props.setAlert("Passwords don't match", 'danger', 3000);
        } else {
            // fire action
            props.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
        }
    }

    if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    
    // Return
    return (
        <React.Fragment>
            <div className="row mt-5">
                <div className="col-6 offset-3">
                    <h1 className="text-primary">Sign Up</h1>
                    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={e => onChange(e)}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={e => onChange(e)}

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

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                minLength="6"
                                value={formData.confirmPassword}
                                onChange={e => onChange(e)}

                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-6 offset-3">
                    <p className='text-center'>
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register })(Register);



