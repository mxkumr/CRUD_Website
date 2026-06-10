/** localStorage key shared by signup, login, and admin panels */
export const SIGNUP_REQUESTS_STORAGE_KEY = 'signupRequests';

/**
 * Fired when signupRequests in localStorage changes in this tab.
 * (The native `storage` event only fires in *other* tabs, not the one that wrote.)
 */
export const SIGNUP_REQUESTS_CHANGED_EVENT = 'crudflow:signupRequestsUpdated';

export function notifySignupRequestsChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SIGNUP_REQUESTS_CHANGED_EVENT));
  }
}
