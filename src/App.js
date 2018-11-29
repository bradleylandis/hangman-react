import React, {Component} from 'react'
import {connect} from 'react-redux'
import Game from './Game'
import './App.css'
import {getAppData} from './appReducer'
import Loading from './Loading'
import Error from './Error'
import * as actions from "./actions";

class App extends Component {
    componentDidMount() {
        this.props.startGame()
    }

    render() {
        return (
            <div className="App">
                {this.props.isLoading ? <Loading/> :
                    this.props.isError ? <Error tryAgain={() => this.props.startGame()}/> :
                        <Game/>
                }
                <div>
                    Testing...
                    <a href="http://www.wordnik.com" target="_blank" rel="noopener noreferrer">
                        <img alt="powered by wordnik" src="wordnik.png"/>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return getAppData(state)
}

const mapDispatchToProps = ({
    startGame: actions.startGame
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
