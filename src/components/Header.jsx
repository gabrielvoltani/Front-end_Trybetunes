import React from 'react';
// import { getUser } from '../services/userAPI';
// import Loading from './Loading';

class Header extends React.Component {
  // state = {
  //   loading: false,
  // }

  // gettingUser = async () => {
  //   this.setState({
  //     loading: true,
  //   }, async () => {
  //     await getUser();
  //     this.setState({
  //       loading: false,
  //     });
  //   });
  // };

  render() {
    // const {
    //   loading,
    // } = this.state;
    return (
      <div data-testid="header-component">
        {/* {
          loading ? (
            <Loading />
          ) : ( */}
        <div>NOME DA PESSOA</div>
        {/* )
        } */}
      </div>
    );
  }
}

export default Header;
