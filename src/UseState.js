import React from 'react';

const SECURITY_CODE = '123';

function UseState({ name }) {

  // Estado de forma compuesta, compleja.
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    value: '',
    deleted: false,
    confirmed: false,
  });

  /*   const [error, setError] = React.useState(false); // Estado de Forma independiente, simple.
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(''); */

  /* FORMA SEMIDECLARATIVA  */

  const resetOnError = () => {
    setState({
      ...state,
      error: false
    });
  };

  const resetInput = () => {
    document.querySelector('.useStateInput').placeholder = 'Código de seguridad';
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    });
  };

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    });
  };

  const emptyInput = () => {
    document.querySelector('.useStateInput').placeholder = 'Por favor escribe un código';
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    });
  };

  React.useEffect(() => {
    console.log('Empezando efecto. UseState.');

    if (state.loading) {
      resetOnError();

      resetInput();
      
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
        console.log('Terminando validación. UseState');
      }, 2000);
    }

    console.log('Terminando efecto. UseState');
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
          className='useStateInput'
          placeholder='Código de seguridad'
          value={state.value}
          onChange={event => onWrite(event.target.value)}
        />
  
        <button
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
        <h2>Recuperar UseState</h2>
        <button
          onClick={onReset}
        >
        Restablecer
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };