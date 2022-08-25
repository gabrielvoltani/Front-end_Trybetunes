import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    isDisabled: true,
    loading: false,
    allAlbums: [],
    searched: '',
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
    this.setState({
      loading: true,
      searched: artistName,
    });
    const albums = await searchAlbumsAPI(artistName);
    this.setState({
      artistName: '',
      allAlbums: albums,
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      artistName,
      isDisabled,
      loading,
      allAlbums,
      searched,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <main>
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
              <div>
                <h3>
                  { `Resultado de álbuns de: ${searched}`}
                </h3>
                {allAlbums.length === 0
                  ? <span>Nenhum álbum foi encontrado</span>
                  : allAlbums.map((album) => (
                    <div key={ album.colletionId }>
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                      />
                      <h4>{album.collectionName}</h4>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        Acessar Álbum
                      </Link>
                    </div>
                  ))}
              </div>
            </main>
          )
        }
      </div>
    );
  }
}

export default Search;
