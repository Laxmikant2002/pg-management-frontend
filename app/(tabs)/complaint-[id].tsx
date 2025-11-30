import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Helper function to find room ID by room number
const findRoomIdByNumber = (roomNumber: string): string | null => {
  const roomMapping: Record<string, string> = {
    '101': '1',
    '102': '2',
    '103': '3',
    '105': '4',
    '201': '5',
    '205': '6',
    '301': '7',
    '308': '8',
  };
  return roomMapping[roomNumber] || null;
};

// Mock complaint data - replace with actual API call
const getComplaintData = (id: string) => {
  const complaints: Record<string, any> = {
    '1': {
      id: '1',
      title: 'AC Not Working',
      description: 'AC in room 105 is not cooling properly. The temperature is not decreasing even after running for hours.',
      roomNumber: '105',
      tenantName: 'Priya Sharma',
      tenantId: '3',
      status: 'OPEN',
      createdAt: '2024-11-25T10:30:00',
      updatedAt: '2024-11-25T10:30:00',
    },
    '2': {
      id: '2',
      title: 'Water Leakage',
      description: 'Water leaking from ceiling in room 201. It started yesterday and is getting worse.',
      roomNumber: '201',
      tenantName: 'Sarah Johnson',
      tenantId: '1',
      status: 'IN_PROGRESS',
      createdAt: '2024-11-20T14:15:00',
      updatedAt: '2024-11-28T09:00:00',
    },
    '3': {
      id: '3',
      title: 'Power Outage',
      description: 'No electricity in room 308. The power went out yesterday evening.',
      roomNumber: '308',
      tenantName: 'Michael Chen',
      tenantId: '2',
      status: 'RESOLVED',
      createdAt: '2024-11-15T18:00:00',
      updatedAt: '2024-11-22T16:30:00',
    },
    '4': {
      id: '4',
      title: 'Broken Door Lock',
      description: 'Main entrance door lock is broken. Cannot secure the building properly.',
      status: 'OPEN',
      createdAt: '2024-11-28T08:00:00',
      updatedAt: '2024-11-28T08:00:00',
    },
  };
  return complaints[id] || complaints['1'];
};

export default function ComplaintDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const complaint = getComplaintData(id || '1');
  const [complaintStatus, setComplaintStatus] = useState(complaint.status);

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

  const getNextStatusOptions = (currentStatus: string) => {
    switch (currentStatus) {
      case 'OPEN':
        return [
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'RESOLVED', label: 'Resolved' },
        ];
      case 'IN_PROGRESS':
        return [{ value: 'RESOLVED', label: 'Resolved' }];
      case 'RESOLVED':
        return [
          { value: 'OPEN', label: 'Reopen' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
        ];
      default:
        return [];
    }
  };

  const handleChangeStatus = () => {
    const options = getNextStatusOptions(complaintStatus);
    
    if (options.length === 0) {
      return;
    }

    if (options.length === 1) {
      // Direct change if only one option
      Alert.alert(
        'Change Status',
        `Change complaint status to "${options[0].label}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              setComplaintStatus(options[0].value);
              // TODO: Update status in API
              Alert.alert('Success', `Status changed to ${options[0].label}`);
            },
          },
        ]
      );
    } else {
      // Show action sheet for multiple options
      Alert.alert(
        'Change Status',
        'Select new status:',
        [
          ...options.map((option) => ({
            text: option.label,
            onPress: () => {
              setComplaintStatus(option.value);
              // TODO: Update status in API
              Alert.alert('Success', `Status changed to ${option.label}`);
            },
          })),
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    }
  };

  const statusColor = getStatusColor(complaintStatus);
  const statusLabel = getStatusLabel(complaintStatus);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complaint Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Status Badge */}
        <View style={styles.statusSection}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
            <Ionicons name={statusColor.icon as any} size={20} color={statusColor.text} />
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        {/* Complaint Info Card */}
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Ionicons name="document-text" size={24} color="#00BCD4" />
            <Text style={styles.complaintTitle}>{complaint.title}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>{complaint.description}</Text>
          </View>
        </View>

        {/* Related Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Related Information</Text>

          {complaint.roomNumber && (
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="home" size={20} color="#00BCD4" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Room</Text>
                <Text style={styles.infoValue}>Room {complaint.roomNumber}</Text>
              </View>
              {complaint.roomNumber && (
                <TouchableOpacity
                  onPress={() => {
                    const roomId = findRoomIdByNumber(complaint.roomNumber!);
                    if (roomId) {
                      router.push({
                        pathname: '/(tabs)/room-[id]',
                        params: { id: roomId },
                      });
                    } else {
                      router.push('/(tabs)/rooms');
                    }
                  }}>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          )}

          {complaint.tenantName && (
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="person" size={20} color="#00BCD4" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Tenant</Text>
                <Text style={styles.infoValue}>{complaint.tenantName}</Text>
              </View>
              {complaint.tenantId && (
                <TouchableOpacity
                  onPress={() => router.push({
                    pathname: '/(tabs)/tenant-[id]',
                    params: { id: complaint.tenantId },
                  })}>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          )}

          {!complaint.roomNumber && !complaint.tenantName && (
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="information-circle" size={20} color="#6B7280" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>General Complaint</Text>
              </View>
            </View>
          )}
        </View>

        {/* Date Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Timeline</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Created</Text>
              <Text style={styles.infoValue}>
                {new Date(complaint.createdAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="time-outline" size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>
                {new Date(complaint.updatedAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Change Status Button */}
        <TouchableOpacity style={styles.changeStatusButton} onPress={handleChangeStatus}>
          <Ionicons name="sync-outline" size={20} color="#00BCD4" />
          <Text style={styles.changeStatusButtonText}>Change Status</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  complaintTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  descriptionSection: {
    marginTop: 8,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  changeStatusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#00BCD4',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
  },
  changeStatusButtonText: {
    color: '#00BCD4',
    fontSize: 16,
    fontWeight: '600',
  },
});

