import { AnswerChoice } from "../common-types";

export enum ItemTypes {
  AnswerChoice = 'AnswerChoice',
}

export interface ChoiceState {
  name: AnswerChoice
  type: string
}
