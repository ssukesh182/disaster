import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Circle } from 'lucide-react-native';

interface ChecklistItemData {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  isChecked: boolean;
  onToggle: () => void;
}

export function ChecklistItem({ item, isChecked, onToggle }: ChecklistItemProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'supplies':
        return '#059669';
      case 'documents':
        return '#3B82F6';
      case 'planning':
        return '#7C3AED';
      case 'communication':
        return '#F59E0B';
      case 'safety':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={styles.checkbox}>
        {isChecked ? (
          <CheckCircle size={24} color="#059669" />
        ) : (
          <Circle size={24} color="#D1D5DB" />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, isChecked && styles.completedTitle]}>
          {item.title}
        </Text>
        <Text style={[styles.description, isChecked && styles.completedDescription]}>
          {item.description}
        </Text>
        <View style={styles.category}>
          <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(item.category) }]} />
          <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  checkbox: {
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  completedTitle: {
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  completedDescription: {
    color: '#9CA3AF',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
});