const initialState={};

export const manageExamAnalysis=(state=initialState, action)=>{
    if(action.type==="examAnalysis"){
        return action.payload;
    }
    else{
        return state;
    }
};