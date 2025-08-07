import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TriangleAlert as AlertTriangle, Clock, MapPin, CircleCheck as CheckCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  distance: string;
  time: string;
  source: string;
  coordinates: { lat: number; lng: number };
}

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#7F1D1D';
      case 'high':
        return '#DC2626';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#059669';
      default:
        return '#6B7280';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#FEF2F2';
      case 'high':
        return '#FEF2F2';
      case 'medium':
        return '#FEF3C7';
      case 'low':
        return '#ECFDF5';
      default:
        return '#F9FAFB';
    }
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: getSeverityBg(alert.severity) }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AlertTriangle size={Math.max(24, width * 0.06)} color={getSeverityColor(alert.severity)} strokeWidth={2.5} />
          <Text style={[styles.title, { color: getSeverityColor(alert.severity) }]}>
            {alert.title}
          </Text>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) }]}>
            <Text style={styles.severityText}>{alert.severity.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.description}>{alert.description}</Text>
      
      <View style={styles.footer}>
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <MapPin size={Math.max(16, width * 0.04)} color="#6B7280" />
            <Text style={styles.metaText}>{alert.distance}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={Math.max(16, width * 0.04)} color="#6B7280" />
            <Text style={styles.metaText}>{alert.time}</Text>
          </View>
        </View>
        <View style={styles.source}>
          <CheckCircle size={Math.max(16, width * 0.04)} color="#059669" />
          <Text style={styles.sourceText}>{alert.source}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: Math.max(24, width * 0.06),
    marginBottom: Math.max(20, width * 0.05),
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
    minHeight: Math.max(140, height * 0.17),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    marginBottom: Math.max(16, height * 0.02),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(16, width * 0.04),
    minHeight: 44,
  },
  title: {
    fontSize: Math.max(18, width * 0.048),
    fontWeight: '700',
    flex: 1,
    lineHeight: Math.max(24, width * 0.06),
  },
  severityBadge: {
    paddingHorizontal: Math.max(12, width * 0.03),
    paddingVertical: Math.max(6, height * 0.008),
    borderRadius: 16,
    minHeight: Math.max(32, height * 0.04),
    minWidth: Math.max(60, width * 0.15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  severityText: {
    fontSize: Math.max(12, width * 0.032),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: Math.max(16, width * 0.042),
    color: '#374151',
    marginBottom: Math.max(20, height * 0.025),
    lineHeight: Math.max(24, width * 0.06),
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: Math.max(24, width * 0.06),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(8, width * 0.02),
    minHeight: 32,
  },
  metaText: {
    fontSize: Math.max(14, width * 0.037),
    color: '#6B7280',
    fontWeight: '500',
    lineHeight: Math.max(20, width * 0.05),
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(8, width * 0.02),
    minHeight: 32,
  },
  sourceText: {
    fontSize: Math.max(14, width * 0.037),
    color: '#059669',
    fontWeight: '600',
    lineHeight: Math.max(20, width * 0.05),
  },
});