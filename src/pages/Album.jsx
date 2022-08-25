import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: false,
    songInfos: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const songs = await getMusics(id);
    this.setState({
      loading: false,
      songInfos: songs,
    });
  }

  render() {
    const {
      loading,
      songInfos,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              <div>
                <h2 data-testid="album-name">
                  {songInfos[0]?.collectionName}
                </h2>
                <h2 data-testid="artist-name">
                  {songInfos[0]?.artistName}
                </h2>
              </div>
              {songInfos
                .slice(1)
                .map((album) => (
                  <div key={ songInfos.collectionId }>
                    <MusicCard
                      tracks={ album }
                    />
                  </div>
                ))}
            </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
