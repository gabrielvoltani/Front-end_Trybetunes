import React from 'react';
import { Link } from 'react-router-dom';
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
            <main>
              <div data-testid="header-user-name">{ loginName }</div>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </main>
          )
        }
      </div>
    );
  }
}

export default Header;
