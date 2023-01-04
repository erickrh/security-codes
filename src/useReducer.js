import React from 'react';

const SECURITY_CODE = '123';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducerSwitch, initialState);

  // Action Creators
  const resetOnError = () => dispatch({ type: actionTypes.resetError });
  const resetInput = () => dispatch({ type: actionTypes.resetInput });
  const onError = () => dispatch({ type: actionTypes.error });
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const emptyInput = () => dispatch({ type: actionTypes.emptyInput });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
  };
  /* Otra manera de onWrite
  const onWrite = (newValue) => {
    dispatch({ type: actionTypes.write, payload: newValue });
  };*/

  React.useEffect(() => {
    console.log('Empezando efecto. UseReducer.');

    if (state.loading) {
      resetOnError();

      resetInput();
      
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
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
          disabled={state.loading}
          onChange={onWrite} // Tiene el event implicito. onChange={event => onWrite(event.target.value)} Otra manera
        />
  
        <button
          disabled={state.loading}
          onClick={() => {
            if (state.value.length >= 1) onCheck();
            else emptyInput();
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
          onClick={onDelete}
        >
        Si, por favor.
        </button>

        <button
          onClick={onReset}
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
          onClick={onReset}
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

const actionTypes = {
  resetError: 'RESET_ERROR',
  resetInput: 'RESET_INPUT',
  emptyInput: 'EMPTY_INPUT',
  error: 'ERROR',
  confirm: 'CONFIRM',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
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
  case actionTypes.resetError:
    return {
      ...state,
      error: false,
    };
  case actionTypes.resetInput:
    return {
      ...state,
      placeholder: 'Código de seguridad',
    };
  case actionTypes.emptyInput:
    return {
      ...state,
      placeholder: 'Por favor escribe un código',
    };
  case actionTypes.error:
    return {
      ...state,
      error: true,
      loading: false,
    };
  case actionTypes.confirm:
    return {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    };
  case actionTypes.write:
    return {
      ...state,
      value: action.payload,
    };
  case actionTypes.check:
    return {
      ...state,
      loading: true,
    };
  case actionTypes.delete:
    return {
      ...state,
      deleted: true,
    };
  case actionTypes.reset:
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