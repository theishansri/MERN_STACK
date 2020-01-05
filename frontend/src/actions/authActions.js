import axios from 'axios';
import {returnErrors} from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

export const loadUser=()=>async (dispatch,getState)=>{
    //User loading
    dispatch({
        type:USER_LOADING,
    });
    //getToken From local Storage
    
    try {
    let x=await axios.get('/api/auth/user',tokenconfig(getState));
    dispatch({
        type:USER_LOADED,
        payload:x.data
    })   
    } catch (error) {
        dispatch(
            returnErrors(error.response.data,error.response.status)
        )
        dispatch({
            type:AUTH_ERROR
        })
    }

}
export const logout=()=>{
    return{
        type:LOGOUT_SUCCESS
    }
}
export const login=({email,password})=>async(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({email,password});
    try {
        let x=await axios.post('/api/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:x.data
        })   
        } catch (error) {
            dispatch(
                returnErrors(error.response.data,error.response.status,'LOGIN_FAIL')
            )
          dispatch({
              type:LOGIN_FAIL
          })  
        }
}
//Register User
export const register= ({name,email,password})=>async(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({name,email,password})
    try {
    let x=await axios.post('/api/users',body,config)
    dispatch({
        type:REGISTER_SUCCESS,
        payload:x.data
    })   
    } catch (error) {
        dispatch(
            returnErrors(error.response.data,error.response.status,'REGISTER_FAIL')
        )
      dispatch({
          type:REGISTER_FAIL
      })  
    }
}
//SetUp config and token
export const tokenconfig=getState=>{
    const token=getState().auth.token
    const config={
        headers:{
            'Content-type':"application/json"
        }
    }
    //if token, add to headers
    if(token){
        config.headers['x-auth-token']=token
    }
    return config;
}