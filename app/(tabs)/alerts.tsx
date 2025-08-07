import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MapPin, CircleAlert as AlertCircle, Wifi, WifiOff, Clock, Navigation } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusIndicator } from '@/components/StatusIndicator';
import { AlertCard } from '@/components/AlertCard';
import { EmergencyMap } from '@/components/EmergencyMap';

const { width } = Dimensions.get('window');

export default function AlertsScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: '1',
      type: 'earthquake',
      severity: 'high',
      title: 'Earthquake Alert',
      description: 'Magnitude 6.2 earthquake detected 15km from your location',
      distance: '15km',
      time: '2 minutes ago',
      source: 'USGS',
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: '2',
      type: 'flood',
      severity: 'medium',
      title: 'Flood Warning',
      description: 'Heavy rainfall causing flash floods in downtown area',
      distance: '8km',
      time: '15 minutes ago',
      source: 'National Weather Service',
      coordinates: { lat: 37.7849, lng: -122.4094 },
    },
  ]);

  const [userLocation, setUserLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Status */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Rakshak Alerts</Text>
          <StatusIndicator isOnline={isOnline} />
        </View>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.locationText}>San Francisco, CA</Text>
          <TouchableOpacity style={styles.updateLocationButton}>
            <Navigation size={14} color="#DC2626" />
            <Text style={styles.updateLocationText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Map Section */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Live Disaster Map</Text>
          <EmergencyMap
            alerts={activeAlerts}
            userLocation={userLocation}
            style={styles.map}
          />
        </View>

        {/* Active Alerts */}
        <View style={styles.alertsSection}>
          <View style={styles.sectionHeader}>
            <AlertCircle size={20} color="#DC2626" />
            <Text style={styles.sectionTitle}>Active Alerts</Text>
            <View style={styles.alertCount}>
              <Text style={styles.alertCountText}>{activeAlerts.length}</Text>
            </View>
          </View>

          {activeAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </View>

        {/* Emergency Actions */}
        <View style={styles.emergencyActions}>
          <Text style={styles.sectionTitle}>Emergency Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.emergencyButton}>
              <AlertCircle size={24} color="#FFFFFF" />
              <Text style={styles.emergencyButtonText}>Call 911</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <MapPin size={24} color="#DC2626" />
              <Text style={styles.secondaryButtonText}>Find Shelter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Offline Status Message */}
        {!isOnline && (
          <View style={styles.offlineMessage}>
            <WifiOff size={20} color="#F59E0B" />
            <Text style={styles.offlineText}>
              Operating in offline mode. Some features may be limited.
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 80,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  updateLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  updateLocationText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: 6,
  },
  content: {
    flex: 1,
  },
  mapSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    height: 240,
    width: '100%',
  },
  alertsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  alertCount: {
    backgroundColor: '#DC2626',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencyActions: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 56,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DC2626',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 56,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
  },
  offlineMessage: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 56,
  },
  offlineText: {
    fontSize: 16,
    color: '#92400E',
    flex: 1,
    lineHeight: 22,
  },
});