import {GET_ITEMS,ADD_ITEM,DELETE_ITEM} from './types'
import axios from 'axios';
import {tokenconfig} from './authActions';
import {returnErrors} from './errorActions'
export const get_items=()=>async(dispatch)=>{
    dispatch(setItemsLoading())
    try {
        let x=await axios.get('/api/items')
    return dispatch({
        type:GET_ITEMS,
        payload:x.data})    
    } catch (error) {
        dispatch(returnErrors(error.response.data,error.response.status))
    }
    
}
export const delete_item=(id)=>async(dispatch,getState)=>{
    try {
        await axios.delete(`/api/items/${id}`,tokenconfig(getState))
        return dispatch({
            type:DELETE_ITEM,
            payload:id
        })    
    } catch (error) {
        dispatch(returnErrors(error.response.data,error.response.status))
    }
    
}
export const add_items=(item)=>async(dispatch,getState)=>{
    try {
    let x=await axios.post('/api/items',item,tokenconfig(getState))
    return dispatch({
        type:ADD_ITEM,
        payload:x.data
    })   
    } catch (error) {
        dispatch(returnErrors(error.response.data,error.response.status))
    }
}
export const setItemsLoading=()=>{
    return{
        type:'ITEMS_LOADING'
    }
}