import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { TriangleAlert as AlertTriangle, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export function SOSButton() {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSOSPress = () => {
    if (isActivated) {
      // Cancel SOS
      setIsActivated(false);
      setCountdown(0);
      return;
    }

    Alert.alert(
      'Emergency SOS',
      'This will broadcast your location and emergency status to all nearby devices. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send SOS',
          style: 'destructive',
          onPress: activateSOS,
        },
      ]
    );
  };

  const activateSOS = () => {
    setIsActivated(true);
    // In a real app, this would trigger the SOS broadcasting
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.sosButton,
          isActivated && styles.sosButtonActive,
        ]}
        onPress={handleSOSPress}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          {isActivated ? (
            <Zap size={Math.max(40, width * 0.1)} color="#FFFFFF" strokeWidth={3} />
          ) : (
            <AlertTriangle size={Math.max(40, width * 0.1)} color="#FFFFFF" strokeWidth={3} />
          )}
        </View>
        <Text style={styles.sosText}>
          {isActivated ? 'SOS ACTIVE' : 'EMERGENCY SOS'}
        </Text>
        {isActivated && (
          <Text style={styles.activeText}>Tap to cancel</Text>
        )}
      </TouchableOpacity>
      
      {isActivated && (
        <View style={styles.statusContainer}>
          <View style={styles.pulseAnimation} />
          <Text style={styles.statusText}>
            Broadcasting your location to nearby devices
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Math.max(20, height * 0.025),
    paddingVertical: Math.max(24, height * 0.03),
  },
  sosButton: {
    width: Math.max(160, width * 0.4),
    height: Math.max(160, width * 0.4),
    borderRadius: Math.max(80, width * 0.2),
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  sosButtonActive: {
    backgroundColor: '#7F1D1D',
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.7,
  },
  iconContainer: {
    marginBottom: Math.max(8, height * 0.01),
  },
  sosText: {
    fontSize: Math.max(14, width * 0.037),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1.2,
    lineHeight: Math.max(18, width * 0.045),
  },
  activeText: {
    fontSize: Math.max(12, width * 0.032),
    color: '#FCA5A5',
    marginTop: Math.max(6, height * 0.008),
    fontWeight: '600',
    lineHeight: Math.max(16, width * 0.04),
  },
  statusContainer: {
    alignItems: 'center',
    gap: Math.max(16, height * 0.02),
    paddingHorizontal: Math.max(20, width * 0.05),
  },
  pulseAnimation: {
    width: Math.max(20, width * 0.05),
    height: Math.max(20, width * 0.05),
    borderRadius: Math.max(10, width * 0.025),
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  statusText: {
    fontSize: Math.max(16, width * 0.042),
    color: '#374151',
    textAlign: 'center',
    maxWidth: Math.max(320, width * 0.8),
    lineHeight: Math.max(24, width * 0.06),
    fontWeight: '500',
  },
});