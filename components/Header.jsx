import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

export default class Header extends Component {
  render() {
    const _handleMore = () => console.log('Shown more');

    return (
      <SafeAreaView edges={['bottom']} style={{ flex: 0 }}>
        <Appbar.Header mode="center-aligned" style={{ backgroundColor: '#54bbff' }}>
          <Appbar.Content title="Shahar Saath" titleStyle={{ fontWeight: 'bold' }} />
          <Appbar.Action
            color="black"
            icon="dots-vertical"
            onPress={_handleMore}
          />
        </Appbar.Header>
      </SafeAreaView>
    );
  }
}
