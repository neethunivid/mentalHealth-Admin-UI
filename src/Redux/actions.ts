export const fetchData = (key:any,api:any,request: any,) => {
  if (api.includes('library')) {

    return {
      type: 'FETCH_LIBRARY_DATA',
      payload: { key, api, request },
    };
  } else {
    return {
      type: 'FETCH_DATA',
      payload: { key, api, request },
    };
  }
};


export const fetchDataSuccess = (key:any, data:any) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: { key, data },
});

export const fetchDataFailure = (key:any, error:any) => ({
  type: 'FETCH_DATA_FAILURE',
  payload: { key, error },
});


//set member registration data
export const setMemberReg = (key:any,data: any) => {

  return {
    type: 'MEMBER_REG',
    payload:{
      key:key,
      data:data,
    }
  };
};
