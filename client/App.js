import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <TouchableOpacity style={styles.login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text>asdasdasd</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 100,
  },

  login: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 200,
    marginTop: 20
  },

  loginText: {
    color: "white",
    textAlign: "center",
    fontWeight: 'bold'
  }
});
