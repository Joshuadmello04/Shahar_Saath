import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Header extends Component {
  render() {
    const _handleMore = () => console.log('Shown more');

    return (
      <SafeAreaView style={{ flex: 0 }} edges={['top', 'right', 'left']}>
        <Appbar.Header
          mode="center-aligned"
          style={{
            backgroundColor: '#54bbff',
            elevation: 0, // Remove shadow on Android
            margin: 0, // No margin around the Appbar
            padding: 0, // No padding around the Appbar
          }}
        >
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
