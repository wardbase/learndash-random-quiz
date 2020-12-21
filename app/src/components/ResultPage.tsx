import React, { useState } from 'react'
import { Question } from './Question';
import { QuizData, QuizResult, UserAnswers } from './questions'

interface ResultPageProps {
  result: QuizResult
  quiz: QuizData
  questionCount: number
  answers: UserAnswers
}

export const ResultPage = ({
  result: { correctNumber, totalPoint, userPoint, result },
  questionCount,
  quiz,
  answers,
}: ResultPageProps) => {
  const [viewQuestions, setViewQuestions] = useState(false);

  return (
    <>
      <div className="wpProQuiz_results">
        <h4 className="wpProQuiz_header">Results</h4>
        <p>{correctNumber} of {questionCount} questions answered correctly.</p>
        <p className="wpProQuiz_points">You have reached {userPoint} of {totalPoint}, ({userPoint / totalPoint * 100}%)</p>
        <div className="ld-quiz-actions">
          <input className="wpProQuiz_button wpProQuiz_button_reShowQuestion" type="button" name="reShowQuestion" value="View Questions" onClick={() => {
            setViewQuestions(!viewQuestions);
          }} />
          <input className="wpProQuiz_button wpProQuiz_button_restartQuiz" type="button" name="restartQuiz" value="Restart Quiz" />
        </div>
      </div>
      {viewQuestions && (
        <div className="wpProQuiz_quiz">
          <ol className="wpProQuiz_list">
            {quiz.map((q, i) => {
              return (
                <li className="wpProQuiz_listItem" style={{display: 'list-item'}} key={i}>
                  <Question 
                    question={q}
                    setUserAnswer={null}
                    result={{
                      userChoice: answers[q.id],
                      correct: result[q.id],
                    }} 
                  />
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </>
  )
}