import React, { Component } from 'react';
import { Appbar} from 'react-native-paper';
import { styled } from 'nativewind';

export default class Header extends Component {
  render() {
    
  const _handleMore = () => console.log('Shown more');
    return (
        <Appbar.Header mode="center-aligned" style={{ backgroundColor: '#54bbff' }}>
          <Appbar.Content title="Shahar Saath" titleStyle={{ fontWeight: 'bold' }} />
              <Appbar.Action
                color="black"
                icon="dots-vertical"
                onPress={_handleMore}
            />
        </Appbar.Header>
    );
  }
}
