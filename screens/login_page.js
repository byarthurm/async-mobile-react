import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const loginpage = () => {
  const navigation = useNavigation();
  const [nomePerfil, setNomePerfil] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');

  const handleLogin = async () => {
    const loginData = {
      matricula: nomePerfil,
      cpf: cpf,
      senha: senha,
    };

    try {
      const response = await fetch('http://192.168.1.127:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (loginData.matricula == ''){
        return Alert.alert('Campo vazio', 'Preencha sua matricula');
      }
      if (loginData.cpf == ''){
        return Alert.alert('Campo vazio', 'Preencha seu cpf');
      }
      if (loginData.senha == ''){
        return Alert.alert('Campo vazio', 'Preencha sua senha');
      }

      const data = await response.json();

      if (response.status === 200) {

        Alert.alert('Sucesso', 'Login bem-sucedido!');
        navigation.navigate('Feed page', { userId: data.user_id });
      } else {

        Alert.alert('Erro', data.message || 'Falha ao fazer login.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor, verifique as informações e tente novamente');
    }
  };

  return (
    <View style={styles.telaPrincipal}>
      <Image source={require('../assets/logo_inbits.png')} style={styles.imagemLogo} />
      <Text style={styles.obrigatorio}>Todos os campos são obrigatorios!</Text>
      <View style={styles.areaInputs}>
        <TextInput
          style={styles.inputEstilo}
          placeholder="N° da matrícula"
          value={nomePerfil}
          keyboardType="numeric"
          onChangeText={setNomePerfil}
        />
        <TextInput
          style={styles.inputEstilo}
          placeholder="Informe seu CPF"
          value={cpf}
          keyboardType="numeric"
          onChangeText={setCpf}
        />
        <TextInput
          style={styles.inputEstilo}
          placeholder="Informe sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.painelBotoes}>
        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('Cadastro geral')}>
          <Text style={styles.textoBotao}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro rapido')}>
          <Text style={styles.linktext}>Ainda não é aluno?</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  telaPrincipal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  obrigatorio: {
    margin: 20,
    fontWeight: 'bold',
  },
  imagemLogo: {
    width: 140,
    height: 60,
    marginBottom: 10,
  },
  areaInputs: {
    width: '100%',
    maxWidth: 400, 
    marginBottom: 30,
  },
  inputEstilo: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  painelBotoes: {
    width: '100%',
    maxWidth: 400, 
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoEntrar: {
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 20,
    width: '48%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCadastrar: {
    padding: 15,
    backgroundColor: '#7B40E7',
    borderRadius: 20,
    width: '48%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linktext:{
    fontSize: 16,
    textDecorationLine: "underline"
  },

});

export default loginpage;