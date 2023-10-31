import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../styles/components/Button';
import { Container, SignForm } from '../styles';
import AuthActions from '../../../store/ducks/auth';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('aqui');
    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <SignForm>
          <h1>Boas vindas</h1>

          <span>E-mail</span>
          <input type="email" name="email" onChange={this.handleInputChange} />

          <span>Senha</span>
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
          />

          <Button size="big" type="submit" onClick={this.handleSubmit}>
            Entrar
          </Button>
        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
