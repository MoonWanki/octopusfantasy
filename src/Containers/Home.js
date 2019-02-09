import React, { Component } from 'react'

import { Header, ProfileZone } from 'Components'

class Home extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div>
                <Header />
                <h1>OCTOPUS FANTASY</h1>
                <ProfileZone />
            </div>
        );
    }
};

export default Home;
