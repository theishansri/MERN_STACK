import {combineReducers} from 'redux';
import ItemReducer from './ItemReducer';
import ErrorReducer from './errorReducer'
import AuthReducer from './authReducer'
export default combineReducers({
    item:ItemReducer,
    error:ErrorReducer,
    auth:AuthReducer
})