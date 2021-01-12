import React, { useState, useCallback } from 'react';

import { QuestionResult, SetUserAnswer, AnswerChoice } from '../common-types'
import { shuffleArray } from '../util';
import { DropArea } from './DropArea'
import { ChoiceState, ItemTypes } from './types';
import { UnusedArea } from './UnusedArea';

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
  droppedChoice: ChoiceState | null
  title: AnswerChoice
  id: string
}

interface State {
  unused: Array<ChoiceState>
  dropAreas: Array<DropAreaState>
}

export const MatrixSortAnswer = ({ 
  question: { id, title, question, answer_data, sort_string },
  setUserAnswer,
  result,
}: MatrixSortAnswerProps) => {
  const [state, setState] = useState<State>(() => {
    const initState: State = {
      unused: sort_string.map((str, i) => {
        return { name: str, type: ItemTypes.AnswerChoice, id: `${i}` }
      }),
      dropAreas: answer_data.map((a, i) => {
        return { title: a, droppedChoice: null, id: `${i}` }
      }),
    }

    if (setUserAnswer) {
      initState.unused = shuffleArray(initState.unused);

      return initState
    }

    const length = result ? result.userChoice.length : 0
    const removed: number[] = []

    for (let i = 0; i < length; i++) {
      const userChoice = result!.userChoice[i]
      if (userChoice !== '') {
        const parsed = parseInt(userChoice)

        initState.dropAreas[i].droppedChoice = initState.unused[parsed]
        removed.push(parsed)
      }
    }

    initState.unused = initState.unused.filter((_, i) => !removed.includes(i))
    
    return initState
  })

  const { unused, dropAreas } = state;

  const handleDrop = useCallback(
    (index: number, item: ChoiceState) => {
      const newState = {
        unused: unused.filter(c => c.name !== item.name ),
        dropAreas: dropAreas.map(a => {
          return a.droppedChoice?.name === item.name
            ? { ...a, droppedChoice: null }
            : a
        })
      }

      if (index === -1) {
        newState.unused.push(item)
      } else {
        newState.dropAreas[index].droppedChoice = item
      }

      setState(newState)
      setUserAnswer!(`${id}`, newState.dropAreas.map((a) => {
        return a.droppedChoice ? a.droppedChoice.id : ''
      }))
    }, 
    [unused, dropAreas, id, setUserAnswer]
  )

  return (
    <div className="wpProQuiz_question">
      <div className="wpProQuiz_question_text" dangerouslySetInnerHTML={{ __html: question }}/>
      <p className="wpProQuiz_clear" style={{clear:'both'}}></p>
      <div className="wpProQuiz_matrixSortString">
        <h5 className="wpProQuiz_header">Sort elements</h5>
        <UnusedArea 
          unused={unused} 
          onDrop={(item) => handleDrop(-1, item)}
          showResult={!setUserAnswer}
        />
      </div>

      <ul className="wpProQuiz_questionList">
        {dropAreas.map(({ title, droppedChoice, id }, index) => (
          <DropArea
            title={title}
            accept={[ItemTypes.AnswerChoice]}
            onDrop={(item) => handleDrop(index, item)}
            droppedChoice={droppedChoice}
            key={index}
            result={
              setUserAnswer
              ? null
              : droppedChoice?.id === `${index}`
            }
          />
        ))}
      </ul>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        
      </div>
    </div>
  );
}
