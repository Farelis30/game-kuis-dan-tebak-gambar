export const actionTypes = {
  ANSWER: "ANSWER",
  SUBMIT: "SUBMIT",
  NEXT_PAGE: "NEXT_PAGE",
  PREV_PAGE: "PREV_PAGE",
};

export const calculateScore = (questions, userAnswers) => {
  let userScore = 0;
  questions.forEach((question) => {
    if (userAnswers[question.id] === question.answer) {
      userScore += 1;
    }
  });
  return userScore;
};

const QuizReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ANSWER:
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.selectedOption,
        },
      };
    case actionTypes.SUBMIT:
      return {
        ...state,
        score: calculateScore(state.questions, state.userAnswers),
        isSubmitted: true,
      };
    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case actionTypes.PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    default:
      return state;
  }
};

export default QuizReducer;
