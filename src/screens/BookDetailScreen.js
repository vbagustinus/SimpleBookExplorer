import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import useBookStore from '../stores/bookStore';

function BookDetailScreen({ navigation }) {
  const selectedBook = useBookStore((state) => state.selectedBook);

  if (!selectedBook) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Data buku tidak tersedia.</Text>
        <Button title="Kembali" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedBook.coverUrl ? (
        <Image source={{ uri: selectedBook.coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]}>
          <Text style={styles.placeholderText}>No Cover</Text>
        </View>
      )}
      <Text style={styles.title}>{selectedBook.title}</Text>
      <Text style={styles.author}>{selectedBook.author}</Text>
      <Text style={styles.subtitle}>Detail lainnya tidak tersedia dari API.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  cover: {
    width: 180,
    height: 260,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    marginBottom: 24,
  },
  coverPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#6b7280',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  author: {
    marginTop: 8,
    fontSize: 16,
    color: '#6b7280',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
    gap: 12,
  },
  fallbackText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
  },
});

export default BookDetailScreen;
