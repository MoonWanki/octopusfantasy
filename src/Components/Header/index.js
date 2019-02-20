import React, { Component } from 'react'
import WideHeader from './WideHeader'
import MobileHeader from './MobileHeader'

export default class Header extends Component {

    state = {
        width: window.innerWidth,
    }

    componentDidMount() {
        window.onresize = this.onResize
    }

    onResize = () => this.setState({ width: window.innerWidth })

    render() {
        return this.state.width > 768 ? <WideHeader /> : <MobileHeader />
    }
}
