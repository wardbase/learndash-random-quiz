import { AnswerChoice } from "../common-types";

export enum ItemTypes {
  AnswerChoice = 'AnswerChoice',
}

export interface ChoiceState {
  id: string
  name: AnswerChoice
  type: string
}
