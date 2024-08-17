import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <View style={styles.logo}>
          <Text style={{ color: '#ffff' }}>Logo</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={() => router.push('/login')}
        >
          <Text style={{ color: '#ffff' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={() => router.push('/sign-up')}
        >
          <Text style={{ color: '#ffff' }}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logocontainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200, // Adjusted to ensure it’s below the header
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#000',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
  },
});
