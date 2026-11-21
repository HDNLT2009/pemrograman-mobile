import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { db } from '../config';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setTodos(data);
    });

    return unsubscribe;
  }, []);

  const addTodo = async () => {
    if (text.trim() === '') return;

    await addDoc(collection(db, 'todos'), {
      heading: text,
    });

    setText('');
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos CRUD Firebase</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan Todo"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Tambah</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={{ flex: 1 }}>{item.heading}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { item })}
            >
              <Text style={{ color: 'green', marginRight: 15 }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={{ color: 'red' }}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  todoItem: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});