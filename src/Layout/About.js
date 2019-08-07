import React, { Component, Fragment } from 'react'
import { Header, Footer } from 'Components'
import './About.scss'
import { Fade } from 'react-reveal'

class About extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <Fragment>
                <Header />
                <div className='about-banner'>
                    <div className='about-banner-inner'>
                        <Fade bottom distance='3em'>
                            <div>
                                <span style={{ fontWeight: 500 }}>Octopus Fantasy</span>의 <span style={{ fontWeight: 500 }}>Owner</span>인 <span style={{ fontWeight: 500 }}>Moon Wanki</span>는<br />
                                중학교 3학년이었던 2009년부터 <span style={{ fontWeight: 500 }}>'Octopus Fantasy'라는 이름의 네이버 블로그</span>를 운영하며<br />
                                왕성한 UCC 활동을 바탕으로 많은 블로거들과의 커뮤니케이션을 즐겨왔습니다.<br />
                                <br />
                                <br />
                            </div>
                        </Fade>
                        <Fade bottom distance='3em' delay={100}>
                            <div>
                                오랜 꿈이었던 개인 플랫폼 운영을 성취하고자<br />
                                <span style={{ fontWeight: 500 }}>현대에 가장 트렌디한 개발 기술을 습득 · 접목</span>하여 <span style={{ fontWeight: 500 }}>직접 제작 및 운영</span>하게 된 플랫폼이 바로<br />
                                <span style={{ fontWeight: 500 }}>Octopus Fantasy</span> 입니다.<br />
                                <br />
                                <br />
                            </div>
                        </Fade>
                        <Fade bottom distance='3em' delay={200}>
                            <div>
                                단순히 수많은 UCC들이 담겨 있는 개인 블로그의 모습에서 나아가,<br />
                                <span style={{ fontWeight: 500 }}><span style={{ color: 'gold' }}>신기술을 기반으로 한 다양하고 새로운 컨텐츠를 서비스하는 플랫폼</span>으로 발돋움하고자 합니다.</span><br />
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className='about-crews'>
                    <Fade bottom distance='3em'>
                        <div className='about-crews-profile'>
                            <div className='about-crews-profile-avatar' style={{ backgroundImage: `url(${require('images/crew_owner.jpg')})`}} />
                            <div className='about-crews-profile-content'>
                                <div className='about-crews-profile-header'><span style={{ fontSize: '1.4em' }}>Moon Wanki <span style={{ color: 'lightgray' }}>|</span></span> Owner</div>
                                <div className='about-crews-profile-text'>
                                    1994.4&emsp;출생<br />
                                    2013.3&emsp;아주대학교 미디어학과 입학<br />
                                    2014.6 ~ 2016.6&emsp;공군 제10전투비행단 서버실 근무<br />
                                    2018.6 ~ 2018.8&emsp;㈜ Quram 근무<br />
                                    2018.12 ~ 2019.2&emsp;㈜ Kidsoft 근무<br />
                                    2019.5 ~&emsp;SK주식회사 C&amp;C 근무<br />
                                    2019.8 ~&emsp;삼성전자 무선사업부 근무<br />
                                </div>
                            </div>
                        </div>
                    </Fade>

                    <Fade bottom distance='3em'>
                        <div className='about-crews-profile' style={{ alignSelf: 'flex-end'}}>
                            <div className='about-crews-profile-avatar' style={{ backgroundImage: `url(${require('images/crew_jamlee.jpg')})`}} />
                            <div className='about-crews-profile-content'>
                                <div className='about-crews-profile-header'><span style={{ fontSize: '1.4em' }}>Jamlee <span style={{ color: 'lightgray' }}>|</span></span> Coworker</div>
                                <div className='about-crews-profile-text'>
                                    1993.4&emsp;출생<br />
                                    2013.3&emsp;아주대학교 미디어학과 입학<br />
                                    2014.10 ~ 2016.7 &emsp;대한민국 청와대 대통령실 경호처 제1경비단 근무<br />
                                    2019.3 ~&emsp;LG CNS 근무<br />
                                </div>
                            </div>
                        </div>
                    </Fade>

                    <Fade bottom distance='3em'>
                        <div className='about-crews-profile'>
                            <div className='about-crews-profile-avatar' style={{ backgroundImage: `url(${require('images/crew_aibees.jpg')})`}} />
                            <div className='about-crews-profile-content'>
                                <div className='about-crews-profile-header'><span style={{ fontSize: '1.4em' }}>Junseo Park <span style={{ color: 'lightgray' }}>|</span></span> Coworker</div>
                                <div className='about-crews-profile-text'>
                                    1994.3&emsp;출생<br />
                                    2013.3&emsp;아주대학교 미디어학과 입학<br />
                                    2015.3 ~ 2016.12 &emsp;대한민국 육군 제 12 보병사단 근무<br />
                                    2019.4 ~ 2019.7 &emsp;NAVER Search&amp;Clova(Data Engineer) 근무<br />
                                    2019.7 ~&emsp;매그니스 근무<br />
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                
                <Footer />
            </Fragment>

        )
    }
}

export default About