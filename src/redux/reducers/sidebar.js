import { HIDE_SIDEBAR, SHOW_SIDEBAR } from '../constants';

const initialState = {
  isVisible: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SHOW_SIDEBAR:
      return {
        isVisible: true,
      };

    case HIDE_SIDEBAR:
      return {
        isVisible: false,
      };

    default:
      return state;
  }
};
