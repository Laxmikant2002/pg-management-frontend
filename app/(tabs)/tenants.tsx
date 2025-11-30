import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Tenant {
  id: string;
  name: string;
  phone: string;
  roomNo: string;
  rent: number;
  status: 'Active' | 'Inactive';
}

// Mock data - replace with actual data from API/state
const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+91 98765 43210',
    roomNo: '201',
    rent: 15000,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    phone: '+91 98765 43211',
    roomNo: '308',
    rent: 18000,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    phone: '+91 98765 43212',
    roomNo: '105',
    rent: 12000,
    status: 'Active',
  },
  {
    id: '4',
    name: 'Raj Kumar',
    phone: '+91 98765 43213',
    roomNo: '205',
    rent: 16000,
    status: 'Inactive',
  },
  {
    id: '5',
    name: 'Emily Davis',
    phone: '+91 98765 43214',
    roomNo: '301',
    rent: 17000,
    status: 'Active',
  },
];

export default function TenantsListScreen() {
  const router = useRouter();

  const handleAddTenant = () => {
    router.push('/(tabs)/tenant-add');
  };

  const handleViewDetails = (tenantId: string) => {
    router.push(`/(tabs)/tenant-${tenantId}` as any);
  };

  const renderTenantItem = ({ item }: { item: Tenant }) => (
    <TouchableOpacity
      style={styles.tenantCard}
      onPress={() => handleViewDetails(item.id)}>
      <View style={styles.tenantHeader}>
        <View style={styles.tenantInfo}>
          <Text style={styles.tenantName}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                item.status === 'Active' ? styles.statusActive : styles.statusInactive,
              ]}>
              <Text
                style={[
                  styles.statusText,
                  item.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive,
                ]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tenantDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="home-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>Room {item.roomNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>₹ {item.rent.toLocaleString('en-IN')}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => handleViewDetails(item.id)}>
        <Text style={styles.viewDetailsButtonText}>View Details</Text>
        <Ionicons name="chevron-forward" size={18} color="#0E9F6E" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Tenants</Text>
          <Text style={styles.headerSubtitle}>Manage tenant information</Text>
        </View>
      </View>

      {/* Add Tenant Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTenant}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Tenant</Text>
        </TouchableOpacity>
      </View>

      {/* Tenants List */}
      <FlatList
        data={mockTenants}
        renderItem={renderTenantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No tenants found</Text>
            <Text style={styles.emptySubtext}>Add your first tenant to get started</Text>
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
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  addButton: {
    backgroundColor: '#0E9F6E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
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
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tenantCard: {
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
  tenantHeader: {
    marginBottom: 12,
  },
  tenantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tenantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusContainer: {
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#0E9F6E',
  },
  statusTextInactive: {
    color: '#DC2626',
  },
  tenantDetails: {
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
