import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Complaint {
  id: string;
  title: string;
  description: string;
  roomNumber?: string;
  tenantName?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with actual data from API/state
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'AC Not Working',
    description: 'AC in room 105 is not cooling properly',
    roomNumber: '105',
    tenantName: 'Priya Sharma',
    status: 'OPEN',
    createdAt: '2024-11-25',
    updatedAt: '2024-11-25',
  },
  {
    id: '2',
    title: 'Water Leakage',
    description: 'Water leaking from ceiling in room 201',
    roomNumber: '201',
    tenantName: 'Sarah Johnson',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-20',
    updatedAt: '2024-11-28',
  },
  {
    id: '3',
    title: 'Power Outage',
    description: 'No electricity in room 308',
    roomNumber: '308',
    tenantName: 'Michael Chen',
    status: 'RESOLVED',
    createdAt: '2024-11-15',
    updatedAt: '2024-11-22',
  },
  {
    id: '4',
    title: 'Broken Door Lock',
    description: 'Main entrance door lock is broken',
    status: 'OPEN',
    createdAt: '2024-11-28',
    updatedAt: '2024-11-28',
  },
  {
    id: '5',
    title: 'Plumbing Issue',
    description: 'Bathroom tap is not working in room 301',
    roomNumber: '301',
    tenantName: 'Emily Davis',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-26',
    updatedAt: '2024-11-29',
  },
];

export default function ComplaintsListScreen() {
  const router = useRouter();

  const handleAddComplaint = () => {
    router.push('/(tabs)/complaint-add');
  };

  const handleViewDetails = (complaintId: string) => {
    router.push({
      pathname: '/(tabs)/complaint-[id]',
      params: { id: complaintId },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return { bg: '#FEE2E2', text: '#DC2626', icon: 'alert-circle' };
      case 'IN_PROGRESS':
        return { bg: '#FEF3C7', text: '#F59E0B', icon: 'time-outline' };
      case 'RESOLVED':
        return { bg: '#D1FAE5', text: '#00BCD4', icon: 'checkmark-circle' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280', icon: 'help-circle' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'RESOLVED':
        return 'Resolved';
      default:
        return status;
    }
  };

  const renderComplaintItem = ({ item }: { item: Complaint }) => {
    const statusColor = getStatusColor(item.status);
    const statusLabel = getStatusLabel(item.status);

    return (
      <TouchableOpacity
        style={styles.complaintCard}
        onPress={() => handleViewDetails(item.id)}>
        <View style={styles.complaintHeader}>
          <View style={styles.titleContainer}>
            <Ionicons name="document-text-outline" size={20} color="#00BCD4" />
            <Text style={styles.complaintTitle}>{item.title}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
            <Ionicons name={statusColor.icon as any} size={12} color={statusColor.text} />
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        <Text style={styles.complaintDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.complaintDetails}>
          {item.roomNumber && (
            <View style={styles.detailItem}>
              <Ionicons name="home-outline" size={16} color="#6B7280" />
              <Text style={styles.detailText}>Room {item.roomNumber}</Text>
            </View>
          )}
          {item.tenantName && (
            <View style={styles.detailItem}>
              <Ionicons name="person-outline" size={16} color="#6B7280" />
              <Text style={styles.detailText}>{item.tenantName}</Text>
            </View>
          )}
          {!item.roomNumber && !item.tenantName && (
            <View style={styles.detailItem}>
              <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
              <Text style={[styles.detailText, styles.generalText]}>General Complaint</Text>
            </View>
          )}
        </View>

        <View style={styles.complaintFooter}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
            <Text style={styles.dateText}>
              {new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#6B7280" />
        </View>
      </TouchableOpacity>
    );
  };

  const openComplaints = mockComplaints.filter((c) => c.status === 'OPEN');
  const inProgressComplaints = mockComplaints.filter((c) => c.status === 'IN_PROGRESS');
  const resolvedComplaints = mockComplaints.filter((c) => c.status === 'RESOLVED');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Complaints</Text>
          <Text style={styles.headerSubtitle}>Track and resolve issues</Text>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Ionicons name="alert-circle" size={24} color="#DC2626" />
          <Text style={styles.summaryValue}>{openComplaints.length}</Text>
          <Text style={styles.summaryLabel}>Open</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="time-outline" size={24} color="#F59E0B" />
          <Text style={styles.summaryValue}>{inProgressComplaints.length}</Text>
          <Text style={styles.summaryLabel}>In Progress</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="checkmark-circle" size={24} color="#00BCD4" />
          <Text style={styles.summaryValue}>{resolvedComplaints.length}</Text>
          <Text style={styles.summaryLabel}>Resolved</Text>
        </View>
      </View>

      {/* Add Complaint Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddComplaint}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Complaints List */}
      <FlatList
        data={mockComplaints}
        renderItem={renderComplaintItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No complaints found</Text>
            <Text style={styles.emptySubtext}>Add a complaint to get started</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#00BCD4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#00BCD4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
    marginRight: 12,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  complaintDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  complaintDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  generalText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  complaintFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});


