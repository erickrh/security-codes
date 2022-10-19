import React from 'react';

function UseState({ name }) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = React.useState(false); // Forma imperativa.
  const [loading, setLoding] = React.useState(false);

  React.useEffect(() => {
    console.log('Empezando efecto. UseState.');

    if (loading) {
      setTimeout(() => {
        console.log('Haciendo validación. UseState');
      
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

      <input type="text" placeholder='Código de seguridad' />
      <button
        onClick={() => setLoding(true)}
      >Comprobar</button>
    </div>
  );
}

export { UseState };