import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types'
const initState={
    items:[
    ],
    loading:false
}
export default function(state=initState,action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items:action.payload,
                loading:false
            }
        case DELETE_ITEM:
            return{
                ...state,
                items:state.items.filter(item=>action.payload!==item._id)
            }
        case ADD_ITEM:
            return{
                items:[...state.items,action.payload]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading:true
            }
        default:
            return state;
    }
}