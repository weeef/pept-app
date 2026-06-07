import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Brain, Lock, ChevronRight, Sparkles, AlertCircle, Info, Lightbulb } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { PremiumModal } from '../../components/Modals';
import { PROTOCOL_INSIGHTS, GENERAL_INSIGHTS, ON_TOPIC_KEYWORDS, OFF_TOPIC_RESPONSES, ProtocolInsight } from '../../constants/insights';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  type?: 'insight' | 'default' | 'error';
  insight?: ProtocolInsight;
}

export default function AIScreen() {
  const { isPremium, stack } = useAppStore();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Analyze stack for local insights
  const relevantInsights = useMemo(() => {
    const stackNames = stack.map(i => i.name.toLowerCase());
    return PROTOCOL_INSIGHTS.filter(insight => {
      return insight.triggerKeywords.some(keyword => 
        stackNames.some(name => name.includes(keyword))
      );
    });
  }, [stack]);

  // Initial AI Greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          id: '1', 
          sender: 'ai', 
          text: "Hello! I'm your OptiPep Protocol Advisor. I've analyzed your stack and I'm ready to help with interactions, injection sites, or reconstitution math. How can I assist you today?" 
        }
      ]);
    }
  }, []);

  const validateTopic = (text: string) => {
    const sanitized = text.toLowerCase().replace(/[^\w\s]/gi, '');
    const words = sanitized.split(/\s+/);
    return words.some(word => 
      ON_TOPIC_KEYWORDS.some(keyword => word.includes(keyword) || keyword.includes(word))
    );
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input.trim();
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Auto-scroll after user message
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    // Simulate AI validation and thinking
    setTimeout(() => {
      const isOnTopic = validateTopic(userText);
      let response: Message;

      if (!isOnTopic) {
        response = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: OFF_TOPIC_RESPONSES[Math.floor(Math.random() * OFF_TOPIC_RESPONSES.length)],
          type: 'error'
        };
        setMessages(prev => [...prev, response]);
      } else {
        // Logic for on-topic responses
        const keywordMatch = PROTOCOL_INSIGHTS.find(insight => 
          insight.triggerKeywords.some(kw => userText.toLowerCase().includes(kw))
        );

        if (keywordMatch) {
          response = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: `I found a specific protocol detail regarding that:`,
          };
          const insightMsg: Message = {
            id: (Date.now() + 2).toString(),
            sender: 'ai',
            type: 'insight',
            insight: keywordMatch,
            text: ''
          };
          setMessages(prev => [...prev, response, insightMsg]);
        } else {
          // General helpful response if no specific keyword insight matches
          response = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: "Based on the protocol safety standards in my database, here is a helpful tip for your routine:",
          };
          const insightMsg: Message = {
            id: (Date.now() + 2).toString(),
            sender: 'ai',
            type: 'insight',
            insight: { id: 'gen', title: 'Protocol Standard', advice: GENERAL_INSIGHTS[Math.floor(Math.random() * GENERAL_INSIGHTS.length)], type: 'info', triggerKeywords: [] },
            text: ''
          };
          setMessages(prev => [...prev, response, insightMsg]);
        }
      }
      
      setIsTyping(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 200);
    }, 1200);
  };

  if (!isPremium) {
    return (
      <View className="flex-1 bg-[#F2F2F7] items-center justify-center p-6 text-center">
        <View className="w-24 h-24 bg-purple-100 rounded-full items-center justify-center mb-6">
          <Brain size={48} color="#A855F7" />
        </View>
        <Text className="text-2xl font-bold mb-2 text-center">AI Protocol Advisor</Text>
        <Text className="text-gray-500 mb-8 text-sm text-center">Unlock personalized compound interactions, stack synergies, and scheduling advice powered by OptiPep Intelligence.</Text>
        <TouchableOpacity 
          onPress={() => setShowPremiumModal(true)}
          className="w-full bg-black py-4 rounded-xl flex-row items-center justify-center gap-2 shadow-lg active:opacity-80"
        >
          <Lock size={18} color="white" />
          <Text className="text-white font-bold text-lg">Unlock Premium</Text>
        </TouchableOpacity>
        <PremiumModal visible={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F2F2F7]"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View className="px-6 mt-2 mb-4">
        <View className="flex-row items-center gap-2">
          <Sparkles size={20} color="#A855F7" />
          <Text className="text-3xl font-black tracking-tight text-black">Advisor</Text>
        </View>
        <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Local Knowledge Base Active</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4" 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.type === 'insight' && msg.insight ? (
               <View className={`w-[90%] p-5 rounded-[24px] border ${
                 msg.insight.type === 'warning' ? 'bg-red-50 border-red-100' : 
                 msg.insight.type === 'tip' ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'
               }`}>
                 <View className="flex-row items-center gap-2 mb-2">
                   {msg.insight.type === 'warning' ? <AlertCircle size={18} color="#EF4444" /> : 
                    msg.insight.type === 'tip' ? <Lightbulb size={18} color="#3B82F6" /> : <Info size={18} color="#6B7280" />}
                   <Text className={`font-black text-xs uppercase tracking-wider ${
                     msg.insight.type === 'warning' ? 'text-red-700' : 
                     msg.insight.type === 'tip' ? 'text-blue-700' : 'text-gray-700'
                   }`}>{msg.insight.title}</Text>
                 </View>
                 <Text className="text-sm font-bold text-gray-800 leading-relaxed">{msg.insight.advice}</Text>
               </View>
            ) : (
              <View className={`${msg.sender === 'user' ? 'bg-black' : 'bg-white border border-gray-100'} p-4 rounded-2xl max-w-[85%] shadow-sm`}>
                <Text className={`${msg.sender === 'user' ? 'text-white' : 'text-gray-800'} font-bold text-sm leading-relaxed`}>{msg.text}</Text>
              </View>
            )}
          </View>
        ))}
        {isTyping && (
          <View className="items-start mb-4">
            <View className="bg-gray-100 p-4 rounded-2xl flex-row items-center gap-2">
              <View className="flex-row gap-1">
                <View className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <View className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <View className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </View>
              <Text className="text-gray-400 text-xs font-black uppercase">Advisor is thinking...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="p-4 bg-white border-t border-gray-100">
        <View className="flex-row items-center gap-3">
          <TextInput 
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your protocol..." 
            className="flex-1 bg-gray-50 border border-gray-100 rounded-full py-4 px-5 text-sm text-black font-bold h-14"
          />
          <TouchableOpacity 
            onPress={handleSend}
            className="w-14 h-14 bg-purple-500 rounded-full items-center justify-center shadow-lg shadow-purple-500/30"
          >
            <ChevronRight size={24} color="white" strokeWidth={3} />
          </TouchableOpacity>
        </View>
        <Text className="text-[9px] text-gray-400 font-bold text-center mt-3 uppercase tracking-tighter">
          Disclaimer: OptiPep Advisor provides educational info based on common protocols. Not medical advice.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

