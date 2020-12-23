import { SingleChoiceQuestion } from './SingleChoice';
import { MultipleChoiceQuestion } from './MultipleChoice';

export type QuestionId = string
export type Answer = string | string[]
export type UserAnswers = Record<QuestionId, Answer>
export type SetUserAnswer = (questionId: QuestionId, userAnswer: Answer) => void
export type Question = SingleChoiceQuestion | MultipleChoiceQuestion;
export type QuizData = Array<Question>;
export type QuizResult = {
  correctNumber: number
  totalPoint: number
  userPoint: number
  result: Record<QuestionId, number | string>
}
export type QuestionResult = {
  userChoice: number | string
  correct: number | string
}
