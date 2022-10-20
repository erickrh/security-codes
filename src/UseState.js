import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = React.useState(false); // Estado de Forma independiente, imperativa, simple.
  const [loading, setLoding] = React.useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    console.log('Empezando efecto. UseState.');

    if (loading) {
      setError(false);
      document.querySelector('.useStateInput').placeholder = 'Código de seguridad';
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoding(false);
        console.log('Terminando validación. UseState');
      }, 2000);
    }

    console.log('Terminando efecto. UseState');
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      
      {error && (
        <p>Error: el código es incorrecto.</p>
      )}

      {loading && (
        <p>Cargando...</p>
      )}

      <input
        className='useStateInput'
        placeholder='Código de seguridad'
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />

      <button
        onClick={() => {
          if (value.length >= 1) setLoding(true);
          else (document.querySelector('.useStateInput').placeholder = 'Por favor escribe un código');
        }}
      >Comprobar</button>
    </div>
  );
}

export { UseState };