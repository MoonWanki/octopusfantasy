import React, { Component } from 'react'

export default class NotFound extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div>
                404 Not Found
            </div>
        )
    }
}