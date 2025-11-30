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

interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  month: string;
  year: string;
}

// Mock data - replace with actual data from API/state
const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'Sarah Johnson',
    amount: 15000,
    status: 'Paid',
    dueDate: '01/11/2024',
    month: 'November',
    year: '2024',
  },
  {
    id: '2',
    tenantId: '2',
    tenantName: 'Michael Chen',
    amount: 18000,
    status: 'Pending',
    dueDate: '01/12/2024',
    month: 'December',
    year: '2024',
  },
  {
    id: '3',
    tenantId: '3',
    tenantName: 'Priya Sharma',
    amount: 12000,
    status: 'Overdue',
    dueDate: '01/11/2024',
    month: 'November',
    year: '2024',
  },
  {
    id: '4',
    tenantId: '4',
    tenantName: 'Raj Kumar',
    amount: 16000,
    status: 'Pending',
    dueDate: '01/12/2024',
    month: 'December',
    year: '2024',
  },
  {
    id: '5',
    tenantId: '5',
    tenantName: 'Emily Davis',
    amount: 17000,
    status: 'Paid',
    dueDate: '01/11/2024',
    month: 'November',
    year: '2024',
  },
];

export default function PaymentsListScreen() {
  const router = useRouter();

  const handleMarkPaid = (payment: Payment) => {
    router.push({
      pathname: '/(tabs)/payment-mark',
      params: { paymentId: payment.id },
    });
  };

  const handleViewHistory = (tenantId: string) => {
    router.push({
      pathname: '/(tabs)/payment-history',
      params: { tenantId },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return { bg: '#D1FAE5', text: '#0E9F6E', icon: 'checkmark-circle' };
      case 'Pending':
        return { bg: '#FEF3C7', text: '#F59E0B', icon: 'time-outline' };
      case 'Overdue':
        return { bg: '#FEE2E2', text: '#DC2626', icon: 'alert-circle' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280', icon: 'help-circle' };
    }
  };

  const renderPaymentItem = ({ item }: { item: Payment }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <View style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <View style={styles.tenantInfo}>
            <View style={styles.tenantIconContainer}>
              <Ionicons name="person" size={24} color="#0E9F6E" />
            </View>
            <View style={styles.tenantDetails}>
              <Text style={styles.tenantName}>{item.tenantName}</Text>
              <Text style={styles.paymentPeriod}>
                {item.month} {item.year}
              </Text>
            </View>
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
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.dateText}>Due: {item.dueDate}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          {item.status !== 'Paid' && (
            <TouchableOpacity
              style={styles.markPaidButton}
              onPress={() => handleMarkPaid(item)}>
              <Ionicons name="checkmark-circle" size={18} color="#0E9F6E" />
              <Text style={styles.markPaidButtonText}>Mark Paid</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.viewHistoryButton}
            onPress={() => handleViewHistory(item.tenantId)}>
            <Ionicons name="receipt-outline" size={18} color="#3B82F6" />
            <Text style={styles.viewHistoryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const pendingPayments = mockPayments.filter((p) => p.status !== 'Paid');
  const paidPayments = mockPayments.filter((p) => p.status === 'Paid');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Payments</Text>
          <Text style={styles.headerSubtitle}>Manage rent payments</Text>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Ionicons name="time-outline" size={24} color="#F59E0B" />
          <Text style={styles.summaryValue}>{pendingPayments.length}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="checkmark-circle" size={24} color="#0E9F6E" />
          <Text style={styles.summaryValue}>{paidPayments.length}</Text>
          <Text style={styles.summaryLabel}>Paid</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="cash-outline" size={24} color="#3B82F6" />
          <Text style={styles.summaryValue}>
            ₹ {mockPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
      </View>

      {/* Payments List */}
      <FlatList
        data={mockPayments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No payments found</Text>
            <Text style={styles.emptySubtext}>Payments will appear here</Text>
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for bottom tab bar
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tenantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  tenantIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenantDetails: {
    flex: 1,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  paymentPeriod: {
    fontSize: 12,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  markPaidButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0E9F6E',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  markPaidButtonText: {
    color: '#0E9F6E',
    fontSize: 14,
    fontWeight: '600',
  },
  viewHistoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  viewHistoryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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

