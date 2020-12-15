import React, {useState} from 'react';
import { Question, SingleChoice, UserAnswers, QuestionId, Answer, SetUserAnswer } from './questions';

type QuizProps = {
  quiz: Array<Question>
  sendAnswers: (answers: UserAnswers) => void
}

function useUserAnswerState(initialState: UserAnswers): [UserAnswers, SetUserAnswer] {
  const [userAnswers, setRawUserAnswer] = useState<UserAnswers>(initialState);
  const setUserAnswer = (questionId: QuestionId, userAnswer: Answer) => {
    userAnswers[questionId] = userAnswer;
    setRawUserAnswer(userAnswers);
  }

  return [userAnswers, setUserAnswer];
}

export const Quiz = ({ quiz, sendAnswers }: QuizProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswer] = useUserAnswerState({});
  const q = quiz[questionIndex];
  let QuestionComponent;

  switch(q.answer_type) {
    case 'single':
      QuestionComponent = <SingleChoice question={q} setUserAnswer={setUserAnswer} />
      break;
  }

  return (
    <>
      {QuestionComponent}
      { questionIndex !== quiz.length - 1 
        ? <input type="button" name="next" value="Next" className="wpProQuiz_button wpProQuiz_QuestionButton" onClick={() => {
            setQuestionIndex(questionIndex + 1)
          }} />
        : <input type="button" name="next" value="Finish Quiz" className="wpProQuiz_button wpProQuiz_QuestionButton" onClick={() => {
          sendAnswers(userAnswers)
        }}/>
      }
    </>
  )
}

// Commented out for later use.
// <input type="button" name="back" value="Back" className="wpProQuiz_button wpProQuiz_QuestionButton" />
// <input type="button" name="check" value="Check" className="wpProQuiz_button wpProQuiz_QuestionButton" />
