export const examdata=(payload)=>{
    return{
        type:'examdata',
        payload:payload
    }
};

export const studentExamId= (payload) =>{
    return {
        type:'studentExamId',
        payload: payload
    }
}

export const examAnalysis = (payload) => {
    return {
        type:'examAnalysis',
        payload: payload
    }
}

export const examId= (payload) => {
    return {
        type:'examId',
        payload: payload
    }
};

export const showCreateQuestionModal = (payload) => {
    return {
        type:'showCreateQuestionModal',
        payload: payload
    }
};

export const user = (payload) => {
    return {
        type:'user',
        payload: payload
    }
}

export const showPopup=(payload)=>{
    return{
        type:'showPopup',
        payload:payload
    }
};
export const hidePopup=()=>{
    return{
        type:'hidePopup'
    }
};