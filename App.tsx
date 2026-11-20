import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Portal Kampus UNLA - Fabric WebView
        </Text>
      </View>

      <WebView
        source={{uri: 'https://unla.ac.id'}}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
  height: 80,
  backgroundColor: '#1976D2',
  justifyContent: 'center',
  alignItems: 'center',
},
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default App;