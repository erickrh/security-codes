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
  const [loading, setLoding] = React.useState(false);
  const [value, setValue] = React.useState(''); */

  /* FORMA IMPERACTIVA  */

  React.useEffect(() => {
    console.log('Empezando efecto. UseState.');

    if (state.loading) {
      setState({
        ...state,
        error: false
      });

      document.querySelector('.useStateInput').placeholder = 'Código de seguridad';
      
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({
            ...state,
            error: true,
            loading: false
          });
        } else {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
        }
        console.log('Terminando validación. UseState');
      }, 2000);
    }

    console.log('Terminando efecto. UseState');
  }, [state.loading]);

  console.log(state);

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
          onChange={event => {
            setState({
              ...state,
              value: event.target.value
            });
          }}
        />
  
        <button
          onClick={() => {
            if (state.value.length >= 1) {
              setState({
                ...state,
                loading: true
              });
            }
            else {
              document.querySelector('.useStateInput').placeholder = 'Por favor escribe un código';
            }
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
          onClick={() => {
            setState({
              ...state,
              deleted: true,
            });
          }}
        >
        Si, por favor.
        </button>

        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: '',
            });
          }}
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
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: '',
            });
          }}
        >
        Restablecer
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };