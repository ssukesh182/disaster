import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Shield, Download, CircleCheck as CheckCircle, Circle, FileText, Users, Phone, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ChecklistItem } from '@/components/ChecklistItem';
import { ResourceCard } from '@/components/ResourceCard';

export default function PrepareScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const emergencyChecklist = [
    {
      id: '1',
      title: 'Emergency Kit Prepared',
      description: 'Water, food, first aid, flashlight, radio',
      category: 'supplies',
    },
    {
      id: '2',
      title: 'Important Documents Secured',
      description: 'IDs, insurance, medical records in waterproof container',
      category: 'documents',
    },
    {
      id: '3',
      title: 'Family Emergency Plan',
      description: 'Meeting points, contact info, evacuation routes',
      category: 'planning',
    },
    {
      id: '4',
      title: 'Communication Plan',
      description: 'Out-of-state contact, emergency phone numbers',
      category: 'communication',
    },
    {
      id: '5',
      title: 'Home Safety Check',
      description: 'Smoke detectors, gas shutoff, escape routes',
      category: 'safety',
    },
  ];

  const resources = [
    {
      id: '1',
      title: 'First Aid Manual',
      type: 'guide',
      size: '2.5 MB',
      downloaded: true,
      icon: 'FileText',
    },
    {
      id: '2',
      title: 'Evacuation Maps',
      type: 'maps',
      size: '8.2 MB',
      downloaded: false,
      icon: 'MapPin',
    },
    {
      id: '3',
      title: 'Emergency Contacts',
      type: 'contacts',
      size: '0.5 MB',
      downloaded: true,
      icon: 'Phone',
    },
    {
      id: '4',
      title: 'Family Emergency Plan Template',
      type: 'template',
      size: '1.2 MB',
      downloaded: false,
      icon: 'Users',
    },
  ];

  const toggleChecklist = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const completedCount = checkedItems.size;
  const totalCount = emergencyChecklist.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Disaster Preparedness</Text>
          <StatusIndicator isOnline={isOnline} />
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedCount} of {totalCount} items completed
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Checklist */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color="#059669" />
            <Text style={styles.sectionTitle}>Emergency Preparedness Checklist</Text>
          </View>
          
          <View style={styles.checklist}>
            {emergencyChecklist.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                isChecked={checkedItems.has(item.id)}
                onToggle={() => toggleChecklist(item.id)}
              />
            ))}
          </View>
        </View>

        {/* Downloadable Resources */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Download size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Essential Resources</Text>
          </View>
          
          <View style={styles.resourceGrid}>
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Users size={24} color="#7C3AED" />
              <Text style={styles.actionButtonText}>Create Family Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={24} color="#DC2626" />
              <Text style={styles.actionButtonText}>Emergency Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Educational Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learn & Practice</Text>
          <View style={styles.educationCards}>
            <TouchableOpacity style={styles.educationCard}>
              <Text style={styles.educationTitle}>Earthquake Safety</Text>
              <Text style={styles.educationDescription}>
                Drop, Cover, and Hold On techniques
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.educationCard}>
              <Text style={styles.educationTitle}>Fire Safety</Text>
              <Text style={styles.educationDescription}>
                Evacuation planning and fire prevention
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.educationCard}>
              <Text style={styles.educationTitle}>Flood Response</Text>
              <Text style={styles.educationDescription}>
                Safety measures during flooding events
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  progressContainer: {
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  checklist: {
    gap: 12,
  },
  resourceGrid: {
    gap: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  educationCards: {
    gap: 12,
    marginTop: 12,
  },
  educationCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  educationDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});