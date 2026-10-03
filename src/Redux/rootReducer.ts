import {combineReducers} from 'redux'
import reducer from './reducers'
import memberReducer from './reducer/memberReducer'
// import formReducer from './Reducers/formReducer'

export default combineReducers({
    reducer1:reducer,memberData:memberReducer
})