/// <reference path="../wp-api.d.ts" />

import React, { useState, useEffect } from 'react';
import { StartPage } from './StartPage';

type QuizData = string;
type AppState = 'Start' | 'LoadingQuiz' | 'Quiz' | 'Error';

export default function Quiz() {
  const [error, setError] = useState<Error | null>(null);
  const [appState, setAppState] = useState<AppState>('Start');
  const [quiz, setQuiz] = useState<QuizData>('');

  useEffect(() => {
    if (appState === 'LoadingQuiz') {
      fetch(`${window.wpApiSettings.root}random-quiz/v1/quiz`)
      .then(res => res.json())
      .then(
        (result) => {
          setAppState('Quiz')
          setQuiz(result);
        },
        (error) => {
          setAppState('Error')
          setError(error);
        }
      )
    }
  }, [appState])

  const loadQuiz = () => {
    setAppState('LoadingQuiz');
  }

  switch(appState) {
    case 'Start':
      return <StartPage loadQuiz={loadQuiz}/>
    case 'LoadingQuiz':
      return <div>Loading...</div>;
    case 'Quiz':
      return <div>{quiz}</div>
    case 'Error':
      return <div>Error: {error!.message}</div>;  
  }
}