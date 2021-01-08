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
}

export const DropArea: React.FC<DropAreaProps> = ({
  title,
  accept,
  onDrop,
  droppedChoice,
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

  return (
    <li className="wpProQuiz_questionListItem">
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
                ref={drop}
                className="wpProQuiz_maxtrixSortCriterion ui-sortable"
                style={{ ...style, backgroundColor }}>
                { 
                  droppedChoice && 
                  <Choice 
                    name={droppedChoice.name} 
                    type={droppedChoice.type}
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
