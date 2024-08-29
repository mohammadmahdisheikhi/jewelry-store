const initialState = { 
    user: null,
    isAuthrnticated: false,
    loading: false,
    register_success: false, 
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

   
    switch(type) {
        default: 
            return state;
    };

};

export default userReducer;
