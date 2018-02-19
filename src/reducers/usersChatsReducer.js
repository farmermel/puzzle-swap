export const usersChatsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USERS_CHATS':
      return action.usersChats;
    default: 
      return state;
  }
}