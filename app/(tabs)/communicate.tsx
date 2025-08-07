import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MessageCircle, Users, Zap, Send, Bluetooth, Shield, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ChatMessage } from '@/components/ChatMessage';
import { SOSButton } from '@/components/SOSButton';

export default function CommunicateScreen() {
  const [isOnline, setIsOnline] = useState(false); // Start offline for mesh demo
  const [message, setMessage] = useState('');
  const [meshConnections, setMeshConnections] = useState(3);
  
  const messages = [
    {
      id: '1',
      sender: 'John D.',
      content: 'Everyone safe at the community center',
      timestamp: '2 min ago',
      type: 'status',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Roads blocked on Main St, taking alternate route',
      timestamp: '5 min ago',
      type: 'info',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'Maria S.',
      content: 'Need medical assistance at Pine & 5th',
      timestamp: '8 min ago',
      type: 'emergency',
      isOwn: false,
    },
    {
      id: '4',
      sender: 'Rescuer Alpha',
      content: 'Medical team dispatched to Pine & 5th',
      timestamp: '6 min ago',
      type: 'response',
      isOwn: false,
      isVerified: true,
    },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Emergency Communication</Text>
          <StatusIndicator isOnline={isOnline} />
        </View>
        
        {/* Mesh Network Status */}
        <View style={styles.meshStatus}>
          <View style={styles.meshInfo}>
            <Bluetooth size={16} color="#3B82F6" />
            <Text style={styles.meshText}>
              Mesh Network: {meshConnections} connections
            </Text>
          </View>
          <View style={styles.range}>
            <Text style={styles.rangeText}>Range: ~200m</Text>
          </View>
        </View>
      </View>

      {/* SOS Section */}
      <View style={styles.sosSection}>
        <SOSButton />
        <View style={styles.sosInfo}>
          <AlertTriangle size={16} color="#F59E0B" />
          <Text style={styles.sosText}>
            SOS broadcasts your location to all nearby devices
          </Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.messagesHeader}>
          <MessageCircle size={18} color="#6B7280" />
          <Text style={styles.messagesTitle}>Community Updates</Text>
          <View style={styles.onlineIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isOnline ? '#059669' : '#F59E0B' }]} />
            <Text style={styles.statusText}>
              {isOnline ? 'Online' : 'Offline - Mesh Only'}
            </Text>
          </View>
        </View>

        <View style={styles.messagesList}>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </View>
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Share updates or request help..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={280}
          />
          <TouchableOpacity 
            style={[styles.sendButton, { opacity: message.trim() ? 1 : 0.5 }]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Shield size={16} color="#059669" />
            <Text style={styles.quickActionText}>I'm Safe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Users size={16} color="#3B82F6" />
            <Text style={styles.quickActionText}>Need Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Zap size={16} color="#F59E0B" />
            <Text style={styles.quickActionText}>Hazard Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Connection Status */}
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>
          Messages relay through {meshConnections} nearby devices
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  meshStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meshInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meshText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  range: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rangeText: {
    fontSize: 12,
    color: '#4338CA',
    fontWeight: '500',
  },
  sosSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  sosInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  sosText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    marginTop: 16,
  },
  messagesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  messagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
    flex: 1,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  messagesList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#DC2626',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  connectionStatus: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
  },
});