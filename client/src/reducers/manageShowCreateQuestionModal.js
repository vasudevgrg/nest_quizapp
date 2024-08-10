const initialState=false;

export const manageShowCreateQuestionModal=(state=initialState, action)=>{
    if(action.type==="showCreateQuestionModal"){
        return action.payload;
    }
    else{
        return state;
    }
};