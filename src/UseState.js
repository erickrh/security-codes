import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {

  // Estado de forma compuesta.
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    value: '',
  });

  /*   const [error, setError] = React.useState(false); // Estado de Forma independiente, imperativa, simple.
  const [loading, setLoding] = React.useState(false);
  const [value, setValue] = React.useState(''); */

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
            loading: false
          });
        }
        console.log('Terminando validación. UseState');
      }, 2000);
    }

    console.log('Terminando efecto. UseState');
  }, [state.loading]);

  console.log(state);

  return (
    <div>
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
    </div>
  );
}

export { UseState };