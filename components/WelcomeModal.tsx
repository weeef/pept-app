import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAppStore } from '../store/useAppStore';

export const WelcomeModal = () => {
  const { hasCompletedOnboarding, completeOnboarding } = useAppStore();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other' | ''>('');
  
  const [error, setError] = useState('');

  if (hasCompletedOnboarding) return null;

  const handleComplete = () => {
    if (!weight || !height || !sex) {
      setError('Please fill out all fields to continue.');
      return;
    }
    completeOnboarding({ weight, height, sex });
  };

  return (
    <Modal visible={!hasCompletedOnboarding} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentCard}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text style={styles.title}>Welcome to Opti<Text style={{color: '#3B82F6'}}>Pep</Text></Text>
              <Text style={styles.subtitle}>Let's personalize your protocol experience.</Text>
            </View>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Weight (lbs/kg)</Text>
              <TextInput 
                style={styles.input}
                placeholder="e.g. 185 lbs"
                placeholderTextColor="#94A3B8"
                value={weight}
                onChangeText={setWeight}
                keyboardType="default"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Height</Text>
              <TextInput 
                style={styles.input}
                placeholder="e.g. 5'10 or 178cm"
                placeholderTextColor="#94A3B8"
                value={height}
                onChangeText={setHeight}
                keyboardType="default"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Biological Sex</Text>
              <View style={styles.row}>
                <TouchableOpacity 
                  style={[styles.chip, sex === 'Male' && styles.chipActive]}
                  onPress={() => setSex('Male')}
                >
                  <Text style={[styles.chipText, sex === 'Male' && styles.chipTextActive]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.chip, sex === 'Female' && styles.chipActive]}
                  onPress={() => setSex('Female')}
                >
                  <Text style={[styles.chipText, sex === 'Female' && styles.chipTextActive]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleComplete}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 32,
    padding: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  chip: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  chipText: {
    fontWeight: '700',
    color: '#94A3B8',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
});
