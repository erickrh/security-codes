import React from 'react';

const SECURITY_CODE = '123';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducerSwitch, initialState);

  React.useEffect(() => {
    console.log('Empezando efecto. UseReducer.');

    if (state.loading) {
      dispatch({type: 'RESET_ERROR'});

      dispatch({type: 'RESET_INPUT'});
      
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({type: 'ERROR'});
        } else {
          dispatch({type: 'CONFIRM'});
        }
        console.log('Terminando validación. UseReducer');
      }, 2000);
    }

    console.log('Terminando efecto. UseReducer');
  }, [state.loading]);

  // console.log(state);

  if (!state.deleted && !state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        
        {state.error && (
          <p>Error: el código es incorrecto.</p>
        )}
  
        {state.loading && (
          <p>Cargando...</p>
        )}
  
        <input
          placeholder={state.placeholder}
          value={state.value}
          onChange={event => {
            dispatch({type: 'WRITE', payload: { inputValue: event.target.value }});
          }}
        />
  
        <button
          onClick={() => {
            if (state.value.length >= 1) dispatch({type: 'CHECK'});
            else dispatch({type: 'EMPTY_INPUT'});
          }}
        >Comprobar</button>
      </React.Fragment>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>¿Estas seguro que deseas eliminar {name}</p>
        <button
          onClick={() => dispatch({type: 'DELETE'})}
        >
        Si, por favor.
        </button>

        <button
          onClick={() => dispatch({type: 'RESET'})}
        >
        No, gracias.
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Recuperar UseReducer</h2>
        <button
          onClick={() => dispatch({type: 'RESET'})}
        >
        Restablecer
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  error: false,
  loading: false,
  value: '',
  deleted: false,
  confirmed: false,
  placeholder: 'Código de seguridad',
};

/* // const reducer = (state, action) => {}; sintaxis básica.

// FORMA MÁS OBVIA DE REDUCER.
const reducerIf = (state, action) => {
  if (action.type === 'ERROR') { // Por convención se nombran en mayúscula.
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
}; */

// FORMA MAS POPULAR.
const reducerSwitch = (state, action) => {
  switch(action.type) {
  case 'RESET_ERROR':
    return {
      ...state,
      error: false,
    };
  case 'RESET_INPUT':
    return {
      ...state,
      placeholder: 'Código de seguridad',
    };
  case 'EMPTY_INPUT':
    return {
      ...state,
      placeholder: 'Por favor escribe un código',
    };
  case 'ERROR':
    return {
      ...state,
      error: true,
      loading: false,
    };
  case 'CONFIRM':
    return {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    };
  case 'WRITE':
    return {
      ...state,
      value: action.payload.inputValue,
    };
  case 'CHECK':
    return {
      ...state,
      loading: true,
    };
  case 'DELETE':
    return {
      ...state,
      deleted: true,
    };
  case 'RESET':
    return {
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    };
  default:
    return {...state};
  }
};

export { UseReducer };