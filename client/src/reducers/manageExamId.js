const initialState=-1;

export const manageExamId=(state=initialState, action)=>{
    if(action.type==="examId"){
        return action.payload;
    }
    else{
        return state;
    }
};