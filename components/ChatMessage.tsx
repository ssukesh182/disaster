import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield, TriangleAlert as AlertTriangle, Info, MessageCircle } from 'lucide-react-native';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'status' | 'emergency' | 'info' | 'response';
  isOwn: boolean;
  isVerified?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const getMessageStyle = () => {
    switch (message.type) {
      case 'emergency':
        return {
          backgroundColor: '#FEF2F2',
          borderColor: '#DC2626',
        };
      case 'response':
        return {
          backgroundColor: '#ECFDF5',
          borderColor: '#059669',
        };
      case 'status':
        return {
          backgroundColor: '#EEF2FF',
          borderColor: '#3B82F6',
        };
      default:
        return {
          backgroundColor: '#F9FAFB',
          borderColor: '#E5E7EB',
        };
    }
  };

  const getTypeIcon = () => {
    const iconProps = { size: 16 };
    
    switch (message.type) {
      case 'emergency':
        return <AlertTriangle {...iconProps} color="#DC2626" />;
      case 'response':
        return <Shield {...iconProps} color="#059669" />;
      case 'status':
        return <Info {...iconProps} color="#3B82F6" />;
      default:
        return <MessageCircle {...iconProps} color="#6B7280" />;
    }
  };

  const messageStyle = getMessageStyle();

  return (
    <View style={[
      styles.container,
      message.isOwn && styles.ownMessage,
      { backgroundColor: messageStyle.backgroundColor }
    ]}>
      <View style={styles.header}>
        <View style={styles.senderInfo}>
          {getTypeIcon()}
          <Text style={styles.sender}>
            {message.sender}
            {message.isVerified && ' ✓'}
          </Text>
        </View>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
      
      <Text style={styles.content}>{message.content}</Text>
      
      {message.type === 'emergency' && (
        <View style={styles.emergencyTag}>
          <Text style={styles.emergencyTagText}>EMERGENCY</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E5E7EB',
  },
  ownMessage: {
    marginLeft: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 20,
  },
  emergencyTag: {
    backgroundColor: '#DC2626',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 8,
  },
  emergencyTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});