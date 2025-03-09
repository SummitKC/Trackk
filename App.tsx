import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './src/config/firebaseConfig'; // Update this import path
import {  collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function App() {
  const [connectionStatus, setConnectionStatus] = useState('Testing connection...');

  useEffect(() => {
    const testFirebase = async () => {
      try {
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        setConnectionStatus('✅ Connected to Firebase!');
      } catch (error) {
        setConnectionStatus(`❌ Connection failed: ${error}`);
        console.error('Firebase error:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{connectionStatus}</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
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
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  }
});