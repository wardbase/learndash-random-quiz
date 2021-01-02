import React, { useState, useCallback } from 'react';
import { QuestionResult, SetUserAnswer, AnswerChoice } from '../common-types'
import { DropArea } from './DropArea'
import { Choice } from './Choice'
import update from 'immutability-helper'

enum ItemTypes {
  AnswerChoice = 'AnswerChoice',
}

export interface MatrixSortAnswerQuestion {
  answer_type: 'matrix_sort_answer'
  id: number
  title: string
  question: string
  answer_data: Array<AnswerChoice>
  sort_string: Array<AnswerChoice>
}

interface MatrixSortAnswerProps {
  question: MatrixSortAnswerQuestion
  setUserAnswer: SetUserAnswer | null
  result: QuestionResult | null
}

interface DropAreaState {
  accepts: string[]
  lastDroppedItem: any
}

interface BoxState {
  name: AnswerChoice
  type: string
}

export const MatrixSortAnswer = ({ 
  question: { id, title, question, answer_data, sort_string },
  setUserAnswer,
  result,
}: MatrixSortAnswerProps) => {
  const [dustbins, setDropAreas] = useState<DropAreaState[]>([
    { accepts: [ItemTypes.AnswerChoice], lastDroppedItem: null },
    { accepts: [ItemTypes.AnswerChoice], lastDroppedItem: null },
    { accepts: [ItemTypes.AnswerChoice], lastDroppedItem: null },
    { accepts: [ItemTypes.AnswerChoice], lastDroppedItem: null },
  ])

  const [choices] = useState<BoxState[]>(() => {
    return sort_string.map(str => {
      return { name: str, type: ItemTypes.AnswerChoice }
    }) 
  })

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDropAreas(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {choices.map(({ name, type }, index) => (
          <Choice
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <DropArea
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
