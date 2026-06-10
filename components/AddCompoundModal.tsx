import React, { useState, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Info, Syringe, Pill, Search, Check, Plus, Bell } from 'lucide-react-native';
import { useAppStore, CompoundType, DeliveryMethod, InjectionType, Compound } from '../store/useAppStore';
import { RECOMMENDED_COMPOUNDS, RecommendedCompound } from '../constants/peptides';

export const AddCompoundModal = ({ visible, onClose, initialData }: { visible: boolean, onClose: () => void, initialData?: Compound }) => {
  const { addCompound, editCompound } = useAppStore();
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [delivery, setDelivery] = useState<DeliveryMethod>('injectable');
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendedCompound | null>(null);

  const frequencies = ['Daily', '2x / Week', '3x / Week', 'Bi-Weekly'];

  // Load initial data for editing
  React.useEffect(() => {
    if (initialData && visible) {
      setName(initialData.name);
      setDose(initialData.dose);
      setFrequency(initialData.frequency || 'Daily');
      setDelivery(initialData.delivery);
      
      const rec = RECOMMENDED_COMPOUNDS.find(c => c.name.toLowerCase() === initialData.name.toLowerCase());
      if (rec) setSelectedRecommendation(rec);
    } else if (visible) {
      // Clear for new entry
      setName('');
      setDose('');
      setFrequency('Daily');
      setDelivery('injectable');
      setSelectedRecommendation(null);
    }
  }, [initialData, visible]);

  // Filter suggestions based on name
  const suggestions = useMemo(() => {
    if (!name || selectedRecommendation) return [];
    return RECOMMENDED_COMPOUNDS.filter(c => 
      c.name.toLowerCase().includes(name.toLowerCase())
    ).slice(0, 5);
  }, [name, selectedRecommendation]);

  const handleSelectSuggestion = (item: RecommendedCompound) => {
    setName(item.name);
    setDelivery('injectable'); 
    setSelectedRecommendation(item);
  };

  const handleSave = () => {
    if(!name) return;
    
    const rec = selectedRecommendation || RECOMMENDED_COMPOUNDS.find(c => c.name.toLowerCase() === name.toLowerCase());
    
    const finalDelivery = delivery;
    const injectionType: InjectionType = finalDelivery === 'pill' ? 'none' : (rec?.injectionType || 'subcutaneous');
    const recommendedSites = finalDelivery === 'pill' ? [] : (rec?.sites || ['Abdomen']);
    const type: CompoundType = rec?.type || (name.toLowerCase().includes('peptide') ? 'peptide' : 'med');

    const compoundData = {
      name,
      dose: dose || 'Not specified',
      frequency,
      type,
      delivery: finalDelivery,
      injectionType,
      recommendedSites,
      needleGauge: rec?.needleGauge || (finalDelivery === 'injectable' ? '29G - 31G' : ''),
      needleLength: rec?.needleLength || (finalDelivery === 'injectable' ? '5/16" - 1/2"' : ''),
      reconDate: (finalDelivery === 'injectable' && type === 'peptide') ? (initialData?.reconDate || new Date().toISOString()) : null
    };

    if (initialData) {
      editCompound(initialData.id, compoundData);
    } else {
      addCompound(compoundData);
    }
    
    onClose();
  };

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="slide" 
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.contentCard}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{initialData ? 'Edit Compound' : 'Add Compound'}</Text>
              <Text style={styles.subtitle}>{initialData ? 'Update Protocol' : 'New Protocol Item'}</Text>
            </View>
            <TouchableOpacity 
              onPress={onClose} 
              activeOpacity={0.7}
              style={styles.closeButton}
            >
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={{ flex: 1 }} 
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ gap: 24, paddingBottom: 20 }}>
              {/* Delivery Method Toggle */}
              <View>
                <Text style={styles.label}>Delivery Method</Text>
                <View style={styles.toggleRow}>
                  <TouchableOpacity 
                    onPress={() => { setDelivery('injectable'); }} 
                    activeOpacity={0.8}
                    style={[
                      styles.toggleButton,
                      delivery === 'injectable' ? styles.toggleButtonActive : styles.toggleButtonInactive
                    ]}
                  >
                    <Syringe size={18} color={delivery === 'injectable' ? 'white' : '#94A3B8'} />
                    <Text style={[
                      styles.toggleText,
                      delivery === 'injectable' ? styles.toggleTextActive : styles.toggleTextInactive
                    ]}>Injectable</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => { setDelivery('pill'); setSelectedRecommendation(null); }} 
                    activeOpacity={0.8}
                    style={[
                      styles.toggleButton,
                      delivery === 'pill' ? styles.toggleButtonActive : styles.toggleButtonInactive
                    ]}
                  >
                    <Pill size={18} color={delivery === 'pill' ? 'white' : '#94A3B8'} />
                    <Text style={[
                      styles.toggleText,
                      delivery === 'pill' ? styles.toggleTextActive : styles.toggleTextInactive
                    ]}>Oral / Pill</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name Input & Suggestions */}
              <View style={{ zIndex: 100 }}>
                <Text style={styles.label}>Compound Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput 
                    value={name} 
                    onChangeText={(text) => {
                      setName(text);
                      if (selectedRecommendation && text !== selectedRecommendation.name) {
                        setSelectedRecommendation(null);
                      }
                    }} 
                    placeholder="Search peptides or steroids..." 
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                  />
                  <View style={styles.inputIcon}>
                    {selectedRecommendation ? <Check size={20} color="#22C55E" strokeWidth={3} /> : <Search size={20} color="#94A3B8" />}
                  </View>
                </View>

                {/* Suggestions List */}
                {suggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    {suggestions.map((item, index) => (
                      <TouchableOpacity 
                        key={item.name} 
                        onPress={() => handleSelectSuggestion(item)}
                        style={[
                          styles.suggestionItem,
                          index !== suggestions.length - 1 && styles.suggestionBorder
                        ]}
                      >
                        <View>
                          <Text style={styles.suggestionName}>{item.name}</Text>
                          <Text style={styles.suggestionMeta}>{item.injectionType.toUpperCase()} • {item.sites[0]}...</Text>
                        </View>
                        <Plus size={16} color="#3B82F6" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {selectedRecommendation && (
                  <View style={styles.protocolBadge}>
                    <View style={styles.protocolIcon}>
                      <Check size={14} color="white" strokeWidth={3} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.protocolTitle}>Verified Protocol</Text>
                      <Text style={styles.protocolText}>{selectedRecommendation.injectionType} ({selectedRecommendation.sites.join(', ')})</Text>
                    </View>
                  </View>
                )}
              </View>

              <View>
                <Text style={styles.label}>Target Dose Amount</Text>
                <TextInput 
                  value={dose} 
                  onChangeText={setDose} 
                  placeholder="e.g. 5mg, 250mcg" 
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                />
              </View>

              {/* Frequency Selector */}
              <View>
                <Text style={styles.label}>Dosing Frequency</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                  {frequencies.map((f) => (
                    <TouchableOpacity 
                      key={f}
                      onPress={() => setFrequency(f)}
                      style={[
                        styles.chip,
                        frequency === f ? styles.chipActive : styles.chipInactive
                      ]}
                    >
                      <Text style={[
                        styles.chipText,
                        frequency === f ? styles.chipTextActive : styles.chipTextInactive
                      ]}>{f}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Text style={{ fontSize: 10, color: '#94A3B8', fontWeight: '600', marginTop: 8, marginLeft: 4 }}>
                  <Bell size={10} color="#94A3B8" /> Used to schedule smart push notifications.
                </Text>
              </View>
              
              {delivery === 'injectable' && (
                <View style={styles.infoBox}>
                  <View style={styles.infoIcon}>
                    <Info size={18} color="#F59E0B" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoTitle}>Rotation Logic Active</Text>
                    <Text style={styles.infoText}>The app will automatically cycle through injection sites to maintain tissue health.</Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          <TouchableOpacity 
            onPress={handleSave} 
            activeOpacity={0.9}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>{initialData ? 'Update Protocol' : 'Save to Protocol'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 25,
      },
    }),
  },
  contentCardDark: {
    backgroundColor: '#1C1C1E',
    borderColor: '#2C2C2E',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },
  textDark: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  closeButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  toggleButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  toggleButtonActiveDark: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  toggleButtonInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F3F4F6',
  },
  toggleButtonInactiveDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  toggleTextActiveDark: {
    color: '#000000',
  },
  toggleTextInactive: {
    color: '#94A3B8',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    height: 64,
  },
  inputDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
    color: '#FFFFFF',
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
    top: 22,
  },
  suggestionsContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  suggestionsContainerDark: {
    backgroundColor: '#1C1C1E',
    borderColor: '#3A3A3C',
  },
  suggestionItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  suggestionBorderDark: {
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  suggestionName: {
    fontWeight: '700',
    color: '#111827',
  },
  suggestionMeta: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  protocolBadge: {
    marginTop: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  protocolBadgeDark: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  protocolIcon: {
    backgroundColor: '#3B82F6',
    padding: 6,
    borderRadius: 8,
  },
  protocolTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1E40AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  protocolTitleDark: {
    color: '#93C5FD',
  },
  protocolText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
  protocolTextDark: {
    color: '#60A5FA',
  },
  infoBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.1)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  infoBoxDark: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  infoIcon: {
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#92400E',
  },
  infoTitleDark: {
    color: '#FCD34D',
  },
  infoText: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '700',
    lineHeight: 18,
    marginTop: 2,
  },
  infoTextDark: {
    color: '#FBBF24',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  saveButtonDark: {
    backgroundColor: '#FFFFFF',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
  saveButtonTextDark: {
    color: '#000000',
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  chipActiveDark: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  chipInactive: {
    backgroundColor: '#F9FAFB',
    borderColor: '#F3F4F6',
  },
  chipInactiveDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  chipTextActiveDark: {
    color: '#000000',
  },
  chipTextInactive: {
    color: '#94A3B8',
  },
});
