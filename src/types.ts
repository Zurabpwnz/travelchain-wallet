export interface LoginState {
  username: string,
  isLoggedIn: boolean,
  userBalance: number,
  userContacts: Array<Object>,
  userProposals: Array<Object>,
}