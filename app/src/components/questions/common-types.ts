import { SingleChoiceQuestion } from './SingleChoice';

export type QuestionId = string
export type Answer = string
export type UserAnswers = Record<QuestionId, Answer>
export type SetUserAnswer = (questionId: QuestionId, userAnswer: Answer) => void
export type Question = SingleChoiceQuestion;
export type QuizData = Array<Question>;
