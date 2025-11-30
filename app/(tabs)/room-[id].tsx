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

// Mock room data - replace with actual API call
const getRoomData = (id: string) => {
  const rooms: Record<string, any> = {
    '1': {
      id: '1',
      roomNumber: '101',
      bedCount: 2,
      status: 'Occupied',
      rent: 15000,
      amenities: ['AC', 'Attached Bathroom', 'WiFi'],
      currentTenants: [
        {
          id: '1',
          name: 'Sarah Johnson',
          phone: '+91 98765 43210',
          joiningDate: '15/01/2024',
        },
      ],
    },
    '2': {
      id: '2',
      roomNumber: '102',
      bedCount: 1,
      status: 'Vacant',
      rent: 12000,
      amenities: ['AC', 'WiFi'],
      currentTenants: [],
    },
    '3': {
      id: '3',
      roomNumber: '103',
      bedCount: 3,
      status: 'Occupied',
      rent: 20000,
      amenities: ['AC', 'Attached Bathroom', 'WiFi', 'Refrigerator'],
      currentTenants: [
        {
          id: '2',
          name: 'Michael Chen',
          phone: '+91 98765 43211',
          joiningDate: '20/09/2024',
        },
        {
          id: '4',
          name: 'Raj Kumar',
          phone: '+91 98765 43213',
          joiningDate: '10/10/2024',
        },
      ],
    },
    '4': {
      id: '4',
      roomNumber: '105',
      bedCount: 2,
      status: 'Maintenance',
      rent: 15000,
      amenities: ['AC', 'Attached Bathroom', 'WiFi'],
      currentTenants: [],
    },
  };
  return rooms[id] || rooms['1'];
};

export default function RoomDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const room = getRoomData(id || '1');
  const [roomStatus, setRoomStatus] = useState(room.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied':
        return { bg: '#D1FAE5', text: '#0E9F6E' };
      case 'Vacant':
        return { bg: '#DBEAFE', text: '#3B82F6' };
      case 'Maintenance':
        return { bg: '#FED7AA', text: '#F97316' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const handleMarkVacant = () => {
    Alert.alert(
      'Mark Room as Vacant',
      `Are you sure you want to mark Room ${room.roomNumber} as vacant?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setRoomStatus('Vacant');
            // TODO: Update room status in API
            Alert.alert('Success', 'Room status updated to Vacant');
          },
        },
      ]
    );
  };

  const handleAssignTenant = () => {
    router.push({
      pathname: '/(tabs)/room-assign',
      params: { roomId: id },
    });
  };

  const statusColor = getStatusColor(roomStatus);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Room Info Card */}
        <View style={styles.card}>
          <View style={styles.roomHeader}>
            <View style={styles.roomIconContainer}>
              <Ionicons name="home" size={32} color="#0E9F6E" />
            </View>
            <View style={styles.roomInfo}>
              <Text style={styles.roomNumber}>Room {room.roomNumber}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                <Text style={[styles.statusText, { color: statusColor.text }]}>
                  {roomStatus}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="bed-outline" size={20} color="#6B7280" />
              <Text style={styles.infoLabel}>Bed Count</Text>
              <Text style={styles.infoValue}>
                {room.bedCount} {room.bedCount === 1 ? 'Bed' : 'Beds'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="cash-outline" size={20} color="#6B7280" />
              <Text style={styles.infoLabel}>Rent</Text>
              <Text style={styles.infoValue}>₹ {room.rent.toLocaleString('en-IN')}</Text>
            </View>
          </View>

          {room.amenities && room.amenities.length > 0 && (
            <>
              <View style={styles.divider} />
              <View style={styles.amenitiesSection}>
                <Text style={styles.sectionLabel}>Amenities</Text>
                <View style={styles.amenitiesList}>
                  {room.amenities.map((amenity: string, index: number) => (
                    <View key={index} style={styles.amenityTag}>
                      <Ionicons name="checkmark-circle" size={16} color="#0E9F6E" />
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>

        {/* Current Tenants Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Tenants</Text>

          {room.currentTenants && room.currentTenants.length > 0 ? (
            <View style={styles.tenantsList}>
              {room.currentTenants.map((tenant: any, index: number) => (
                <View key={tenant.id || index} style={styles.tenantItem}>
                  <View style={styles.tenantIconContainer}>
                    <Ionicons name="person" size={24} color="#0E9F6E" />
                  </View>
                  <View style={styles.tenantInfo}>
                    <Text style={styles.tenantName}>{tenant.name}</Text>
                    <Text style={styles.tenantPhone}>{tenant.phone}</Text>
                    <Text style={styles.tenantDate}>Joined: {tenant.joiningDate}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push({
                      pathname: '/(tabs)/tenant-[id]',
                      params: { id: tenant.id },
                    })}>
                    <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyTenants}>
              <Ionicons name="person-remove-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyTenantsText}>No tenants assigned</Text>
              <Text style={styles.emptyTenantsSubtext}>
                This room is currently {roomStatus.toLowerCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {roomStatus === 'Occupied' && (
            <TouchableOpacity style={styles.markVacantButton} onPress={handleMarkVacant}>
              <Ionicons name="home-outline" size={20} color="#3B82F6" />
              <Text style={styles.markVacantButtonText}>Mark Vacant</Text>
            </TouchableOpacity>
          )}

          {roomStatus !== 'Occupied' && (
            <TouchableOpacity style={styles.assignButton} onPress={handleAssignTenant}>
              <Ionicons name="person-add" size={20} color="#FFFFFF" />
              <Text style={styles.assignButtonText}>Assign Tenant</Text>
            </TouchableOpacity>
          )}
        </View>
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
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  roomIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomInfo: {
    flex: 1,
  },
  roomNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  amenitiesSection: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  amenityText: {
    fontSize: 12,
    color: '#0E9F6E',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  tenantsList: {
    gap: 12,
  },
  tenantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  tenantIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tenantPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  tenantDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyTenants: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTenantsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 4,
  },
  emptyTenantsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  markVacantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  markVacantButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E9F6E',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#0E9F6E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assignButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

