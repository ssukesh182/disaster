import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, MapPin, Phone, Users, Download, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Resource {
  id: string;
  title: string;
  type: string;
  size: string;
  downloaded: boolean;
  icon: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getIcon = (iconName: string) => {
    const iconProps = { size: 20, color: '#3B82F6' };
    
    switch (iconName) {
      case 'FileText':
        return <FileText {...iconProps} />;
      case 'MapPin':
        return <MapPin {...iconProps} />;
      case 'Phone':
        return <Phone {...iconProps} />;
      case 'Users':
        return <Users {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon(resource.icon)}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{resource.title}</Text>
        <Text style={styles.size}>{resource.size}</Text>
      </View>
      
      <View style={styles.actionContainer}>
        {resource.downloaded ? (
          <View style={styles.downloadedIndicator}>
            <CheckCircle size={20} color="#059669" />
          </View>
        ) : (
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={20} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  size: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    padding: 8,
  },
  downloadedIndicator: {
    padding: 8,
  },
});