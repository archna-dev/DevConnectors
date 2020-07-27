const initialState = {
  //users who are coming to my application assuming they are not logged in hence giving the following line.
  isAuthenticated: false,
  user: {}
};

export default function (state=initialState, action){
  switch(action.type){
    default:
      return state;
  }
};
