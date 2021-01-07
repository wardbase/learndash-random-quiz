import React from 'react'
import { useDrop } from 'react-dnd'
import { Choice } from './Choice'
import { ChoiceState } from './types'

const style: React.CSSProperties = {
  height: '83px',
  minHeight: '83px',
}

export interface DropAreaProps {
  accept: string[]
  onDrop: (item: any) => void
  droppedChoice: ChoiceState | null
}

export const DropArea: React.FC<DropAreaProps> = ({
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
  )
}
