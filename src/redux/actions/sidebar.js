import { HIDE_SIDEBAR, SHOW_SIDEBAR } from '../constants';

export function hideSidebar() {
  return {
    type: HIDE_SIDEBAR,
  };
}

export function showSidebar() {
  return {
    type: SHOW_SIDEBAR,
  };
}
