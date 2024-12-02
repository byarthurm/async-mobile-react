import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginpage from './screens/login_page';
import feedpage from './screens/feed_page';
import cadastroall from './screens/cadastroall_page';
import criarpost from './screens/criarpost_page'; 
import cadastrofast from './screens/cadastrofast_page';
import Dados from "./components/DadosContext"

const Stack = createStackNavigator();

export default function App() {
  return (
    <Dados.Provider value={{}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Pagina login" component={loginpage} />
          <Stack.Screen name="Cadastro rapido" component={cadastrofast} />
          <Stack.Screen name="Cadastro geral" component={cadastroall} />
          <Stack.Screen name="Feed page" component={feedpage} />
          <Stack.Screen name="Criar post" component={criarpost} />
        </Stack.Navigator>
      </NavigationContainer>
    </Dados.Provider>
  );
}

const styles = StyleSheet.create({

});
