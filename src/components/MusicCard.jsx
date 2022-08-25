import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  async componentDidMount() {
    const { tracks: { trackId } } = this.props;
    this.setState({
      loading: true,
    });
    const result = await getFavoriteSongs();
    const alreadyFav = result.find((songs) => songs.trackId === trackId);
    this.setState({
      loading: false,
      checked: alreadyFav,
    });
  }

  async onInputChange() {
    const { tracks } = this.props;
    this.setState({
      loading: true,
      checked: true,
    });
    await addSong(tracks);
    this.setState({ loading: false });
  }

  render() {
    const { tracks: { trackId, trackName, previewUrl } } = this.props;
    const {
      loading,
      checked,
    } = this.state;
    return (
      <div>
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                <p>Favorite</p>
                <input
                  type="checkbox"
                  onChange={ this.onInputChange }
                  checked={ checked }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
            </div>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.string,
  tracks: PropTypes.shape({
    trackId: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
