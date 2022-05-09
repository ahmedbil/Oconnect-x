const initState = {
  loggedIn: false,
  username: "",
  email: "",
  _id: "",
  bio: "",
  avi: "",
  chatType: "",
  chatroomName: "",
  chatroomId: "",
  userRoom: "",
  lastUser: null,
  token: null,
  userRole: null,
  clubs: [],
  clubSelected: null,
  privateChats: [],
  groupChats: []
  
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_CHATTYPE":
      return {
        ...state,
        chatType: action.chatType
      }
    case "CHANGE_GROUPCHATROOM":
      return {
        ...state,
        groupChats: [...state.groupChats, action.groupChat]
      };

    case "CHANGE_PRIVATECHATROOM":
      return {
        ...state,
        privateChats: [...state.privateChats, action.privateChat]
      }

    case "SET_PRIVATECHATROOMS":
      return {
        ...state,
        privateChats: action.privateChats,
      };
    
      case "CHANGE_PRIVATECHAT":
        return {
          privateChats: action.privateChat
        };

    case "CHANGE_LOGGEDIN":
      return {
        ...state,
        loggedIn: action.loggedIn,
      };

    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.username,
      };

    case "CHANGE_EMAIL":
      return {
        ...state,
        email: action.email,
      };

    case "CHANGE_ID":
      return {
        ...state,
        _id: action._id,
      };

    case "CHANGE_BIO":
      return {
        ...state,
        bio: action.bio,
      };

    case "CHANGE_AVI":
      return {
        ...state,
        avi: action.avi,
      };

    case "CHANGE_CHATROOMNAME":
      return {
        ...state,
        chatroomName: action.chatroomName,
      };

    case "CHANGE_CHATROOMID":
      return {
        ...state,
        chatroomId: action.chatroomId,
      };

    case "CHANGE_LASTUSER":
      return {
        ...state,
        lastUser: action.lastUser,
      };
    case "CHANGE_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "CHANGE_USER_ALL":
      return {
        ...state,
        username: action.user.username,
        email: action.user.email,
        _id: action.user._id,
        bio: action.user.bio,
        avi: action.user.avi,
        loggedIn: action.user.loggedIn,
        club: action.user.club,
        userRole: action.user.userRole,
        privateChats: action.user.privateChats
      };
    case "CHANGE_CLUB_USERROLE":
      return {
        ...state,
        club: action.user.club,
        userRole: action.user.userRole
      };
    // you can have as many case statements as you need

    default:
      return state;
  }
};

export default Reducer;
