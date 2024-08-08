const initialState={};

export const manageExamdata=(state=initialState, action)=>{
    if(action.type==="examdata"){
        return action.payload;
    }
    else{
        return state;
    }
};