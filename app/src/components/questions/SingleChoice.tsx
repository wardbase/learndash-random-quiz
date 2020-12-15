import React from 'react';
import { SetUserAnswer } from './common-types'

type AnswerChoice = string | { html: string }

export interface SingleChoiceQuestion {
  answer_type: 'single'
  id: number
  title: string
  question: string
  answer_data: Array<AnswerChoice>
}

interface SingleChoiceProps {
  question: SingleChoiceQuestion
  setUserAnswer: SetUserAnswer
}

export const SingleChoice = ({ 
  question: { id, title, question, answer_data },
  setUserAnswer
}: SingleChoiceProps) => {
  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <ul className="wpProQuiz_questionList">
        {answer_data.map((choice, i) => {
          return (
            <li key={`${id}-${i}`} className="wpProQuiz_questionListItem">
              <span style={{display:'none'}}>{i}. </span>
                <label>
                  <input className="wpProQuiz_questionInput" type="radio" value={i} onClick={() => {
                    setUserAnswer(`${id}`, `${i}`)
                  }} />
                  {typeof(choice) === 'string' ? choice : choice.html}
                </label>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
