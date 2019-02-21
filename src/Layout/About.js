import React, { Component, Fragment } from 'react';
import { Header, Footer } from 'Components';
import './About.scss';

class About extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <Fragment>
                <Header />
                <div className='about-page-wrapper'>
                    <div className='about-page-inner'>페이지 준비중입니다.</div>
                </div>
                <Footer />
            </Fragment>

        );
    }
}

export default About;