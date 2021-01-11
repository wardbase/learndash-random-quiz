import React from 'react'
import { useDrag } from 'react-dnd'
import { AnswerChoice } from '../common-types'

export interface ChoiceProps {
  name: AnswerChoice
  type: string
  id: string
  showResult: boolean | null
}

export const Choice: React.FC<ChoiceProps> = ({ name, type, id, showResult }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type, id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  })

  const dragRef = showResult ? null : drag

  return (
    <div ref={dragRef} className="wpProQuiz_sortStringItem ui-sortable-handle" style={{ opacity }}>
      {name}
    </div>
  )
}
