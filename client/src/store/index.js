import { combineReducers, createStore } from 'redux'
import files from './files'
import user from './user'

const reducer = combineReducers({
    files,
    user
})

const store = createStore(reducer)

export default store
