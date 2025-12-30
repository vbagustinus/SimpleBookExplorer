import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function ErrorState({ message, onRetry, retryLabel = 'Coba Lagi' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <Button title={retryLabel} onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  message: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
  },
});

export default ErrorState;
