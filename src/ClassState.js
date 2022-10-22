import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = '123';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    
    // Estado compuesto.
    this.state = {
      error: false,
      loading: false,
      value: '',
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

        if (this.state.value === SECURITY_CODE) {
          this.setState({ error: false, loading: false }); // Forma imperactiva.
        } else {
          this.setState({ error: true, loading: false });
        }

        console.log('Terminando la validación. ClassState');
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar { this.props.name }</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {(this.state.error && !this.state.loading) && (
          <p>Error: el código es incorrecto.</p>
        )}
        
        {this.state.loading && (
          <Loading />
        )}

        <input type='text'
          placeholder='Código de seguridad'
          value={this.state.value}
          onChange={
            event => this.setState({ value: event.target.value })
          }
        />
        
        <button
          onClick={() => this.setState({loading: true})}
          // Otra manera: onClick={() => this.setState({ error: !this.state.error })}
        >Comprobar</button>
      </div>
    );
  }
}

export { ClassState };