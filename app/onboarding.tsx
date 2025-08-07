import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  MapPin,
  Bluetooth,
  HardDrive,
  Bell,
  Shield,
  ArrowRight,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to Rakshak',
    description: 'Your comprehensive disaster management companion that works online and offline to keep you safe.',
    icon: Shield,
    color: '#3B82F6',
  },
  {
    id: 2,
    title: 'Location Access',
    description: 'We need access to your location to provide accurate disaster alerts and emergency services for your area.',
    icon: MapPin,
    color: '#10B981',
    permission: 'location',
  },
  {
    id: 3,
    title: 'Push Notifications',
    description: 'Enable notifications to receive real-time disaster alerts and emergency updates even when the app is closed.',
    icon: Bell,
    color: '#F59E0B',
    permission: 'notifications',
  },
  {
    id: 4,
    title: 'Bluetooth Mesh Network',
    description: 'Enable Bluetooth to communicate with other SafeHaven users nearby when internet is unavailable.',
    description: 'Enable Bluetooth to communicate with other Rakshak users nearby when internet is unavailable.',
    icon: Bluetooth,
    color: '#6366F1',
    permission: 'bluetooth',
  },
  {
    id: 5,
    title: 'Offline Storage',
    description: 'Allow storage access to download emergency maps, guides, and resources for offline use.',
    icon: HardDrive,
    color: '#7C3AED',
    permission: 'storage',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [permissions, setPermissions] = useState({
    location: false,
    notifications: false,
    bluetooth: false,
    storage: false,
  });

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handlePermissionRequest = async (permission: string) => {
    // In a real app, you would request the actual permission here
    setPermissions(prev => ({ ...prev, [permission]: true }));
  };

  const handleNext = () => {
    if (isLastStep) {
      router.replace('/(tabs)/alerts');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/alerts');
  };

  const IconComponent = currentStepData.icon;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
        
        {currentStep > 0 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { backgroundColor: currentStepData.color }]}>
            <IconComponent size={48} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>{currentStepData.title}</Text>
        <Text style={styles.description}>{currentStepData.description}</Text>

        {currentStepData.permission && (
          <View style={styles.permissionContainer}>
            <TouchableOpacity
              style={[
                styles.permissionButton,
                permissions[currentStepData.permission as keyof typeof permissions] && styles.permissionButtonGranted,
              ]}
              onPress={() => handlePermissionRequest(currentStepData.permission!)}
            >
              <Text
                style={[
                  styles.permissionButtonText,
                  permissions[currentStepData.permission as keyof typeof permissions] && styles.permissionButtonTextGranted,
                ]}
              >
                {permissions[currentStepData.permission as keyof typeof permissions]
                  ? 'Permission Granted ✓'
                  : `Grant ${currentStepData.permission} Permission`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            currentStepData.permission && !permissions[currentStepData.permission as keyof typeof permissions] && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={currentStepData.permission && !permissions[currentStepData.permission as keyof typeof permissions]}
        >
          <Text style={styles.nextButtonText}>
            {isLastStep ? 'Get Started' : 'Continue'}
          </Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
    minHeight: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  progressDotActive: {
    backgroundColor: '#3B82F6',
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 40,
  },
  description: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  permissionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  permissionButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minWidth: '100%',
    minHeight: 56,
    justifyContent: 'center',
  },
  permissionButtonGranted: {
    backgroundColor: '#ECFDF5',
    borderColor: '#059669',
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  permissionButtonTextGranted: {
    color: '#059669',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  nextButton: {
    backgroundColor: '#DC2626',
    borderRadius: 16,
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
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});