export interface LoginState {
  username: string,
  isLoggedIn: boolean,
  userBalance: number,
  userContacts: Array<Object>,
  userProposals: Array<Object>,
  userBoughtData: Array<Object>,
  buyableData: Array<Object>,
  analyzedData: Array<Object>,
}