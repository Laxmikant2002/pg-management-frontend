import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock tenant data - replace with actual API call
const getTenantData = (tenantId: string) => {
  const tenants: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+91 98765 43210',
    },
    '2': {
      id: '2',
      name: 'Michael Chen',
      phone: '+91 98765 43211',
    },
    '3': {
      id: '3',
      name: 'Priya Sharma',
      phone: '+91 98765 43212',
    },
  };
  return tenants[tenantId] || tenants['1'];
};

// Mock payment history - replace with actual API call
const getPaymentHistory = (tenantId: string) => {
  const histories: Record<string, any[]> = {
    '1': [
      {
        id: '1',
        month: 'November',
        year: '2024',
        amount: 15000,
        status: 'Paid',
        paidDate: '01/11/2024',
        dueDate: '01/11/2024',
      },
      {
        id: '2',
        month: 'October',
        year: '2024',
        amount: 15000,
        status: 'Paid',
        paidDate: '01/10/2024',
        dueDate: '01/10/2024',
      },
      {
        id: '3',
        month: 'September',
        year: '2024',
        amount: 15000,
        status: 'Paid',
        paidDate: '02/09/2024',
        dueDate: '01/09/2024',
      },
      {
        id: '4',
        month: 'August',
        year: '2024',
        amount: 15000,
        status: 'Paid',
        paidDate: '01/08/2024',
        dueDate: '01/08/2024',
      },
      {
        id: '5',
        month: 'July',
        year: '2024',
        amount: 15000,
        status: 'Paid',
        paidDate: '01/07/2024',
        dueDate: '01/07/2024',
      },
      {
        id: '6',
        month: 'June',
        year: '2024',
        amount: 15000,
        status: 'Paid',
        paidDate: '01/06/2024',
        dueDate: '01/06/2024',
      },
    ],
    '2': [
      {
        id: '1',
        month: 'November',
        year: '2024',
        amount: 18000,
        status: 'Paid',
        paidDate: '01/11/2024',
        dueDate: '01/11/2024',
      },
      {
        id: '2',
        month: 'October',
        year: '2024',
        amount: 18000,
        status: 'Paid',
        paidDate: '01/10/2024',
        dueDate: '01/10/2024',
      },
      {
        id: '3',
        month: 'September',
        year: '2024',
        amount: 18000,
        status: 'Pending',
        paidDate: null,
        dueDate: '01/09/2024',
      },
    ],
  };
  return histories[tenantId] || histories['1'];
};

export default function PaymentHistoryScreen() {
  const { tenantId } = useLocalSearchParams<{ tenantId: string }>();
  const router = useRouter();
  const tenant = getTenantData(tenantId || '1');
  const paymentHistory = getPaymentHistory(tenantId || '1');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return { bg: '#D1FAE5', text: '#00BCD4', icon: 'checkmark-circle' };
      case 'Pending':
        return { bg: '#FEF3C7', text: '#F59E0B', icon: 'time-outline' };
      case 'Overdue':
        return { bg: '#FEE2E2', text: '#DC2626', icon: 'alert-circle' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280', icon: 'help-circle' };
    }
  };

  const renderPaymentItem = ({ item }: { item: any }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <View style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>{item.month}</Text>
            <Text style={styles.yearText}>{item.year}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
            <Ionicons name={statusColor.icon as any} size={14} color={statusColor.text} />
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.paymentDetails}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>₹ {item.amount.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        <View style={styles.dateInfo}>
          {item.status === 'Paid' && item.paidDate && (
            <View style={styles.dateRow}>
              <Ionicons name="checkmark-circle" size={16} color="#00BCD4" />
              <Text style={styles.dateText}>Paid on: {item.paidDate}</Text>
            </View>
          )}
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.dateText}>Due: {item.dueDate}</Text>
          </View>
        </View>
      </View>
    );
  };

  const totalPaid = paymentHistory
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = paymentHistory.filter((p) => p.status !== 'Paid');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tenant Info Card */}
      <View style={styles.tenantCard}>
        <View style={styles.tenantHeader}>
          <View style={styles.tenantIconContainer}>
            <Ionicons name="person" size={32} color="#00BCD4" />
          </View>
          <View style={styles.tenantInfo}>
            <Text style={styles.tenantName}>{tenant.name}</Text>
            <Text style={styles.tenantPhone}>{tenant.phone}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹ {totalPaid.toLocaleString('en-IN')}</Text>
            <Text style={styles.statLabel}>Total Paid</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{pendingPayments.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Payment History List */}
      <FlatList
        data={paymentHistory}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.listHeader}>Monthly Payment Records</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No payment history</Text>
            <Text style={styles.emptySubtext}>Payment records will appear here</Text>
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
  tenantCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  tenantIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tenantPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Adequate padding for scrollable content
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthContainer: {
    flex: 1,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  yearText: {
    fontSize: 14,
    color: '#6B7280',
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
  paymentDetails: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  dateInfo: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
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


