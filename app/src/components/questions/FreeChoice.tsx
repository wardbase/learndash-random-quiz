import React from 'react';
import { QuestionResult, SetUserAnswer } from './common-types'

export interface FreeChoiceQuestion {
  answer_type: 'free_answer'
  id: number
  title: string
  question: string
}

interface FreeChoiceProps {
  question: FreeChoiceQuestion
  setUserAnswer: SetUserAnswer | null
  result: QuestionResult | null
}

export const FreeChoice = ({ 
  question: { id, title, question, },
  setUserAnswer,
  result,
}: FreeChoiceProps) => {
  let className = "wpProQuiz_questionListItem";

  if (result) {
    if (result.correct) {
      className += " wpProQuiz_answerCorrect";
    } else {
      className += " wpProQuiz_answerIncorrect";
    }
  }

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <ul className="wpProQuiz_questionList">
        <li className={className}>
					<label>
            {
              setUserAnswer
                ? <input 
                    className="wpProQuiz_questionInput" 
                    type="text" 
                    onChange={(e) => {
                      setUserAnswer(`${id}`, e.target.value)
                    }} 
                  />
                : <input
                    className="wpProQuiz_questionInput"
                    type="text"
                    value={result!.userChoice}
                    disabled={true}
                  />
            }
					</label>
        </li>
      </ul>
    </div>
  );
}
