import React from 'react'
import { QuizResult } from './questions'

interface ResultPageProps {
  result: QuizResult
  questionCount: number
}

export const ResultPage = ({
  result: { correctNumber, totalPoint, userPoint, result },
  questionCount,
}: ResultPageProps) => {
  return (
    <div className="wpProQuiz_results">
      <h4 className="wpProQuiz_header">Results</h4>
      <p>{correctNumber} of {questionCount} questions answered correctly.</p>
      <p className="wpProQuiz_points">You have reached {userPoint} of {totalPoint}, ({userPoint / totalPoint * 100}%)</p>
      <div className="ld-quiz-actions">
				<input className="wpProQuiz_button wpProQuiz_button_restartQuiz" type="button" name="restartQuiz" value="Restart Quiz" />
        <input className="wpProQuiz_button wpProQuiz_button_reShowQuestion" type="button" name="reShowQuestion" value="View Questions" />
      </div>
    </div>
  )
}