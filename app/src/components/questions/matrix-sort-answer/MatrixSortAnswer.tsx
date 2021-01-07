import React, { useState, useCallback } from 'react';

import { QuestionResult, SetUserAnswer, AnswerChoice } from '../common-types'
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
    return {
      unused: sort_string.map(str => {
        return { name: str, type: ItemTypes.AnswerChoice }
      }),
      dropAreas: answer_data.map(a => {
        return { title: a, droppedChoice: null }
      }),
    }
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
    }, 
    [unused, dropAreas]
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
        />
      </div>

      <ul className="wpProQuiz_questionList">
        {dropAreas.map(({ title, droppedChoice }, index) => (
          <li className="wpProQuiz_questionListItem" key={index}>
            <table>
              <tbody>
                <tr className="wpProQuiz_mextrixTr">
                  <td style={{width: '20%'}}>
                    <div className="wpProQuiz_maxtrixSortText">
                      {title}
                    </div>
                  </td>
                  <td style={{width: '80%'}}>
                    <DropArea
                      accept={[ItemTypes.AnswerChoice]}
                      onDrop={(item) => handleDrop(index, item)}
                      droppedChoice={droppedChoice}
                      key={index}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        
      </div>
    </div>
  );
}
