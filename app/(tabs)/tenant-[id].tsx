import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock tenant data - replace with actual API call
const getTenantData = (id: string) => {
  const tenants: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+91 98765 43210',
      email: 'sarah.johnson@email.com',
      idProofType: 'Aadhaar',
      idProofNumber: 'XXXX XXXX 1234',
      joiningDate: '15/01/2024',
      roomNo: '201',
      rent: 15000,
      advancePaid: 30000,
      paidAmount: 15000,
      unpaidAmount: 0,
      isActive: true,
      paymentHistory: [
        { month: 'November 2024', amount: 15000, status: 'Paid', date: '01/11/2024' },
        { month: 'October 2024', amount: 15000, status: 'Paid', date: '01/10/2024' },
        { month: 'September 2024', amount: 15000, status: 'Paid', date: '01/09/2024' },
      ],
    },
    '2': {
      id: '2',
      name: 'Michael Chen',
      phone: '+91 98765 43211',
      email: 'michael.chen@email.com',
      idProofType: 'PAN',
      idProofNumber: 'ABCDE1234F',
      joiningDate: '20/09/2024',
      roomNo: '308',
      rent: 18000,
      advancePaid: 36000,
      paidAmount: 18000,
      unpaidAmount: 0,
      isActive: true,
      paymentHistory: [
        { month: 'November 2024', amount: 18000, status: 'Paid', date: '01/11/2024' },
        { month: 'October 2024', amount: 18000, status: 'Paid', date: '01/10/2024' },
      ],
    },
  };
  return tenants[id] || tenants['1'];
};

export default function TenantDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tenant = getTenantData(id || '1');

  const handleEdit = () => {
    // TODO: Navigate to edit screen
    console.log('Edit tenant:', tenant.id);
  };

  const handleViewPaymentHistory = () => {
    router.push({
      pathname: '/(tabs)/payment-history',
      params: { tenantId: tenant.id },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tenant Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Status Badge */}
        <View style={styles.statusSection}>
          <View
            style={[
              styles.statusBadge,
              tenant.isActive ? styles.statusActive : styles.statusInactive,
            ]}>
            <Text
              style={[
                styles.statusText,
                tenant.isActive ? styles.statusTextActive : styles.statusTextInactive,
              ]}>
              {tenant.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* Tenant Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tenant Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{tenant.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{tenant.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{tenant.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>ID Proof</Text>
                <Text style={styles.infoValue}>
                  {tenant.idProofType}: {tenant.idProofNumber}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Joining Date</Text>
                <Text style={styles.infoValue}>{tenant.joiningDate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Room Assigned Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Room Assigned</Text>
          <View style={styles.roomContainer}>
            <View style={styles.roomIconContainer}>
              <Ionicons name="home" size={32} color="#00BCD4" />
            </View>
            <View style={styles.roomInfo}>
              <Text style={styles.roomNumber}>Room {tenant.roomNo}</Text>
              <Text style={styles.roomStatus}>Currently Occupied</Text>
            </View>
          </View>
        </View>

        {/* Rent Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rent Information</Text>

          <View style={styles.rentRow}>
            <Text style={styles.rentLabel}>Monthly Rent</Text>
            <Text style={styles.rentValue}>₹ {tenant.rent.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.rentRow}>
            <Text style={styles.rentLabel}>Advance Paid</Text>
            <Text style={styles.rentValue}>₹ {tenant.advancePaid.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentStatusContainer}>
            <View style={styles.paymentStatusItem}>
              <View style={styles.paymentStatusIconGreen}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              </View>
              <View style={styles.paymentStatusContent}>
                <Text style={styles.paymentStatusLabel}>Paid</Text>
                <Text style={styles.paymentStatusValue}>
                  ₹ {tenant.paidAmount.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>

            <View style={styles.paymentStatusItem}>
              <View style={styles.paymentStatusIconRed}>
                <Ionicons name="close-circle" size={24} color="#DC2626" />
              </View>
              <View style={styles.paymentStatusContent}>
                <Text style={styles.paymentStatusLabel}>Unpaid</Text>
                <Text style={styles.paymentStatusValue}>
                  ₹ {tenant.unpaidAmount.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color="#00BCD4" />
            <Text style={styles.editButtonText}>Edit Tenant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentHistoryButton}
            onPress={handleViewPaymentHistory}>
            <Ionicons name="receipt-outline" size={20} color="#3B82F6" />
            <Text style={styles.paymentHistoryButtonText}>View Payment History</Text>
          </TouchableOpacity>
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
  statusSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#00BCD4',
  },
  statusTextInactive: {
    color: '#DC2626',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
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
  roomContainer: {
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
    marginBottom: 4,
  },
  roomStatus: {
    fontSize: 14,
    color: '#6B7280',
  },
  rentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rentLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  rentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  paymentStatusContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  paymentStatusItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  paymentStatusIconGreen: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentStatusIconRed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentStatusContent: {
    flex: 1,
  },
  paymentStatusLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  paymentStatusValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#00BCD4',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  editButtonText: {
    color: '#00BCD4',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHistoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

