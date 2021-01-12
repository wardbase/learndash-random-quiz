import React, { useState } from 'react';
import { QuestionResult, SetUserAnswer } from './common-types'

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
  setUserAnswer: SetUserAnswer | null
  result: QuestionResult | null
}

export const SingleChoice = ({ 
  question: { id, title, question, answer_data },
  setUserAnswer,
  result,
}: SingleChoiceProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <ul className="wpProQuiz_questionList">
        {answer_data.map((choice, i) => {
          let className = "wpProQuiz_questionListItem";

          if (result) {
            if (`${i}` === result.userChoice) {
              if (`${i}` === result.correct) {
                className += " wpProQuiz_answerCorrect";
              } else {
                className += " wpProQuiz_answerIncorrect";
              }
            } else if (`${i}` === result.correct) {
              className += " wpProQuiz_answerCorrectIncomplete";
            }
          }

          return (
            <li key={`${id}-${i}`} className={className}>
              <span style={{display:'none'}}>{i}. </span>
                <label>
                  {
                    setUserAnswer
                    ? <input 
                        className="wpProQuiz_questionInput"
                        type="radio"
                        value={i}
                        onChange={() => {
                          setSelectedIndex(i)
                          setUserAnswer(`${id}`, `${i}`)
                        }}
                        checked={selectedIndex === i}
                      />
                    : <input 
                        className="wpProQuiz_questionInput"
                        type="radio"
                        value={i}
                        disabled={true}
                        checked={`${i}` === result!.userChoice}
                      />
                  }
                  {typeof(choice) === 'string' ? choice : choice.html}
                </label>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
