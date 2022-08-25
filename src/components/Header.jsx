import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loading: false,
    loginName: '',
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const login = await getUser();
    console.log(login.name);
    this.setState({
      loading: false,
      loginName: login.name,
    });
  }

  render() {
    const {
      loading,
      loginName,
    } = this.state;

    return (
      <div data-testid="header-component">
        {
          loading ? (
            <Loading />
          ) : (
            <div data-testid="header-user-name">{ loginName }</div>
          )
        }
      </div>
    );
  }
}

export default Header;
