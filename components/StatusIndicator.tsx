import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Wifi, WifiOff } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StatusIndicatorProps {
  isOnline: boolean;
}

export function StatusIndicator({ isOnline }: StatusIndicatorProps) {
  return (
    <View style={[styles.container, isOnline ? styles.online : styles.offline]}>
      {isOnline ? (
        <Wifi size={Math.max(18, width * 0.045)} color="#059669" strokeWidth={2.5} />
      ) : (
        <WifiOff size={Math.max(18, width * 0.045)} color="#F59E0B" strokeWidth={2.5} />
      )}
      <Text style={[styles.text, isOnline ? styles.onlineText : styles.offlineText]}>
        {isOnline ? 'Online' : 'Offline'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Math.max(12, width * 0.03),
    paddingVertical: Math.max(8, width * 0.02),
    borderRadius: 16,
    gap: Math.max(8, width * 0.02),
    minHeight: 36,
    minWidth: 80,
    justifyContent: 'center',
  },
  online: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  offline: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  text: {
    fontSize: Math.max(13, width * 0.034),
    fontWeight: '700',
    lineHeight: Math.max(16, width * 0.04),
  },
  onlineText: {
    color: '#059669',
  },
  offlineText: {
    color: '#F59E0B',
  },
});