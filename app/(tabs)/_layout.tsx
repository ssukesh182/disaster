import { Tabs } from 'expo-router';
import { TriangleAlert as AlertTriangle, Shield, MessageCircle, Settings } from 'lucide-react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}>
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => (
            <AlertTriangle size={Math.max(24, width * 0.06)} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="prepare"
        options={{
          title: 'Prepare',
          tabBarIcon: ({ size, color }) => (
            <Shield size={Math.max(24, width * 0.06)} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="communicate"
        options={{
          title: 'Communicate',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={Math.max(24, width * 0.06)} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={Math.max(24, width * 0.06)} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    height: Math.max(100, height * 0.12),
    paddingTop: Math.max(16, height * 0.02),
    paddingBottom: Math.max(40, height * 0.05),
    paddingHorizontal: Math.max(12, width * 0.03),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: Math.max(14, width * 0.037),
    fontWeight: '600',
    marginTop: Math.max(8, height * 0.01),
    lineHeight: Math.max(18, width * 0.045),
  },
  tabBarIcon: {
    marginBottom: Math.max(4, height * 0.005),
  },
});