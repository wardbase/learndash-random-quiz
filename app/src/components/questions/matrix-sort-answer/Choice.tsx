import React from 'react'
import { useDrag } from 'react-dnd'
import { AnswerChoice } from '../common-types'

export interface ChoiceProps {
  name: AnswerChoice
  type: string
}

export const Choice: React.FC<ChoiceProps> = ({ name, type }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  })

  return (
    <div ref={drag} className="wpProQuiz_sortStringItem ui-sortable-handle" style={{ opacity }}>
      {name}
    </div>
  )
}
