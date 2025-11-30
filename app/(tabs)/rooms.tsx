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

interface Room {
  id: string;
  roomNumber: string;
  bedCount: number;
  status: 'Vacant' | 'Occupied' | 'Maintenance';
  currentTenants: string[];
}

// Mock data - replace with actual data from API/state
const mockRooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    bedCount: 2,
    status: 'Occupied',
    currentTenants: ['Sarah Johnson'],
  },
  {
    id: '2',
    roomNumber: '102',
    bedCount: 1,
    status: 'Vacant',
    currentTenants: [],
  },
  {
    id: '3',
    roomNumber: '103',
    bedCount: 3,
    status: 'Occupied',
    currentTenants: ['Michael Chen', 'Raj Kumar'],
  },
  {
    id: '4',
    roomNumber: '105',
    bedCount: 2,
    status: 'Maintenance',
    currentTenants: [],
  },
  {
    id: '5',
    roomNumber: '201',
    bedCount: 2,
    status: 'Occupied',
    currentTenants: ['Sarah Johnson'],
  },
  {
    id: '6',
    roomNumber: '205',
    bedCount: 1,
    status: 'Vacant',
    currentTenants: [],
  },
  {
    id: '7',
    roomNumber: '301',
    bedCount: 2,
    status: 'Occupied',
    currentTenants: ['Emily Davis'],
  },
  {
    id: '8',
    roomNumber: '308',
    bedCount: 2,
    status: 'Occupied',
    currentTenants: ['Michael Chen'],
  },
];

export default function RoomsListScreen() {
  const router = useRouter();

  const handleViewDetails = (roomId: string) => {
    router.push({
      pathname: '/(tabs)/room-[id]',
      params: { id: roomId },
    });
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Occupied':
        return 'people';
      case 'Vacant':
        return 'home-outline';
      case 'Maintenance':
        return 'construct';
      default:
        return 'help-circle';
    }
  };

  const renderRoomItem = ({ item }: { item: Room }) => {
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);

    return (
      <TouchableOpacity
        style={styles.roomCard}
        onPress={() => handleViewDetails(item.id)}>
        <View style={styles.roomHeader}>
          <View style={styles.roomNumberContainer}>
            <Ionicons name="home" size={24} color="#0E9F6E" />
            <Text style={styles.roomNumber}>Room {item.roomNumber}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
            <Ionicons name={statusIcon as any} size={14} color={statusColor.text} />
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.roomDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="bed-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              {item.bedCount} {item.bedCount === 1 ? 'Bed' : 'Beds'}
            </Text>
          </View>

          {item.currentTenants.length > 0 ? (
            <View style={styles.tenantsContainer}>
              <Ionicons name="people-outline" size={16} color="#6B7280" />
              <View style={styles.tenantsList}>
                <Text style={styles.tenantsLabel}>Current Tenants: </Text>
                <Text style={styles.tenantsNames}>
                  {item.currentTenants.join(', ')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.detailRow}>
              <Ionicons name="person-remove-outline" size={16} color="#9CA3AF" />
              <Text style={[styles.detailText, styles.emptyText]}>No tenants</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => handleViewDetails(item.id)}>
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={18} color="#0E9F6E" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Rooms</Text>
          <Text style={styles.headerSubtitle}>Room status and details</Text>
        </View>
      </View>

      {/* Rooms List */}
      <FlatList
        data={mockRooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="home-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No rooms found</Text>
            <Text style={styles.emptySubtext}>Add rooms to get started</Text>
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  roomCard: {
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
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  roomNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  roomNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
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
    fontSize: 12,
    fontWeight: '600',
  },
  roomDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tenantsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  tenantsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tenantsLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  tenantsNames: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
    paddingTop: 12,
  },
  viewDetailsButtonText: {
    color: '#0E9F6E',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});
