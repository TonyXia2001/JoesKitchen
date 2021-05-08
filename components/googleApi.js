import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GoogleApi() {
  useEffect(() => {
    console.log('Joe');
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>Testing Google Cloud</Text>
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
  },
});

export { GoogleApi };
