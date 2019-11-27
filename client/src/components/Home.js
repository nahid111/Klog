import React from 'react';

const Home = () => {

    return (
        <div className='jumbotron bg-primary text-white text-center mt-5'>
            <h1 className="display-1">Klog</h1>
            <hr style={{borderTop: "1px solid white"}}/>
            <p className='lead'>A blog application using Koa.js for backend with React-Redux frontend</p>
        </div>
    );
}

export default Home;


