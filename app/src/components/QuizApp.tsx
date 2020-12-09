/// <reference path="../wp-api.d.ts" />

import React, { useEffect, useReducer } from 'react';
import { StartPage } from './StartPage';
import { Question } from './questions';
import { Quiz } from './Quiz';

type QuizData = Array<Question>;
type AppState = 'Start' | 'LoadingQuiz' | 'Quiz' | 'Error';
type Action = {
  type: 'QUIZ_LOAD'
} | {
  type: 'QUIZ_LOAD_DONE'
  quiz: QuizData
} | {
  type: 'QUIZ_ERROR'
  error: Error
}

type State = {
  state: AppState
  quiz: QuizData | null
  error?: Error
}

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'QUIZ_LOAD': 
      return {
        state: 'LoadingQuiz',
        quiz: null,
      }
    case 'QUIZ_LOAD_DONE':
      return {
        state: 'Quiz',
        quiz: action.quiz,
      }
    default:
      throw new Error();
  }
}

export function QuizApp() {
  const [{ state, quiz, error }, dispatch] = useReducer(reducer, {
    state: 'Start',
    quiz: null
  })

  useEffect(() => {
    if (state === 'LoadingQuiz') {
      fetch(`${window.wpApiSettings.root}random-quiz/v1/quiz`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({
            type: 'QUIZ_LOAD_DONE',
            quiz: result
          })
        },
        (error) => {
          dispatch({
            type: 'QUIZ_ERROR',
            error,
          })
        }
      )
    }
  }, [state])

  const loadQuiz = () => {
    dispatch({ type: 'QUIZ_LOAD' })
  }

  switch(state) {
    case 'Start':
      return <StartPage loadQuiz={loadQuiz}/>
    case 'LoadingQuiz':
      return <div>Loading...</div>;
    case 'Quiz':
      return <Quiz quiz={quiz!} />
    case 'Error':
      return <div>Error: {error && error.message}</div>;  
  }
}