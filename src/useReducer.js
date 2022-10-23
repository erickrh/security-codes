const initialState = {
  error: false,
  loading: false,
  value: '',
  deleted: false,
  confirmed: false,
};

// const reducer = (state, action) => {}; sintaxis básica.

// FORMA MÁS OBVIA DE REDUCER.
const reducerIf = (state, action) => {
  if (action.type === 'ERROR') { // Por convención se nombran en mayuscula.
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    };
  } else {
    return {...state};
  }
};

// FORMA MAS POPULAR.
const reducerSwitch = (state, action) => {
  switch(action.type) {
  case 'ERROR':
    return {
      ...state,
      error: true,
      loading: false,
    };
  case 'CHECK':
    return {
      ...state,
      loading: true,
    };
  default:
    return {...state};
  }
};


// OTRA MANERA.
const reducerObject = (state) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
};