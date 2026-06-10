import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Switch, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Lock, Brain, CheckCircle2, Activity, Info, Flame, Settings, Bell, Ruler, CreditCard, UserCircle2, HeartPulse, Moon, Sun, Monitor } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

export const MenuModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const { 
    isPremium, units, setUnits, pushNotificationsEnabled, setPushNotifications,
    healthSyncEnabled, toggleHealthSync, weight, height, sex, theme, setTheme
  } = useAppStore();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[styles.contentCard, theme === 'dark' && styles.contentCardDark]}>
          <View style={styles.header}>
            <Text style={[styles.title, theme === 'dark' && styles.textDark]}>Settings</Text>
            <TouchableOpacity onPress={onClose} style={[styles.closeButton, theme === 'dark' && styles.closeButtonDark]}>
              <X size={20} color={theme === 'dark' ? "#94A3B8" : "#6B7280"} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {/* Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Account</Text>
              
              <TouchableOpacity 
                onPress={() => setShowProfileModal(true)}
                style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#6366F1' }]}>
                    <UserCircle2 size={20} color="white" />
                  </View>
                  <View>
                    <Text style={[styles.menuItemTitle, theme === 'dark' && styles.textDark]}>About You</Text>
                    <Text style={styles.menuItemSubtitle}>{weight ? `${weight} • ${height} • ${sex}` : 'Set your profile details'}</Text>
                  </View>
                </View>
                <Text style={styles.editLabel}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setShowPremiumModal(true)}
                style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#3B82F6' }]}>
                    <Lock size={20} color="white" />
                  </View>
                  <View>
                    <Text style={[styles.menuItemTitle, theme === 'dark' && styles.textDark]}>Upgrade to Pro</Text>
                    <Text style={styles.menuItemSubtitle}>{isPremium ? 'Lifetime Access Active' : 'Unlock all features'}</Text>
                  </View>
                </View>
                {isPremium ? <CheckCircle2 size={20} color="#22C55E" /> : <Text style={styles.priceLabel}>$7.99</Text>}
              </TouchableOpacity>
            </View>

            {/* Integrations Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Integrations</Text>
              
              <View style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
                <View style={[styles.menuItemLeft, { flex: 1, paddingRight: 16 }]}>
                  <View style={[styles.iconContainer, { backgroundColor: '#EF4444' }]}>
                    <HeartPulse size={20} color="white" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.menuItemTitle, theme === 'dark' && styles.textDark]}>Sync Health Data</Text>
                    <Text style={[styles.menuItemSubtitle, { lineHeight: 16 }]}>Import Apple Health / Google Fit data for weight, sleep, and HR.</Text>
                  </View>
                </View>
                <Switch 
                  value={healthSyncEnabled} 
                  onValueChange={toggleHealthSync}
                  trackColor={{ false: '#E5E7EB', true: '#EF4444' }}
                />
              </View>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Preferences</Text>
              
              <View style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#A855F7' }]}>
                    <Bell size={20} color="white" />
                  </View>
                  <Text style={[styles.menuItemTitle, theme === 'dark' && styles.textDark]}>Push Notifications</Text>
                </View>
                <Switch 
                  value={pushNotificationsEnabled} 
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                />
              </View>

              <View style={[styles.menuItem, theme === 'dark' && styles.menuItemDark, { flexDirection: 'column', alignItems: 'stretch', gap: 16, paddingVertical: 20 }]}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#F97316' }]}>
                    <Ruler size={20} color="white" />
                  </View>
                  <Text style={[styles.menuItemTitle, theme === 'dark' && styles.textDark]}>Measurement Units</Text>
                </View>
                <View style={[styles.unitToggleRow, theme === 'dark' && styles.unitToggleRowDark]}>
                  <TouchableOpacity 
                    onPress={() => setUnits('units')}
                    style={[styles.unitTab, units === 'units' && styles.unitTabActive]}
                  >
                    <Text style={[styles.unitTabText, units === 'units' && styles.unitTabTextActive]}>Units (U-100)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setUnits('ml')}
                    style={[styles.unitTab, units === 'ml' && styles.unitTabActive]}
                  >
                    <Text style={[styles.unitTabText, units === 'ml' && styles.unitTabTextActive]}>Milliliters (mL)</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Theme Selection */}
              <View style={[styles.menuItem, theme === 'dark' && styles.menuItemDark, { flexDirection: 'column', alignItems: 'stretch', gap: 16, paddingVertical: 20 }]}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#6B7280' }]}>
                    {theme === 'light' ? <Sun size={20} color="white" /> : theme === 'dark' ? <Moon size={20} color="white" /> : <Monitor size={20} color="white" />}
                  </View>
                  <Text style={[styles.menuItemTitle, theme === 'dark' && styles.textDark]}>App Theme</Text>
                </View>
                <View style={[styles.unitToggleRow, theme === 'dark' && styles.unitToggleRowDark]}>
                  <TouchableOpacity 
                    onPress={() => setTheme('light')}
                    style={[styles.unitTab, theme === 'light' && styles.unitTabActive]}
                  >
                    <Sun size={16} color={theme === 'light' ? 'white' : '#94A3B8'} style={{ marginBottom: 4 }} />
                    <Text style={[styles.unitTabText, theme === 'light' && styles.unitTabTextActive]}>Light</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setTheme('dark')}
                    style={[styles.unitTab, theme === 'dark' && styles.unitTabActive]}
                  >
                    <Moon size={16} color={theme === 'dark' ? 'white' : '#94A3B8'} style={{ marginBottom: 4 }} />
                    <Text style={[styles.unitTabText, theme === 'dark' && styles.unitTabTextActive]}>Dark</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setTheme('system')}
                    style={[styles.unitTab, theme === 'system' && styles.unitTabActive]}
                  >
                    <Monitor size={16} color={theme === 'system' ? 'white' : '#94A3B8'} style={{ marginBottom: 4 }} />
                    <Text style={[styles.unitTabText, theme === 'system' && styles.unitTabTextActive]}>System</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <PremiumModal visible={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      <ProfileEditModal visible={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </Modal>
  );
};

const ProfileEditModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const { weight, height, sex, updateProfile } = useAppStore();
  const [tempWeight, setTempWeight] = useState(weight);
  const [tempHeight, setTempHeight] = useState(height);
  const [tempSex, setTempSex] = useState(sex);

  const handleSave = () => {
    updateProfile({ weight: tempWeight, height: tempHeight, sex: tempSex as any });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[styles.contentCard, { height: '80%' }]}>
          <View style={styles.header}>
            <Text style={styles.title}>About You</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ gap: 24, paddingBottom: 20 }}>
              <View>
                <Text style={styles.inputLabel}>Weight (lbs/kg)</Text>
                <TextInput 
                  value={tempWeight} 
                  onChangeText={setTempWeight} 
                  style={styles.input}
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Height</Text>
                <TextInput 
                  value={tempHeight} 
                  onChangeText={setTempHeight} 
                  style={styles.input}
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Biological Sex</Text>
                <View style={styles.toggleRow}>
                  <TouchableOpacity 
                    onPress={() => setTempSex('Male')} 
                    style={[styles.toggleButton, tempSex === 'Male' ? styles.toggleButtonActive : styles.toggleButtonInactive]}
                  >
                    <Text style={[styles.toggleText, tempSex === 'Male' ? styles.toggleTextActive : styles.toggleTextInactive]}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setTempSex('Female')} 
                    style={[styles.toggleButton, tempSex === 'Female' ? styles.toggleButtonActive : styles.toggleButtonInactive]}
                  >
                    <Text style={[styles.toggleText, tempSex === 'Female' ? styles.toggleTextActive : styles.toggleTextInactive]}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            onPress={handleSave} 
            style={styles.saveButton}
            activeOpacity={0.9}
          >
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const PremiumModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const { unlockPremium, isPremium } = useAppStore();
  const [promoInput, setPromoInput] = useState('');
  const [error, setError] = useState('');

  const handlePromoSubmit = () => {
    if (promoInput.toUpperCase() === 'LIFETIME') {
      unlockPremium();
      onClose();
    } else {
      setError('Invalid Promo Code');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[styles.contentCard, { height: '90%' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {isPremium ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.premiumBadgeLarge}>
                <CheckCircle2 size={40} color="#22C55E" />
              </View>
              <Text style={[styles.title, { marginBottom: 8 }]}>Premium Active</Text>
              <Text style={styles.premiumSuccessText}>You have lifetime access to OptiPep. Zero ads, AI Advisor unlocked.</Text>
              <TouchableOpacity onPress={onClose} style={styles.premiumCloseBtn}>
                <Text style={{ fontWeight: '700', color: '#000000' }}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center', marginBottom: 32 }}>
                <Text style={styles.promoTitle}>Opti<Text style={{ color: '#3B82F6' }}>Pep</Text> PRO</Text>
                <Text style={styles.promoSubtitle}>Unlock the ultimate protocol experience.</Text>
              </View>

              <View style={{ marginBottom: 32 }}>
                <FeatureRow icon={<Brain size={20} color="#9333EA" />} text="Full AI Protocol Advisor" bgColor="#F3E8FF" />
                <FeatureRow icon={<Lock size={20} color="#EF4444" />} text="Zero Interruptions or Ads" bgColor="#FEE2E2" />
                <FeatureRow icon={<Activity size={20} color="#14B8A6" />} text="Unlimited Stack Items" bgColor="#CCFBF1" />
              </View>

              <View style={{ marginTop: 'auto', gap: 16 }}>
                <TouchableOpacity 
                  onPress={() => {
                    unlockPremium();
                    onClose();
                  }}
                  style={styles.premiumBuyBtn}
                >
                  <Text style={styles.premiumBuyBtnText}>Unlock Lifetime • $7.99</Text>
                </TouchableOpacity>
                
                <View style={{ paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
                  <Text style={styles.promoCodeLabel}>Have a Promo Code?</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TextInput 
                      value={promoInput} 
                      onChangeText={setPromoInput}
                      placeholder="Enter code (Try: LIFETIME)" 
                      style={styles.promoInput}
                      autoCapitalize="characters"
                    />
                    <TouchableOpacity 
                      onPress={handlePromoSubmit}
                      style={styles.promoApplyBtn}
                    >
                      <Text style={{ fontWeight: '700', color: '#000000' }}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const FeatureRow = ({ icon, text, bgColor }: { icon: React.ReactNode, text: string, bgColor: string }) => (
  <View style={styles.featureRow}>
    <View style={[styles.featureIcon, { backgroundColor: bgColor }]}>{icon}</View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

export const AdModal = ({ visible, onClose, onShowPremium }: { visible: boolean, onClose: () => void, onShowPremium: () => void }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.adOverlay}>
        <View style={styles.adCard}>
          <TouchableOpacity onPress={onClose} style={styles.adCloseButton}>
            <X size={20} color="white" />
          </TouchableOpacity>
          
          <View style={styles.adBanner}>
             <View style={styles.adLabelContainer}>
                <Text style={styles.adLabel}>Advertisement</Text>
             </View>
            <Flame size={48} color="white" />
            <Text style={styles.adTitle}>Burn Fat Faster</Text>
            <Text style={styles.adSubtitle}>Sponsor: Try the new XYZ Supplement today.</Text>
          </View>
          
          <View style={styles.adContent}>
            <TouchableOpacity onPress={onClose} style={styles.adSkipBtn}>
              <Text style={{ fontWeight: '700', color: '#111827' }}>Skip Ad</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { onClose(); onShowPremium(); }}
              style={{ alignItems: 'center' }}
            >
              <Text style={styles.adRemoveLink}>Remove ads completely</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },
  textDark: {
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  closeButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 4,
  },
  menuItem: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  menuItemDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
  },
  menuItemTitle: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 15,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  editLabel: {
    color: '#6366F1',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceLabel: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  unitToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  unitToggleRowDark: {
    backgroundColor: '#1C1C1E',
    borderColor: '#3A3A3C',
  },
  unitTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  unitTabActive: {
    backgroundColor: '#000000',
  },
  unitTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  unitTabTextActive: {
    color: '#FFFFFF',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    height: 60,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  toggleButtonInactive: {
    backgroundColor: '#F9FAFB',
    borderColor: '#F3F4F6',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  toggleTextInactive: {
    color: '#94A3B8',
  },
  saveButton: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
  premiumBadgeLarge: {
    width: 80,
    height: 80,
    backgroundColor: '#DCFCE7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  premiumSuccessText: {
    color: '#6B7280',
    marginBottom: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  premiumCloseBtn: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000000',
  },
  promoSubtitle: {
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  featureIcon: {
    padding: 8,
    borderRadius: 20,
  },
  featureText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1F2937',
  },
  premiumBuyBtn: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  premiumBuyBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
  promoCodeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontWeight: '700',
    fontSize: 14,
    height: 48,
  },
  promoApplyBtn: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
  adOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  adCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  adCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    zIndex: 10,
  },
  adBanner: {
    height: 180,
    backgroundColor: '#FF2D55',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  adLabelContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  adLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adTitle: {
    fontWeight: '900',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 12,
  },
  adSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  adContent: {
    padding: 24,
  },
  adSkipBtn: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  adRemoveLink: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
