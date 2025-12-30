import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetailScreen from '../screens/BookDetailScreen';
import BookListScreen from '../screens/BookListScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookList" component={BookListScreen} options={{ title: 'Daftar Buku' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Detail Buku' }} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
