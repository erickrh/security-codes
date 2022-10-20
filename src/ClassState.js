import React from 'react';
import { Loading } from './Loading';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: false,
      loading: false,
    };
  }

  /*   // Primer método que se ejecuta. Equivalente a useEffect, con array vacio.
  UNSAFE_componentWillMount() {
    console.log('componentWillMount');
  }
  
  // Segundo en ejecutarse.
  componentDidMount() {
    console.log('componentDidMount');
  } */

  // Equivalente a useEffect, con el valor deseado a renderizar, en el array.
  componentDidUpdate() {
    console.log('Actualización.');

    if (this.state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validación. ClassState');

        this.setState({ loading: false });
  
        console.log('Terminando la validación. ClassState');
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar { this.props.name }</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {this.state.error && (
          <p>Error: el código es incorrecto.</p>
        )}
        
        {this.state.loading && (
          <Loading />
        )}

        <input type='text' placeholder='Código de seguridad' />
        <button
          onClick={() => this.setState({loading: true})}
          // Otra manera: onClick={() => this.setState({ error: !this.state.error })}
        >Comprobar</button>
      </div>
    );
  }
}

export { ClassState };