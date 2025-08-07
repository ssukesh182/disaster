import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  Settings as SettingsIcon,
  Wifi,
  Bluetooth,
  MapPin,
  Bell,
  Moon,
  Contrast,
  Globe,
  Shield,
  Download,
  Trash2,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusIndicator } from '@/components/StatusIndicator';
import { SettingRow } from '@/components/SettingRow';

export default function SettingsScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [settings, setSettings] = useState({
    pushNotifications: true,
    locationServices: true,
    bluetoothMesh: true,
    darkMode: false,
    highContrast: false,
    autoDownload: true,
    offlineMode: false,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearCache = () => {
    // Handle cache clearing
  };

  const exportData = () => {
    // Handle data export
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Settings</Text>
          <StatusIndicator isOnline={isOnline} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Connection Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection & Privacy</Text>
          
          <SettingRow
            icon={<Bell size={20} color="#3B82F6" />}
            title="Push Notifications"
            description="Receive real-time disaster alerts"
            value={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
          />
          
          <SettingRow
            icon={<MapPin size={20} color="#10B981" />}
            title="Location Services"
            description="Required for location-based alerts"
            value={settings.locationServices}
            onToggle={() => toggleSetting('locationServices')}
          />
          
          <SettingRow
            icon={<Bluetooth size={20} color="#6366F1" />}
            title="Bluetooth Mesh Network"
            description="Enable offline peer-to-peer communication"
            value={settings.bluetoothMesh}
            onToggle={() => toggleSetting('bluetoothMesh')}
          />
        </View>

        {/* Accessibility Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          
          <SettingRow
            icon={<Moon size={20} color="#7C3AED" />}
            title="Dark Mode"
            description="Reduces eye strain in low light"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
          />
          
          <SettingRow
            icon={<Contrast size={20} color="#DC2626" />}
            title="High Contrast Mode"
            description="Improves visibility during emergencies"
            value={settings.highContrast}
            onToggle={() => toggleSetting('highContrast')}
          />
          
          <TouchableOpacity style={styles.actionRow}>
            <Globe size={20} color="#F59E0B" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Language</Text>
              <Text style={styles.actionDescription}>English (US)</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Data & Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Storage</Text>
          
          <SettingRow
            icon={<Download size={20} color="#059669" />}
            title="Auto-Download Maps"
            description="Download offline maps for your area"
            value={settings.autoDownload}
            onToggle={() => toggleSetting('autoDownload')}
          />
          
          <TouchableOpacity style={styles.actionRow} onPress={clearCache}>
            <Trash2 size={20} color="#EF4444" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Clear Cache</Text>
              <Text style={styles.actionDescription}>Free up 45.2 MB of storage</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Emergency Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Settings</Text>
          
          <TouchableOpacity style={styles.actionRow}>
            <Shield size={20} color="#7C3AED" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Emergency Contacts</Text>
              <Text style={styles.actionDescription}>Manage your emergency contact list</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionRow}>
            <MapPin size={20} color="#10B981" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Safe Locations</Text>
              <Text style={styles.actionDescription}>Set up evacuation routes and shelters</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* System Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Information</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>1.2.0</Text>
              <Text style={styles.infoLabel}>App Version</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>45.2 MB</Text>
              <Text style={styles.infoLabel}>Storage Used</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>3 days</Text>
              <Text style={styles.infoLabel}>Offline Data</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>Active</Text>
              <Text style={styles.infoLabel}>Mesh Status</Text>
            </View>
          </View>
        </View>

        {/* Legal & Support */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.linkText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.linkText}>Report an Issue</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
});