import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Post = ({ userName, imageSource, description, titulo }) => {
  return (
    <View style={styles.card}>
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <Image source={{ uri: imageSource }} style={styles.image1} />
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const Warning = ({content}) => {
  return (
    <View style={styles.cardWarning}>
      <View style={styles.warningContainer}>
        <Text style={styles.warningPriority}>Coordenação</Text>
        <Text style={styles.warningContent}>{content}</Text>
      </View>
    </View>
  );
};

const FeedPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [posts, setPosts] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const isQuickRegister = route.params?.isQuickRegister || false;
  const userId = route.params?.userId || null;
  const [showAllWarnings, setShowAllWarnings] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://192.168.1.127:5000/posts');
      const data = await response.json();
      if (response.ok) {
        setPosts(data.reverse());
      } else {
        Alert.alert('Erro', 'Falha ao buscar os posts.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão ao buscar os posts.');
    }
  };

  const fetchWarnings = async () => {
    try {
      const response = await fetch('http://192.168.1.127:5000/warnings');
      const data = await response.json();
      if (response.ok) {
        setWarnings(data);
      } else {
        Alert.alert('Erro', 'Falha ao buscar os avisos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão ao buscar os avisos.');
    }
  };

  useEffect(() => {
    fetchWarnings();
    fetchPosts();
  }, []);
  
  const displayedWarnings = showAllWarnings ? warnings : warnings.slice(0, 1);

const reversedWarnings = [...displayedWarnings].reverse();


  return (
    <View style={styles.container}>
      <FlatList
        data={[...reversedWarnings, ...posts]}
        keyExtractor={(item) =>
  item.warnings_id ? `warning-${item.warnings_id}` : `post-${item.postfeed_id}`
}
        renderItem={({ item }) => (
          item.warnings_id ? (
            <Warning
              content={item.content}
            />
          ) : (
            <Post
              userName={`${item.user_name}`}
              titulo={item.titulo}
              imageSource={`http://192.168.1.127:5000/static/uploads/${item.img_id}`}
              description={item.description}
            />
          )
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Image source={require('../assets/logo_inbits.png')} style={styles.logo} />

            {/* Botão para atualizar o feed */}
            <TouchableOpacity style={styles.reload} onPress={() => {fetchPosts(); fetchWarnings();}}>
              <Ionicons name="reload" size={25} color="white"/>
            </TouchableOpacity>

            {isQuickRegister && (
              <TouchableOpacity 
                style={styles.matriculando} 
                onPress={() => navigation.navigate("Cadastro geral", { userId })}
              >
                <Text style={styles.matriculandotext}>Fez sua matrícula?</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {!isQuickRegister && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Criar post")}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}

      {warnings.length > 1 && (
        <TouchableOpacity
          onPress={() => setShowAllWarnings(!showAllWarnings)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {showAllWarnings ? 'Esconder avisos' : 'Ver todos os avisos'}
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, padding: 10, paddingBottom: 80},
  titulo: { fontSize: 20, marginTop: 10},
  reload: { backgroundColor: '#7B40E7', borderRadius: 20, padding: 2, left: -5, height: 30, top: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10},
  button: { position: 'absolute', bottom: 20, left:20, backgroundColor: '#7B40E7', borderRadius: 10, padding: 10 },
  buttonText: {color: '#fff',
    fontSize: 15,
    fontWeight: '500'},
  logo: { width: 100, height: 40 },
  matriculando: { backgroundColor: '#7B40E7', padding: 10, borderRadius: 10 },
  matriculandotext: { color: 'white' },
  card: { margin: 10, backgroundColor: '#fff', borderRadius: 20, elevation: 3 },
  cardWarning: { margin: 10, backgroundColor: '#EDE7EE', borderRadius: 10, elevation: 3 },
  postContainer: { padding: 15 },
  warningContainer: { padding: 15 },
  userContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  image1: { width: '100%', height: 300, borderRadius: 10 },
  description: { marginTop: 10, fontSize: 15 },
  warningPriority: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#7B40E7' },
  warningContent: { fontSize: 15, marginTop:5 },
  addButton: { position: 'absolute', bottom: 10, right: 20, backgroundColor: '#7B40E7', borderRadius: 30, padding: 15 }
});

export default FeedPage;
