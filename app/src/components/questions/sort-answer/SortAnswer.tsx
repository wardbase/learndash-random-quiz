import React, { useState, useCallback } from 'react';
import update from 'immutability-helper'
import { Card } from './Card'
import { QuestionResult, SetUserAnswer, AnswerChoice } from '../common-types'

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

interface CardData {
  id: number
  text: AnswerChoice
}

function shuffleArray(array: Array<CardData>) {
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
  const [cards, setCards] = useState(() => {
    const data: Array<CardData> = answer_data.map((data, i) => ({
      id: i,
      text: data,
    }))

    if (setUserAnswer) {
      shuffleArray(data);
      return data;
    } 

    const userData: Array<CardData> = [];

    (result?.userChoice as string[]).forEach((c: string) => {
      userData.push(data[parseInt(c)])
    })

    return userData
  })

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      const updatedCards = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })

      setCards(updatedCards);

      const ids = updatedCards.map((c) => `${c.id}`);

      setUserAnswer!(`${id}`, ids);
    },
    [cards, id, setUserAnswer],
  )

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <ul className="wpProQuiz_questionList ui-sortable">
        {cards.map((card, i) => 
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            result={
              setUserAnswer
                ? null
                : card.id === i
            }
          />
        )}
      </ul>
    </div>
  );
}
