import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    isDisabled: true,
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

  render() {
    const {
      artistName,
      isDisabled,
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
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
