import { combineReducers } from "redux";
import { manageExamdata } from "./manageExamdata";
import { manageStudentExamId } from "./manageStudentExamId";
import { manageExamAnalysis } from "./manageExamAnalysis";
import { manageExamId } from "./manageExamId";
import { manageShowCreateQuestionModal } from "./manageShowCreateQuestionModal";
import { manageUser } from "./manageUser";
import { managePopup } from "./managePopup";

const rootreducers= combineReducers({manageExamdata, manageStudentExamId, manageExamAnalysis, manageExamId, manageShowCreateQuestionModal, manageUser, managePopup});

export default rootreducers;