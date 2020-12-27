import React, { useState } from 'react';
import { QuestionResult, SetUserAnswer } from './common-types'
import { Container } from './Container';

type AnswerChoice = string | { html: string }

export interface SortAnswerQuestion {
  answer_type: 'sort_answer'
  id: number
  title: string
  question: string
  answer_data: Array<AnswerChoice>
}

interface SortAnswerProps {
  question: SortAnswerQuestion
  setUserAnswer: SetUserAnswer | null
  result: QuestionResult | null
}

function shuffleArray(array: Array<number>) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export const SortAnswer = ({ 
  question: { id, title, question, answer_data },
  setUserAnswer,
  result,
}: SortAnswerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <Container />
    </div>
  );
}
