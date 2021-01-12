import React from 'react'
import { useDrop } from 'react-dnd'
import { AnswerChoice } from '../common-types'
import { Choice } from './Choice'
import { ChoiceState } from './types'

const style: React.CSSProperties = {
  height: '83px',
  minHeight: '83px',
}

export interface DropAreaProps {
  title: AnswerChoice
  accept: string[]
  onDrop: (item: any) => void
  droppedChoice: ChoiceState | null
  result: boolean | null
}

export const DropArea: React.FC<DropAreaProps> = ({
  title,
  accept,
  onDrop,
  droppedChoice,
  result,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    canDrop: () => !droppedChoice,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = 'inherit' 
  if (isActive) {
    backgroundColor = 'rgb(255,255,194)'
  }

  const showResult = result !== null
  const dropRef = showResult ? null : drop;

  let className = "wpProQuiz_questionListItem"

  if (showResult) {
    if (result) {
      className += " wpProQuiz_answerCorrect"
    } else {
      className += " wpProQuiz_answerIncorrect"
    }
  }

  return (
    <li className={className}>
      <table>
        <tbody>
          <tr className="wpProQuiz_mextrixTr">
            <td style={{width: '20%'}}>
              <div className="wpProQuiz_maxtrixSortText">
                {title}
              </div>
            </td>
            <td style={{width: '80%'}}>
              <div 
                ref={dropRef}
                className="wpProQuiz_maxtrixSortCriterion ui-sortable"
                style={{ ...style, backgroundColor }}>
                { 
                  droppedChoice && 
                  <Choice
                    id={droppedChoice.id}
                    name={droppedChoice.name} 
                    type={droppedChoice.type}
                    showResult={result !== null}
                  />
                }
              </div>
            </td>
        </tr>
      </tbody>
    </table>
  </li>
  )
}
