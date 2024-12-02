import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroRápido() {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');
  const [permission, setPermission] = useState(false);


const handleCadastro = async () => {
    console.log({ user, email, age, interest, permission }); 

    if (user === '') {
      return Alert.alert('Campo vazio', 'Preencha seu nome de usuário');
    }
    if (email === '') {
      return Alert.alert('Campo vazio', 'Preencha seu e-mail');
    }
    if (age === '') {
      return Alert.alert('Campo vazio', 'Diga sua idade abaixo');
    }
    if (interest === '') {
      return Alert.alert('Campo vazio', 'Defina sua área de interesse');
    }

    try {
      const response = await fetch('http://192.168.1.127:5000/register/quick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: user,
          email: email,
          idade: age,
          interesse: interest,
          permissao: permission,
        }),
      });

      if (response.ok) {

        navigation.navigate('Feed page', { isQuickRegister: true });
      } else {

        Alert.alert('Erro', 'Erro ao cadastrar, tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Erro de conexão, tente novamente.');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_inbits.png')} style={styles.logo} />
      <Text style={styles.obrigatorio}>Todos os campos são obrigatorios!</Text>
      <TextInput style={styles.input} placeholder="Informe seu nome de usuario" value={user} onChangeText={setUser} />
      <TextInput style={styles.input} placeholder="Informe seu Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Informe sua idade" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Fale um pouco dos seus interesses" value={interest} onChangeText={setInterest} multiline />
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Você permite receber e-mails de notificação?</Text>
        <Switch value={permission} onValueChange={setPermission} />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleCadastro}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height:10,
  },
  obrigatorio: {
    margin:10,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 40,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  textArea: {
    height: 100, 
    textAlignVertical: 'top', 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    width: '100%',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: '#7B40E7',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
