import {HIDE_MODAL, SHOW_MODAL} from "../constants";

export function showModal(component) {
  return {
    type: SHOW_MODAL,
    payload: component
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}