const initialState = {
  
};

const memberReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "MEMBER_REG":
      
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      }
        
        
      

 
    default:
      return state;
  }
};

export default memberReducer;
