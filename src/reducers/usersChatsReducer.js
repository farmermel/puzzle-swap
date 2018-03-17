export const usersChatsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS_CHATS':
      return action.usersChats;
    case 'ADD_ONE_USERCHAT':
      return [...state, action.userChat]
    default: 
      return state;
  }
};