/// <reference path="../wp-api.d.ts" />

import React, { useEffect, useReducer } from 'react';
import { StartPage } from './StartPage';
import { QuizData, QuizResult, UserAnswers } from './questions';
import { Quiz } from './Quiz';
import { ResultPage } from './ResultPage';

type AppState = 'Start' | 'LoadingQuiz' | 'Quiz' | 'Submitting' | 'ShowResult' | 'Error';
type Action = {
  type: 'QUIZ_LOAD'
} | {
  type: 'QUIZ_LOAD_DONE'
  quiz: QuizData
} | {
  type: 'QUIZ_ERROR'
  error: Error
} | {
  type: 'SEND_ANSWERS'
  answers: UserAnswers
} | {
  type: 'GOT_RESULT'
  result: any
}

type State = {
  state: AppState
  quiz: QuizData | null
  answers: UserAnswers
  result: QuizResult | null
  error?: Error
}

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'QUIZ_LOAD': 
      return {
        ...state,
        state: 'LoadingQuiz',
        quiz: null,
      }
    case 'QUIZ_LOAD_DONE':
      return {
        ...state,
        state: 'Quiz',
        quiz: action.quiz,
      }
    case 'SEND_ANSWERS':
      return {
        ...state,
        state: 'Submitting',
        answers: action.answers,
      }
    case 'GOT_RESULT':
      return {
        ...state,
        state: 'ShowResult',
        result: action.result,
      }
    default:
      throw new Error();
  }
}

export function QuizApp() {
  const [{ state, quiz, answers, result, error }, dispatch] = useReducer(reducer, {
    state: 'Start',
    quiz: null,
    answers: {},
    result: null,
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
    } else if (state === 'Submitting') {
      fetch(`${window.wpApiSettings.root}random-quiz/v1/quiz/answers`, {
        method: 'post',
        body: JSON.stringify(answers),
      })
      .then(res => res.json())
      //.then(res => res.text())
      .then(
        (result) => {
          dispatch({
            type: 'GOT_RESULT',
            result,
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
  }, [state, answers])

  const loadQuiz = () => { dispatch({ type: 'QUIZ_LOAD' }) }

  const sendAnswers = (answers: UserAnswers) => {
    dispatch({ type: 'SEND_ANSWERS', answers })
  }

  switch(state) {
    case 'Start':
      return <StartPage loadQuiz={loadQuiz} />
    case 'LoadingQuiz':
      return <div>Loading...</div>;
    case 'Quiz':
      return <Quiz quiz={quiz!} sendAnswers={sendAnswers} />
    case 'Submitting':
      return <div>Submitting answers...</div>
    case 'ShowResult':
      console.log(result)
      return <ResultPage result={result!} questionCount={quiz!.length} />
    case 'Error':
      return <div>Error: {error && error.message}</div>;  
  }
}