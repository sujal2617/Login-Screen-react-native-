import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { validateForm } from '../utils/validation';
import credentials from '../data/credentials.json';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    setErrors({});
    const validation = validateForm(email, password);
    if (!validation.isValid) {
      setErrors({
        email: validation.email,
        password: validation.password,
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = credentials.users.find(
        u => u.email === email && u.password === password
      );

      setLoading(false);

      if (user) {
        Alert.alert('Login Successful! 🎉', `Welcome back!\n\nEmail: ${email}`, [
          { text: 'Continue', style: 'default' },
        ]);
      } else {
        Alert.alert('Login Failed ❌', 'Invalid email or password.', [
          { text: 'OK', style: 'default' },
        ]);
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Reset link will be sent to your email.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', style: 'default' },
    ]);
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Redirecting to registration screen...', [
      { text: 'OK', style: 'default' },
    ]);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="shield-checkmark" size={60} color="#4ECDC4" />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              icon={<Ionicons name="mail-outline" size={20} color="#A0A0A0" />}
            />

            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              error={errors.password}
              icon={
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons
                    name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#A0A0A0"
                  />
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Ionicons
                name={rememberMe ? 'checkbox' : 'checkbox-outline'}
                size={20}
                color="#4ECDC4"
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>

            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <TouchableOpacity onPress={clearForm} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Form</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>Email: test@demo.com</Text>
            <Text style={styles.demoText}>Password: Test@123</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 140,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    minHeight: height * 0.9,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0FF',
    textAlign: 'center',
  },
  form: {
    marginBottom: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 15,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  clearButtonText: {
    color: '#E0E0FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  linksContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  linkText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpText: {
    color: '#E0E0FF',
    fontSize: 14,
  },
  signUpLink: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  demoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoText: {
    color: '#E0E0FF',
    fontSize: 12,
    marginBottom: 2,
  },
});

export default LoginScreen;
