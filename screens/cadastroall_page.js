import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const cadastroall = () => {
  const navigation = useNavigation();

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    try {
      if (cpf == ''){
        return Alert.alert('Campo vazio', 'Preencha seu cpf');
      }
      if (email == ''){
        return Alert.alert('Campo vazio', 'Preencha seu email');
      }
      if (idade == ''){
        return Alert.alert('Campo vazio', 'Diga sua idade abaixo');
      }
      if (senha == ''){
        return Alert.alert('Campo vazio', 'Defina sua senha');
      }
      if (matricula == ''){
        return Alert.alert('Campo vazio', 'Preencha sua matricula');
      }
      const response = await fetch(`http://192.168.1.127:5000/register/full`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula,
          nome: nomeCompleto,
          cpf,
          email,
          idade,
          senha,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Pagina login');
      } else {
        Alert.alert('Erro', 'Falha ao realizar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
    }
  };

  return (
    <View style={estilos.fundoTela}>
      <Image source={require('../assets/logo_inbits.png')} style={estilos.imagemLogo} />
      <Text style={estilos.obrigatorio}>Todos os campos são obrigatorios!</Text>
      <View style={estilos.secaoFormulario}>
        <TextInput
          style={estilos.campoDeEntrada}
          placeholder="Informe seu Nome"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
        <TextInput
          style={estilos.campoDeEntrada}
          placeholder="Informe seu CPF"
          value={cpf}
          keyboardType="numeric"
          onChangeText={setCpf}
        />
        <TextInput
          style={estilos.campoDeEntrada}
          placeholder="Informe seu email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={estilos.campoDeEntrada}
          placeholder="Informe sua idade"
          value={idade}
          keyboardType="numeric"
          onChangeText={setIdade}
        />
        <TextInput
          style={estilos.campoDeEntrada}
          placeholder="N° de Matricula"
          value={matricula}
          keyboardType="numeric"
          onChangeText={setMatricula}
        />
        <TextInput
          style={estilos.campoDeEntrada}
          placeholder="Informe sua senha"
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={estilos.botaoCadastrar} onPress={handleRegister}>
        <Text style={estilos.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.navigate('Pagina login')}
      >
        <Text style={estilos.textoVoltar}>Voltar ao login →</Text>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate("Feed page")}>
        <Text>Passar para a página de feed</Text>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  fundoTela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fffff ',
  },
  obrigatorio: {
    margin: 20,
    fontWeight: 'bold',
  },
  imagemLogo: {
    width: 120,
    height: 50,
    marginBottom: 10,
  },
  secaoFormulario: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 15,
  },
  campoDeEntrada: {
    width: '100%',
    height: 55,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoCadastrar: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#7B40E7',
    borderRadius: 12,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  botaoVoltar: {
    marginTop: 25,
    width: '100%',
    maxWidth: 380,
  },
  textoVoltar: {
    color: '#333',
    textDecorationLine: 'none',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default cadastroall;