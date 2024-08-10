const initialState=-1;

export const manageStudentExamId=(state=initialState, action)=>{
    if(action.type==="studentExamId"){
        return action.payload;
    }
    else{
        return state;
    }
};