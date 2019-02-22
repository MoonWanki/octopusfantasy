import React from 'react'
import './index.scss'

export default () => {
    return (
        <div className="footer">
            <div className="footer-inner">
                <div className='footer-section'>
                    <p className='footer-section-title'>Octopus Fantasy</p>
                    <div className='footer-section-text' style={{ fontSize: '0.8em' }}>ⓒ 2009-2018 Octopus Fantasy. All rights reserved.</div>
                </div>
                <div className='footer-section'>
                    <p className='footer-section-title'>Visit</p>
                    <div className='footer-section-divider' />
                    <a target='_blank' rel='noopener noreferrer' href="https://blog.naver.com/dhksrl2589"><p className='footer-section-text footer-section-link'>Naver Blog</p></a>
                    <a target='_blank' rel='noopener noreferrer' href="https://soundcloud.com/moonwanki"><p className='footer-section-text footer-section-link'>Soundcloud</p></a>
                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/channel/UCvVDyOH03o1PRJ1fOLeu6Uw?view_as=subscriber"><p className='footer-section-text footer-section-link'>YouTube</p></a>
                </div>
                <div className='footer-section'>
                    <p className='footer-section-title'>Contact</p>
                    <div className='footer-section-divider' />
                    <p className='footer-section-text'>dhksrl2589@gmail.com</p>
                </div>
            </div>
        </div>
    );
};