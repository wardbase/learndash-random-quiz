import React from 'react';

type StartPageProps = {
  loadQuiz: () => void
}

export const StartPage = ({ loadQuiz }: StartPageProps) => {
  return (
    <div className="wpProQuiz_text">
      <div>
        <input className="wpProQuiz_button" type="button" value="Start Quiz" onClick={loadQuiz}/>
      </div>
    </div>
  )
}