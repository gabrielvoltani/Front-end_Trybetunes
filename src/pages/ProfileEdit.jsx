import { shape } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    userData: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const response = await getUser();
      this.setState({
        loading: false,
        userData: response,
      });
    });
  }

  onInputChange = ({
    target: { value, name },
  }) => {
    const { userData } = this.state;
    this.setState({ userData: {
      ...userData,
      [name]: value,
    } });
  }

  handleClick = () => {
    const { history: { push } } = this.props;
    this.setState({ loading: true }, async () => {
      const { userData } = this.state;
      await updateUser(userData);
      this.setState({ loading: false });
      push('/profile');
    });
  }

  render() {
    const {
      loading,
      userData: { name,
        email,
        image,
        description },
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <input
                type="text"
                name="name"
                data-testid="edit-input-name"
                placeholder="Insert Name"
                value={ name }
                onChange={ this.onInputChange }
              />
              <input
                type="email"
                name="email"
                data-testid="edit-input-email"
                placeholder="Insert Email"
                value={ email }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                name="image"
                data-testid="edit-input-image"
                placeholder="Insert Image"
                value={ image }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                name="description"
                data-testid="edit-input-description"
                placeholder="Insert Description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </div>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ name.length === 0
                || email.length === 0
                || image.length === 0
                || description.length === 0 }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </div>

        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({}).isRequired,
};

export default ProfileEdit;
