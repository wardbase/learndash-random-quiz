import React from 'react'
import { useDrop } from 'react-dnd'

import { Choice } from './Choice'
import { ChoiceState, ItemTypes } from './types'

interface UnusedAreaProps {
  unused: Array<ChoiceState>
  onDrop: (item: any) => void
  showResult: boolean
}

export const UnusedArea = ({unused, onDrop, showResult}: UnusedAreaProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.AnswerChoice],
    drop: onDrop,
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

  let minHeight = '';
  let border = '';
  if (unused.length === 0) {
    minHeight = '61px'
    border = '2px dashed #bbb'
  }

  const dropRef = showResult ? null : drop

  return (
    <div 
      ref={dropRef}
      className="wpProQuiz_sortStringList ui-sortable"
      style={{ backgroundColor, minHeight, border }}
    >
      {unused.map(({ name, type, id }, index) => (
        <Choice
          id={id}
          name={name}
          type={type}
          key={index}
          showResult={showResult}
        />
      ))}
    </div>
  )
}
