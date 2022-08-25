import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    loginName: '',
    email: '',
    image: '',
    description: '',
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const login = await getUser();
    this.setState({
      loading: false,
      loginName: login.name,
      email: login.email,
      image: login.image,
      description: login.description,
    });
  }

  render() {
    const {
      loading,
      loginName,
      email,
      image,
      description,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <main>
              <div>{ loginName }</div>
              <div>{ email }</div>
              <div>{ description }</div>
              <img src={ image } alt={ loginName } data-testid="profile-image" />
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link
                to="/profile/edit"
              >
                Editar perfil
              </Link>
            </main>
          )
        }
      </div>
    );
  }
}

export default Profile;
