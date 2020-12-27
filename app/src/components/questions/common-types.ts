import { SingleChoiceQuestion } from './SingleChoice';
import { MultipleChoiceQuestion } from './MultipleChoice';
import { FreeChoiceQuestion } from './FreeChoice';
import { SortAnswerQuestion } from './SortAnswer';

export type QuestionId = string
export type Answer = string | string[]
export type UserAnswers = Record<QuestionId, Answer>
export type SetUserAnswer = (questionId: QuestionId, userAnswer: Answer) => void
export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | FreeChoiceQuestion | SortAnswerQuestion;
export type QuizData = Array<Question>;
export type QuizResult = {
  correctNumber: number
  totalPoint: number
  userPoint: number
  result: Record<QuestionId, Answer>
}
export type QuestionResult = {
  userChoice: Answer
  correct: Answer
}
