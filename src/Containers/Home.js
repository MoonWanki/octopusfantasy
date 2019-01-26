import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div className='home-container'>
                <h1>OCTOPUS FANTASY</h1>
                <Link to='/login'><h2>LOGIN</h2></Link>
            </div>
        );
    }
};

export default Home;