import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Activity, Syringe, Beaker, Brain, Settings, Lock, Plus, Menu } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../../store/useAppStore';
import { MenuModal, AdModal } from '../../components/Modals';
import { AddCompoundModal } from '../../components/AddCompoundModal';

export default function TabLayout() {
  const isPremium = useAppStore(state => state.isPremium);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const insets = useSafeAreaInsets();

  const screenListeners = React.useMemo(() => ({
    state: (e: any) => {
      const { handleInteraction } = useAppStore.getState();
      if (handleInteraction()) {
        setShowAdModal(true);
      }
    }
  }), []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
      <View 
        style={{ 
          paddingTop: Math.max(insets.top, 16), 
          paddingBottom: 8,
          paddingHorizontal: 24,
          backgroundColor: '#F2F2F7',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
          <Text className="text-3xl font-bold tracking-tight text-black">
            Opti<Text className="text-blue-500">Pep</Text>
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => setShowMenuModal(true)} 
          className="p-2.5 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <Menu size={22} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
            paddingTop: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 10,
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#94A3B8',
        }}
        screenListeners={screenListeners}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Today',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={<Activity />} focused={focused} color="bg-blue-500" />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, fontWeight: '700', marginTop: 2, color: focused ? '#000000' : '#94A3B8' }}>Today</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="calculator"
          options={{
            title: 'Math',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={<Syringe />} focused={focused} color="bg-teal-500" />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, fontWeight: '700', marginTop: 2, color: focused ? '#000000' : '#94A3B8' }}>Math</Text>
            ),
          }}
        />
        
        {/* Middle Plus Button */}
        <Tabs.Screen
          name="plus"
          options={{
            title: '',
            tabBarButton: (props) => (
              <TouchableOpacity 
                onPress={() => setShowAddModal(true)}
                activeOpacity={0.8}
                style={{ 
                  top: -20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 70,
                  height: 70,
                }}
              >
                <View className="bg-orange-500 w-16 h-16 rounded-full items-center justify-center shadow-xl shadow-orange-500/40 border-[6px] border-[#F2F2F7]">
                  <Plus size={32} color="white" strokeWidth={3} />
                </View>
              </TouchableOpacity>
            )
          }}
        />

        <Tabs.Screen
          name="stack"
          options={{
            title: 'Stack',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={<Beaker />} focused={focused} color="bg-indigo-500" />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, fontWeight: '700', marginTop: 2, color: focused ? '#000000' : '#94A3B8' }}>Stack</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="ai"
          options={{
            title: 'Advisor',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={<Brain />} focused={focused} color="bg-purple-500" />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, fontWeight: '700', marginTop: 2, color: focused ? '#000000' : '#94A3B8' }}>Advisor</Text>
            ),
          }}
        />
      </Tabs>

      <MenuModal visible={showMenuModal} onClose={() => setShowMenuModal(false)} />
      <AddCompoundModal visible={showAddModal} onClose={() => setShowAddModal(false)} />
      <AdModal 
        visible={showAdModal} 
        onClose={() => setShowAdModal(false)} 
        onShowPremium={() => {
          setShowAdModal(false);
          setShowMenuModal(true);
        }} 
      />
    </View>
  );
}

function TabIcon({ icon, focused, color }: { icon: React.ReactElement, focused: boolean, color: string }) {
  return (
    <View className={`${focused ? color + ' shadow-lg shadow-black/20' : 'bg-transparent'} p-2.5 rounded-[14px]`}>
      {React.cloneElement(icon, { 
        size: focused ? 20 : 22, 
        color: focused ? 'white' : '#94A3B8',
        strokeWidth: focused ? 2.5 : 2 
      })}
    </View>
  );
}
