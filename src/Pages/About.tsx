import React, { ReactElement, Fragment, useEffect } from 'react';
import { Header, Footer } from '~/components';
import { Fade } from 'react-awesome-reveal';
import crewImageOwner from '~/assets/images/crew_owner.jpg';
import crewImageJamlee from '~/assets/images/crew_jamlee.jpg';
import crewImageAibees from '~/assets/images/crew_aibees.jpg';
import './About.scss';

export default function About(): ReactElement {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>
            <Header />
            <div className='about-banner'>
                <div className='about-banner-inner'>
                    <div>
                        <span style={{ fontWeight: 500 }}>Octopus Fantasy</span>의 <span style={{ fontWeight: 500 }}>Owner</span>인 <span style={{ fontWeight: 500 }}>Moon Wanki</span>는<br />
                        중학교 3학년이었던 2009년부터 <span style={{ fontWeight: 500 }}>'Octopus Fantasy'라는 이름의 네이버 블로그</span>를 운영하며<br />
                        왕성한 UCC 활동을 바탕으로 많은 블로거들과의 커뮤니케이션을 즐겨왔습니다.<br />
                        <br />
                        <br />
                    </div>
                    <div>
                        오랜 꿈이었던 개인 플랫폼 운영을 성취하고자<br />
                        <span style={{ fontWeight: 500 }}>현대에 가장 트렌디한 개발 기술을 습득 · 접목</span>하여 <span style={{ fontWeight: 500 }}>직접 제작 및 운영</span>하게 된 플랫폼이 바로<br />
                        <span style={{ fontWeight: 500 }}>Octopus Fantasy</span> 입니다.<br />
                        <br />
                        <br />
                    </div>
                    <div>
                        단순히 수많은 UCC들이 담겨 있는 개인 블로그의 모습에서 나아가,<br />
                        <span style={{ fontWeight: 500 }}><span style={{ color: 'gold' }}>신기술을 기반으로 한 다양하고 새로운 컨텐츠를 서비스하는 플랫폼</span>으로 발돋움하고자 합니다.</span><br />
                    </div>
                </div>
            </div>
            <div className='about-crews'>
                <div className='about-crews-profile'>
                    <div className='about-crews-profile-avatar' style={{ backgroundImage: `url(${crewImageOwner})` }} />
                    <div className='about-crews-profile-content'>
                        <div className='about-crews-profile-header'><span style={{ fontSize: '1.4em' }}>Moon Wanki <span style={{ color: 'lightgray' }}>|</span></span> Owner</div>
                        <div className='about-crews-profile-text'>
                            1994.04 ~ &emsp;출생<br />
                            2013.03 ~ &emsp;아주대학교 미디어콘텐츠전공 학사 과정<br />
                            2014.06 ~ 2016.06&emsp;공군 제10전투비행단 서버실 근무<br />
                            2018.06 ~ 2018.08&emsp;Quram 근무<br />
                            2018.12 ~ 2019.02&emsp;Kidsoft 근무<br />
                            2019.05 ~ 2019.05&emsp;SK주식회사 C&amp;C 근무<br />
                            2019.08 ~ &emsp;삼성전자 무선사업부 근무<br />
                        </div>
                    </div>
                </div>

                <div className='about-crews-profile' style={{ alignSelf: 'flex-end'}}>
                    <div className='about-crews-profile-avatar' style={{ backgroundImage: `url(${crewImageJamlee})` }} />
                    <div className='about-crews-profile-content'>
                        <div className='about-crews-profile-header'><span style={{ fontSize: '1.4em' }}>Jamlee <span style={{ color: 'lightgray' }}>|</span></span> Coworker</div>
                        <div className='about-crews-profile-text'>
                            1993.04 ~ &emsp;출생<br />
                            2013.03 ~ &emsp;아주대학교 미디어콘텐츠전공 학사 과정<br />
                            2014.10 ~ 2016.07 &emsp;대한민국 청와대 대통령실 경호처 제1경비단 근무<br />
                            2019.03 ~ &emsp;LG CNS 근무<br />
                        </div>
                    </div>
                </div>

                <div className='about-crews-profile'>
                    <div className='about-crews-profile-avatar' style={{ backgroundImage: `url(${crewImageAibees})` }} />
                    <div className='about-crews-profile-content'>
                        <div className='about-crews-profile-header'><span style={{ fontSize: '1.4em' }}>Junseo Park <span style={{ color: 'lightgray' }}>|</span></span> Coworker</div>
                        <div className='about-crews-profile-text'>
                            1994.03 ~ &emsp;출생<br />
                            2013.03 ~ &emsp;아주대학교 미디어콘텐츠전공 학사 과정<br />
                            2015.03 ~ 2016.12 &emsp;대한민국 육군 제 12 보병사단 근무<br />
                            2019.04 ~ 2019.07 &emsp;NAVER Search&amp;Clova(Data Engineer) 근무<br />
                            2019.07 ~ 2019.09 &emsp;매그니스 근무<br />
                            2020.04 ~ &emsp;신세계 I&amp;C 근무<br />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}
