import { HIDE_MODAL, SHOW_MODAL } from '../constants';

const initialState = {
  isVisible: false,
  component: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_MODAL:
      return {
        isVisible: true,
        component: payload,
      };

    case HIDE_MODAL:
      return {
        isVisible: false,
        component: null,
      };

    default:
      return state;
  }
};
