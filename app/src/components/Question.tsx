import React from 'react';
import { MultipleChoice, Question as QuestionType, QuestionResult, SetUserAnswer, SingleChoice } from './questions';

type QuestionProps = {
  question: QuestionType
  setUserAnswer: SetUserAnswer | null
  result: QuestionResult | null
}

export const Question = ({ question, setUserAnswer, result }: QuestionProps) => {
  switch(question.answer_type) {
    case 'single':
      return <SingleChoice question={question} setUserAnswer={setUserAnswer} result={result}/>
    case 'multiple':
      return <MultipleChoice question={question} setUserAnswer={setUserAnswer} result={result}/>
  }
}