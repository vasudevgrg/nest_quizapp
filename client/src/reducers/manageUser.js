const initialState=-1;

export const manageUser=(state=initialState, action)=>{
    if(action.type==="user"){
        return action.payload;
    }
    else{
        return state;
    }
};