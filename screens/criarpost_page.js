import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Modal,FlatList,Image,Alert,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const cursos = [
  'Desenvolvimento de Sistemas',
  'Vendas',
  'Eletromecânica',
  'Confeccionador de calçados',
  '',
];

const categorias = ['Tecnologia', 'Mecânica', 'Oratória', 'Produção'];

export default function CriarPost() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [modalVisibleCurso, setModalVisibleCurso] = useState(false);
  const [modalVisibleCategoria, setModalVisibleCategoria] = useState(false);
  const [imageUri, setImageUri] = useState(null); 


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Desculpe, precisamos de permissões para acessar a biblioteca de fotos!'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    let body = new FormData();

    if (imageUri) {
      body.append('photo', {
        uri: imageUri,
        name: 'post-image.png',
        type: 'image/png',
      });
    }

    body.append('titulo', titulo)
    body.append('description', descricao)
    body.append('category', categoriaSelecionada)
    body.append('course', cursoSelecionado)
    body.append('user_id', null)


    try {
      const response = await fetch('http://192.168.1.127:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: body, 
      });

      if (response.ok) {
        alert('Postagem criada com sucesso');
        navigation.navigate('Feed page'); 
      } else {
        alert('Falha ao criar postagem');
      }
    } catch (error) {
      console.log(error)
      alert('Erro de conexão ao criar postagem');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconHeader}
          onPress={() => navigation.navigate('Feed page')}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova publicação</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.publishButton}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.selectedImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={50} color="#ccc" />
          </View>
        )}

        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.inputinha}
        placeholder="Escreva um título"
        placeholderTextColor="#ccc"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity
        style={styles.selectRow}
        onPress={() => setModalVisibleCurso(true)}>
        <Text style={styles.selectText}>
          {cursoSelecionado || 'Selecionar curso'}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.selectRow}
        onPress={() => setModalVisibleCategoria(true)}>
        <Text style={styles.selectText}>
          {categoriaSelecionada || 'Selecionar categoria'}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>

      <TextInput
        style={styles.captionInput}
        placeholder="Escreva uma descrição..."
        placeholderTextColor="#ccc"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Modal
        visible={modalVisibleCurso}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={cursos}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCursoSelecionado(item);
                  setModalVisibleCurso(false);
                }}
                style={styles.modalItem}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisibleCurso(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={modalVisibleCategoria}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={categorias}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCategoriaSelecionada(item);
                  setModalVisibleCategoria(false);
                }}
                style={styles.modalItem}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisibleCategoria(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,

  },
  iconHeader: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  publishButton: {
    color: 'blue',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    flex: 1,
    height: 170,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  selectedImage: {
    flex: 1,
    height: 170,
    borderRadius: 10,
    marginRight: 0,
  },
  cameraButton: {
    width: 50,
    height: 50,
    backgroundColor: '#7B40E7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  inputinha: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  selectText: {
    fontSize: 16,
  },
  captionInput: {
    height: 160,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalItem: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  modalItemText: {
    fontSize: 18,
  },
  closeButton: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});
