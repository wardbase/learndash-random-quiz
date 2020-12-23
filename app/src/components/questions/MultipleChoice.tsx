import React, { useRef } from 'react';
import { QuestionResult, SetUserAnswer } from './common-types'

type AnswerChoice = string | { html: string }

export interface MultipleChoiceQuestion {
  answer_type: 'multiple'
  id: number
  title: string
  question: string
  answer_data: Array<AnswerChoice>
}

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion
  setUserAnswer: SetUserAnswer | null
  result: QuestionResult | null
}

export const MultipleChoice = ({ 
  question: { id, title, question, answer_data },
  setUserAnswer,
  result,
}: MultipleChoiceProps) => {
  const answerRef = useRef<string[]>([])
  const addAnswer = (answer: string) => {
    if (!answerRef.current.includes(answer)) {
      answerRef.current.push(answer);
      setUserAnswer!(`${id}`, answerRef.current);
    }
  }

  const removeAnswer = (answer: string) => {
    const index = answerRef.current.indexOf(answer)
    if (index !== -1) {
      answerRef.current.splice(index, 1);
      setUserAnswer!(`${id}`, answerRef.current);
    }
  }

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <ul className="wpProQuiz_questionList">
        {answer_data.map((choice, i) => {
          let className = "wpProQuiz_questionListItem";

          if (result) {
            if (result.userChoice.includes(`${i}`)) {
              if (result.correct.includes(`${i}`)) {
                className += " wpProQuiz_answerCorrect";
              } else {
                className += " wpProQuiz_answerIncorrect";
              }
            } else if (result.correct.includes(`${i}`)) {
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
                        type="checkbox"
                        value={i}
                        onClick={(e) => {
                          if ((e.target as HTMLInputElement).checked) {
                            addAnswer(`${i}`)
                          } else {
                            removeAnswer(`${i}`)
                          }
                        }} 
                      />
                    : <input 
                        className="wpProQuiz_questionInput"
                        type="checkbox"
                        value={i}
                        disabled={true}
                        checked={result!.userChoice.includes(`${i}`)}
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
