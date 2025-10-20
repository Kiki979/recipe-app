import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase.client';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const router = useRouter();

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert('Fehler', error.message);
    router.replace('/recipes');
  }
  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return Alert.alert('Fehler', error.message);
    Alert.alert('Konto erstellt', 'Bitte einloggen.');
  }

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20, gap:12 }}>
      <Text style={{ fontSize:22, fontWeight:'700' }}>Rezept-App</Text>
      <TextInput placeholder="E-Mail" autoCapitalize="none" value={email} onChangeText={setEmail}
        style={{ borderWidth:1, padding:10, borderRadius:8 }} />
      <TextInput placeholder="Passwort" secureTextEntry value={password} onChangeText={setPassword}
        style={{ borderWidth:1, padding:10, borderRadius:8 }} />
      <TouchableOpacity onPress={signIn} style={{ backgroundColor:'#111', padding:12, borderRadius:8 }}>
        <Text style={{ color:'#fff', textAlign:'center' }}>Einloggen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signUp}>
        <Text style={{ textAlign:'center', color:'#555' }}>Neu? Konto erstellen</Text>
      </TouchableOpacity>
    </View>
  );
}
