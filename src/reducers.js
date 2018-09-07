import {combineReducers} from 'redux'
import {gameReducer} from './gameReducer'
import {appReducer} from './appReducer'

export default combineReducers({game: gameReducer, app: appReducer})