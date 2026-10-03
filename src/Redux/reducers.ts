const initialState = {
    data: {},
    loading: false,
    error: null,
  };
  
  const reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'FETCH_DATA':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_DATA_SUCCESS':
       // console.log(action.payload.key+" fetch data success called >>"+JSON.stringify(action.payload.data));
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            [action.payload.key]: action.payload.data,
          },
        };
      case 'FETCH_DATA_FAILURE':
        console.log("fetch error  called >>");
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };

  
      default:
        return state;
    }
  };
  
  export default reducer;
  