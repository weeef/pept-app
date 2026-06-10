import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Syringe, Beaker, Heart, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';

export default function Dashboard() {
  const stack = useAppStore(state => state.stack);
  const loggedDoses = useAppStore(state => state.loggedDoses);
  const history = useAppStore(state => state.history);
  const { logDose, undoLog, weight, healthSyncEnabled, toggleHealthSync } = useAppStore();
  const { width } = useWindowDimensions();
  const today = new Date().toISOString().split('T')[0];
  const isSmallScreen = width < 380;

  return (
    <ScrollView 
      className="flex-1 bg-background dark:bg-background-dark" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
    >
      {/* Apple Health Biometrics Mock */}
      <View className="bg-card dark:bg-card-dark rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-zinc-800 mt-2">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <Heart size={20} color="#EF4444" />
            <Text className="text-lg font-bold dark:text-white">Health Trends</Text>
          </View>
          {!healthSyncEnabled && (
            <TouchableOpacity onPress={toggleHealthSync} className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/50">
              <Text className="text-blue-600 dark:text-blue-400 font-bold text-xs">Sync Data</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className={`${isSmallScreen ? 'flex-col' : 'flex-row'} gap-3 mb-3`}>
          <View className="flex-1 bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4 border border-gray-100 dark:border-zinc-800">
            <Text className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Weight</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">{weight || '--'} <Text className="text-sm font-normal text-gray-500">lbs</Text></Text>
            {healthSyncEnabled ? (
              <Text className="text-[10px] text-green-600 mt-1 font-medium">Synced today</Text>
            ) : (
              <Text className="text-[10px] text-gray-400 mt-1 font-medium">Manual Entry</Text>
            )}
          </View>
          <View className="flex-1 bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-50 dark:border-red-900/30">
            <Text className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1">Resting HR</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">{healthSyncEnabled ? '58' : '--'} <Text className="text-sm font-normal text-gray-500">bpm</Text></Text>
            <Text className="text-[10px] text-green-600 mt-1 font-medium">{healthSyncEnabled ? '↓ 2 bpm this week' : 'Needs Sync'}</Text>
          </View>
        </View>
        <View className="w-full bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 border border-indigo-50 dark:border-indigo-900/30">
          <TouchableOpacity onPress={toggleHealthSync} activeOpacity={0.7}>
            <Text className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Deep Sleep</Text>
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">{healthSyncEnabled ? '2' : '--'}</Text>
              <Text className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">hr</Text>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">{healthSyncEnabled ? '15' : '--'}</Text>
              <Text className="text-sm font-normal text-gray-500 dark:text-gray-400">m</Text>
            </View>
            <Text className="text-[10px] text-green-600 mt-1 font-medium">{healthSyncEnabled ? '↑ 10m this week' : 'Connect Apple Health / Google Fit to track'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-2xl font-bold tracking-tight px-1 mt-8 mb-4 dark:text-white">Today's Schedule</Text>
      
      <View className="gap-4">
        {stack.map((item) => {
          const loggedInfo = loggedDoses[item.id];
          const isLoggedToday = loggedInfo?.date === today;
          const currentSiteIndex = loggedInfo ? loggedInfo.siteIndex : 0;
          const suggestedSite = item.recommendedSites.length > 0 ? item.recommendedSites[currentSiteIndex % item.recommendedSites.length] : null;

          return (
            <View key={item.id} className="bg-card dark:bg-card-dark rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-zinc-800 flex-col mb-2">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-3">
                  <View className={`p-3 rounded-2xl shadow-sm ${item.type === 'peptide' ? 'bg-blue-500' : 'bg-teal-500'}`}>
                    {item.delivery === 'injectable' ? <Syringe size={22} color="white" /> : <Beaker size={22} color="white" />}
                  </View>
                  <View>
                    <Text className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{item.name}</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.dose} • {item.frequency}</Text>
                  </View>
                </View>
              </View>
              
              {!isLoggedToday ? (
                <View>
                   {item.delivery === 'injectable' && item.recommendedSites.length > 0 && (
                      <View className="mb-4 bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/30">
                        <View className="flex-row justify-between items-center mb-2">
                          <Text className="text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest">Target Site</Text>
                          <View className="bg-blue-500 px-2 py-0.5 rounded-md">
                            <Text className="text-[9px] font-black text-white uppercase">{item.frequency}</Text>
                          </View>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <Text className="text-base font-black text-blue-900 dark:text-blue-200">{suggestedSite}</Text>
                        </View>
                        <View className="mt-2 pt-2 border-t border-blue-100/30 dark:border-blue-900/30 flex-row flex-wrap gap-x-4 gap-y-1">
                          <Text className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Needle Gauge: <Text className="text-blue-800 dark:text-blue-300">{item.needleGauge}</Text></Text>
                          <Text className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Needle Length: <Text className="text-blue-800 dark:text-blue-300">{item.needleLength}</Text></Text>
                        </View>
                      </View>
                   )}
                   <TouchableOpacity 
                     onPress={() => logDose(item.id)}
                     className="w-full bg-gray-100 dark:bg-zinc-800 py-4 rounded-2xl items-center justify-center active:opacity-70"
                   >
                     <Text className="text-black dark:text-white font-bold text-base">Log {item.delivery === 'injectable' ? 'Dose' : 'Pill'}</Text>
                   </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl p-4 gap-3 mb-3">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <CheckCircle2 size={18} color="#15803D" className="mr-2" />
                        <Text className="text-green-700 dark:text-green-400 font-bold text-sm">Logged for today</Text>
                      </View>
                      <TouchableOpacity 
                        onPress={() => undoLog(item.id)}
                        className="bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-lg"
                      >
                        <Text className="text-green-800 dark:text-green-200 text-[10px] font-black uppercase">Undo</Text>
                      </TouchableOpacity>
                    </View>
                    {item.delivery === 'injectable' && item.recommendedSites.length > 0 && (
                      <View className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
                        <Text className="text-[13px] text-gray-800 dark:text-white leading-relaxed font-bold">
                          Site Rotation Active
                        </Text>
                        <Text className="text-[12px] text-gray-600 dark:text-gray-400 mt-1">
                          {item.injectionType === 'subcutaneous' && <Text className="text-orange-600 dark:text-orange-400 font-black">Reminder: Swap sites tomorrow. </Text>}
                          Next session: <Text className="font-black text-blue-600 dark:text-blue-400">{item.recommendedSites[(currentSiteIndex + 1) % item.recommendedSites.length]}</Text>
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {history.length > 0 && (
        <View className="mt-8">
          <Text className="text-2xl font-bold tracking-tight px-1 mb-4 dark:text-white">Recent History</Text>
          <View className="bg-card dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
            {history.slice(0, 5).map((log, index) => (
              <View key={log.id} className={`p-4 flex-row items-center justify-between ${index !== history.slice(0, 5).length - 1 ? 'border-b border-gray-50 dark:border-zinc-800' : ''}`}>
                <View className="flex-row items-center gap-3">
                  <View className="w-2 h-2 rounded-full bg-blue-500" />
                  <View>
                    <Text className="font-bold text-gray-900 dark:text-white text-sm">{log.compoundName}</Text>
                    <Text className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {log.dose} {log.site ? `• ${log.site}` : ''}
                    </Text>
                  </View>
                </View>
                <Text className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase">
                  {new Date(log.timestamp).toLocaleDateString() === today ? 'Today' : new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
