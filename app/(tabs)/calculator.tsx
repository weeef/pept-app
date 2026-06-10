import React, { useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAppStore } from '../../store/useAppStore';
import { useColorScheme } from 'nativewind';

export default function Calculator() {
  const { units } = useAppStore();
  const [vialMg, setVialMg] = useState(5);
  const [bacMl, setBacMl] = useState(2);
  const [doseMcg, setDoseMcg] = useState(250);
  const { width } = useWindowDimensions();

  const mcgPerVial = vialMg * 1000;
  const unitsPerMl = 100;
  const totalUnits = bacMl * unitsPerMl;
  const mcgPerUnit = mcgPerVial / totalUnits;
  
  let rawUnits = doseMcg / mcgPerUnit;
  let calculatedUnits = rawUnits.toFixed(1);
  if (isNaN(Number(calculatedUnits)) || !isFinite(Number(calculatedUnits))) calculatedUnits = '0';

  // Display value based on units preference
  const displayValue = units === 'ml' ? (rawUnits / 100).toFixed(3) : calculatedUnits;
  const displayLabel = units === 'ml' ? 'mL' : 'Units';

  // Responsive font size for the large units display
  const unitsFontSize = width < 380 ? 'text-6xl' : 'text-7xl';

  return (
    <ScrollView 
      className="flex-1 bg-background dark:bg-background-dark" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
    >
      <View className="px-1 mt-2 mb-6">
        <Text className="text-3xl font-bold tracking-tight mb-1 text-black dark:text-white">Liquid Math</Text>
        <Text className="text-gray-500 dark:text-gray-400 font-medium">Safe, visual reconstitution.</Text>
      </View>

      <View className="bg-card dark:bg-card-dark rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-zinc-800 mb-6">
        
        {/* Sliders */}
        <View className="mb-4">
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm font-bold text-gray-700 dark:text-gray-300">Peptide Vial Size</Text>
              <Text className="text-blue-500 text-lg font-bold">{vialMg} mg</Text>
            </View>
            <Slider
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={vialMg}
              onValueChange={setVialMg}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor={colorScheme === 'dark' ? '#3F3F46' : '#E5E7EB'}
              thumbTintColor="#3B82F6"
            />
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm font-bold text-gray-700 dark:text-gray-300">BAC Water Added</Text>
              <Text className="text-teal-500 text-lg font-bold">{bacMl} mL</Text>
            </View>
            <Slider
              minimumValue={0.5}
              maximumValue={5}
              step={0.5}
              value={bacMl}
              onValueChange={setBacMl}
              minimumTrackTintColor="#14B8A6"
              maximumTrackTintColor={colorScheme === 'dark' ? '#3F3F46' : '#E5E7EB'}
              thumbTintColor="#14B8A6"
            />
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm font-bold text-gray-700 dark:text-gray-300">Desired Target Dose</Text>
              <Text className="text-indigo-500 text-lg font-bold">{doseMcg} mcg</Text>
            </View>
            <Slider
              minimumValue={50}
              maximumValue={2500}
              step={50}
              value={doseMcg}
              onValueChange={setDoseMcg}
              minimumTrackTintColor="#6366F1"
              maximumTrackTintColor={colorScheme === 'dark' ? '#3F3F46' : '#E5E7EB'}
              thumbTintColor="#6366F1"
            />
          </View>
        </View>

        {/* Visual Result */}
        <View className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 items-center relative overflow-hidden">
          <Text className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Draw to line on U-100 Syringe</Text>
          <View className="flex-row items-baseline justify-center gap-2 mb-4">
            <Text className={`${unitsFontSize} font-black text-black dark:text-white tracking-tighter`}>{displayValue}</Text>
            <Text className="text-xl font-bold text-gray-400 dark:text-gray-500">{displayLabel}</Text>
          </View>
          
          <View className="mt-8 flex-row justify-between items-end border-b-2 border-gray-300 dark:border-zinc-700 pb-2 px-2 w-full z-10">
            {[0, 5, 10, 15, 20, 25, 30].map(tick => (
               <View key={tick} className="items-center">
                 <Text className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-1">{tick}</Text>
                 <View className={`w-0.5 ${tick % 10 === 0 ? 'h-5 bg-gray-500 dark:bg-gray-400' : 'h-3 bg-gray-300 dark:bg-zinc-700'}`} />
               </View>
            ))}
          </View>
          <View 
            className="absolute bottom-0 left-0 h-12 bg-blue-500/10 border-t-2 border-blue-500"
            style={{ width: `${Math.min((Number(calculatedUnits) / 30) * 100, 100)}%` }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
