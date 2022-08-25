import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    isDisabled: true,
    // loading: false,
  }

  onInputChange = (event) => {
    this.setState({
      artistName: event.target.value,
    }, () => {
      const { artistName } = this.state;
      const minLength = 2;
      this.setState({
        isDisabled: artistName.length < minLength,
      });
    });
  }

  btnClick = async () => {
    const {
      artistName,
    } = this.state;
    if (typeof artistName !== 'string') {
      console.log('erro');
    } else {
      this.setState({
        // loading: true,
      });
      await searchAlbumsAPI(artistName);
      this.setState({
        // loading: false,
      });
    }
  }

  render() {
    const {
      artistName,
      isDisabled,
      // loading,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="forms">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artistName }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.btnClick }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
