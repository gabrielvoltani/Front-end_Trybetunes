import propTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    isDisabled: true,
    login: '',
    loading: false,
  }

  onInputChange = (event) => {
    this.setState({
      login: event.target.value,
    }, () => {
      const { login } = this.state;
      const minLength = 3;
      this.setState({
        isDisabled: login.length < minLength,
      });
    });
  }

  btnActivate = async () => {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: login });
    this.setState({
      loading: false,
    });
    history.push('/search');
  }

  render() {
    const {
      isDisabled,
      login,
      loading,
    } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="Insira seu login"
                value={ login }
                onChange={ this.onInputChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ isDisabled }
                onClick={ this.btnActivate }
              >
                Entrar
              </button>
            </div>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
