import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from './Navbar';
import Alert from './Alert';

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navbar />
            <Container>
                <Alert />
                {props.children}
            </Container>
        </React.Fragment>
    )
}

export default Layout;


