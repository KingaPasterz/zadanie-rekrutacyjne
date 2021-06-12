import { SEND_FORM } from './actionTypes'

export const sendFilledForm = (content) => ({
  type: SEND_FORM,
  payload: { content },
})