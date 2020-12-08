/// <reference path="../wp-api.d.ts" />

import React, { useState, useEffect } from 'react';
import { StartPage } from './StartPage';

type QuizData = string;

export default function Quiz() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quiz, setQuiz] = useState<QuizData>('');

  useEffect(() => {
    fetch(`${window.wpApiSettings.root}random-quiz/v1/quiz`)
      // .then(res => res.json())
      .then(res => res.text())
      .then(
        (result) => {
          setIsLoaded(true);
          setQuiz(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <StartPage />
    );
  }
}