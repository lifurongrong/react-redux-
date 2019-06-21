import React from 'react'
import MyPropTypes from 'prop-types'
export const connect = (mapStateToProps = function () { }, mapDispatchToProps = function () { }) => (MyComponent) => {
    class Temp extends React.Component {
        constructor() {
            super();
            this.state = {}
        }
        static contextTypes = {
            store: MyPropTypes.object
        }
        componentWillMount() {
            const { store } = this.context;
            this.setState(mapStateToProps(store.getState()));
            this.remove = store.subscribe(() => {
                this.setState(mapStateToProps(store.getState()))
            })
        }
        componentWillUnmount() {
            this.remove()
        }
        render() {
            return <MyComponent {...this.props} {...this.state} {...mapDispatchToProps(this.context.store.dispatch)}></MyComponent>
        }
    }
    return Temp
}

export class Provider extends React.Component {
    static childContextTypes = {
        store: MyPropTypes.object
    }
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    render() {
        return this.props.children
    }
}
