import React from 'react';

class Loading extends React.Component {

  // Tercero en ejecutarse.
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <p>Cargando...</p>
    );
  }
}

export { Loading };