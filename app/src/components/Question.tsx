import React from 'react';
import { FreeChoice, MatrixSortAnswer, MultipleChoice, Question as QuestionType, QuestionResult, SetUserAnswer, SingleChoice, SortAnswer } from './questions';

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
    case 'free_answer':
      return <FreeChoice question={question} setUserAnswer={setUserAnswer} result={result}/>
    case 'sort_answer':
      return <SortAnswer question={question} setUserAnswer={setUserAnswer} result={result} />
    case 'matrix_sort_answer':
      return <MatrixSortAnswer question={question} setUserAnswer={setUserAnswer} result={result} />
  }
}