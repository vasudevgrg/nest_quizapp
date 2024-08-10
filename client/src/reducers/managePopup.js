const initialState={
    visible:false,
    message:""
};

export const managePopup=(state=initialState, action)=>{
    if(action.type==="showPopup"){
        return action.payload;
    }else if(action.type==="hidePopup"){
        return initialState;
    }
    else{
        return state;
    }
};