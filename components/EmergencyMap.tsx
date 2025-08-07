import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MapPin, TriangleAlert as AlertTriangle, Users } from 'lucide-react-native';

interface Alert {
  id: string;
  type: string;
  severity: string;
  coordinates: { lat: number; lng: number };
}

interface EmergencyMapProps {
  alerts: Alert[];
  userLocation: { lat: number; lng: number };
  style?: any;
}

export function EmergencyMap({ alerts, userLocation, style }: EmergencyMapProps) {
  // This is a simplified map component for demonstration
  // In a real app, you'd use react-native-maps or similar
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.mapView}>
        {/* User Location */}
        <View style={[styles.marker, styles.userMarker, { top: '50%', left: '50%' }]}>
          <Users size={16} color="#FFFFFF" />
        </View>
        
        {/* Alert Markers */}
        {alerts.map((alert, index) => (
          <View
            key={alert.id}
            style={[
              styles.marker,
              styles.alertMarker,
              {
                top: `${40 + index * 15}%`,
                left: `${30 + index * 20}%`,
                backgroundColor: alert.severity === 'high' ? '#DC2626' : '#F59E0B',
              },
            ]}
          >
            <AlertTriangle size={12} color="#FFFFFF" />
          </View>
        ))}
      </View>
      
      <View style={styles.overlay}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.legendText}>Your Location</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
            <Text style={styles.legendText}>High Alert</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Medium Alert</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapView: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  userMarker: {
    backgroundColor: '#3B82F6',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  alertMarker: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
});