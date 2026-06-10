import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import { Plus, Syringe, Beaker, Info, Edit3, Trash2 } from 'lucide-react-native';
import { useAppStore, Compound } from '../../store/useAppStore';
import { AddCompoundModal } from '../../components/AddCompoundModal';

export default function StackScreen() {
  const stack = useAppStore(state => state.stack);
  const removeCompound = useAppStore(state => state.removeCompound);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCompound, setEditingCompound] = useState<Compound | null>(null);
  const { width } = useWindowDimensions();

  // Expiration logic (28 days shelf life)
  const calculateDaysLeft = (dateAdded: string | null) => {
    if (!dateAdded) return null;
    const reconDate = new Date(dateAdded);
    const shelfLife = 28 * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(reconDate.getTime() + shelfLife);
    const daysLeft = Math.ceil((expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const handleRemove = (id: string, name: string) => {
    Alert.alert(
      "Remove Compound",
      `Are you sure you want to remove ${name} from your stack?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeCompound(id) }
      ]
    );
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      >
        <View className="px-1 mt-2 mb-8">
          <Text className="text-3xl font-bold tracking-tight mb-1 text-black dark:text-white">Your Stack</Text>
          <Text className="text-gray-500 dark:text-gray-400 font-medium">Manage compounds & shelf life.</Text>
        </View>

        <View className="gap-4">
          {stack.map((item) => {
            const daysLeft = calculateDaysLeft(item.reconDate);
            const isExpiringSoon = daysLeft !== null && daysLeft <= 7;
            const isExpired = daysLeft !== null && daysLeft <= 0;

            return (
              <View key={item.id} className="bg-card dark:bg-card-dark border border-gray-100 dark:border-zinc-800 p-5 rounded-[28px] shadow-sm mb-2">
                <View className="flex-row items-start justify-between mb-4">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className={`w-14 h-14 rounded-2xl items-center justify-center ${item.type === 'peptide' ? 'bg-blue-500' : 'bg-teal-500'}`}>
                      {item.delivery === 'injectable' ? <Syringe size={24} color="white" /> : <Beaker size={24} color="white" />}
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{item.name}</Text>
                      <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.dose} • {item.frequency}</Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2">
                    <TouchableOpacity 
                      onPress={() => {
                        setEditingCompound(item);
                        setShowAddModal(true);
                      }}
                      className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl"
                    >
                      <Edit3 size={18} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => handleRemove(item.id, item.name)}
                      className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl"
                    >
                      <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {item.type === 'peptide' && daysLeft !== null && (
                  <View className={`p-4 rounded-2xl border flex-row items-start gap-3
                    ${isExpired ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30' : 
                      isExpiringSoon ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30' : 
                      'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30'}`}
                  >
                    <View className="mt-0.5">
                      <Info size={16} color={isExpired ? '#B91C1C' : isExpiringSoon ? '#C2410C' : '#1D4ED8'} />
                    </View>
                    <Text className={`text-[13px] font-semibold flex-1 leading-relaxed ${isExpired ? 'text-red-700 dark:text-red-400' : isExpiringSoon ? 'text-orange-700 dark:text-orange-400' : 'text-blue-700 dark:text-blue-400'}`}>
                      {isExpired 
                        ? `Warning: Reconstituted ${Math.abs(daysLeft)} days past 28-day shelf life.` 
                        : `${daysLeft} days until recommended disposal.`}
                    </Text>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </ScrollView>

      <AddCompoundModal 
        visible={showAddModal} 
        onClose={() => {
          setShowAddModal(false);
          setEditingCompound(null);
        }} 
        initialData={editingCompound || undefined}
      />
    </View>
  );
}
