import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { useNavigation } from '@react-navigation/native';

export default function Detail({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;

  const [textHeading, setTextHeading] = useState(item.heading);

  const updateTodo = async () => {
    if (textHeading.trim() === '') {
      Alert.alert('Todo tidak boleh kosong');
      return;
    }

    try {
      await updateDoc(doc(db, 'todos', item.id), {
        heading: textHeading.trim(),
      });
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Gagal update', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        onChangeText={setTextHeading}
        value={textHeading}
        placeholder="Update Todo"
      />
      <TouchableOpacity style={styles.buttonUpdate} onPress={updateTodo}>
        <Text>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 80, marginLeft: 15, marginRight: 15 },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065',
  },
});