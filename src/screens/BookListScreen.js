import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import useBookStore from '../stores/bookStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function BookListScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  const error = useBookStore((state) => state.error);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const selectBook = useBookStore((state) => state.selectBook);

  useEffect(() => {
    // Run once on mount to avoid any dependency-triggered re-fetch loops.
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectBook = useCallback(
    (bookId) => {
      selectBook(bookId);
      navigation.navigate('BookDetail');
    },
    [navigation, selectBook],
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelectBook(item.id)}>
      {item.coverUrl ? (
        <Image source={{ uri: item.coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]}>
          <Text style={styles.placeholderText}>No Cover</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && books.length === 0) {
    return <LoadingState message="Memuat buku..." />;
  }

  if (error && books.length === 0) {
    return <ErrorState message={error} onRetry={fetchBooks} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBooks} />}
        contentContainerStyle={books.length === 0 ? styles.emptyContainer : null}
        ListEmptyComponent={!loading ? <Text style={styles.emptyText}>Tidak ada buku.</Text> : null}
      />
      {error ? (
        <View style={[styles.inlineError, {paddingBottom: insets.bottom}]}>
          <Text style={styles.inlineErrorText}>{error}</Text>
          <Text style={styles.inlineRetry} onPress={fetchBooks}>
            Coba Lagi
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  coverPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#6b7280',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  author: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b7280',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  inlineError: {
    padding: 12,
    backgroundColor: '#fef2f2',
    borderTopWidth: 1,
    borderColor: '#fecdd3',
    justifyContent: 'center',
  },
  inlineErrorText: {
    color: '#991b1b',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
    marginBottom: 10,
  },
  inlineRetry: {
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default BookListScreen;
