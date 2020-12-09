import React from 'react';
import { Question, SingleChoice } from './questions';

type QuizProps = {
  quiz: Array<Question>
}

export const Quiz = ({ quiz }: QuizProps) => {
  return (
    <>
      {quiz.map(q => {
        switch(q.answer_type) {
          case 'single':
            return <SingleChoice question={q} />
        }

        return null;
      })}
    </>
  )
}