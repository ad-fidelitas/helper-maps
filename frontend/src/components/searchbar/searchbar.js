import React, { Component } from 'react';
 

class Searchbar extends Component {
render() {
  return(
    <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />
  )
}
}

export default Searchbar;