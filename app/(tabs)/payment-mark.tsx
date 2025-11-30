import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock tenants data - replace with actual API call
const getAvailableTenants = () => {
  return [
    { id: '1', name: 'Sarah Johnson', phone: '+91 98765 43210' },
    { id: '2', name: 'Michael Chen', phone: '+91 98765 43211' },
    { id: '3', name: 'Priya Sharma', phone: '+91 98765 43212' },
    { id: '4', name: 'Raj Kumar', phone: '+91 98765 43213' },
    { id: '5', name: 'Emily Davis', phone: '+91 98765 43214' },
  ];
};

// Mock payment data - replace with actual API call
const getPaymentData = (paymentId: string) => {
  const payments: Record<string, any> = {
    '1': {
      id: '1',
      tenantId: '1',
      tenantName: 'Sarah Johnson',
      amount: 15000,
      month: 'November',
      year: '2024',
    },
    '2': {
      id: '2',
      tenantId: '2',
      tenantName: 'Michael Chen',
      amount: 18000,
      month: 'December',
      year: '2024',
    },
  };
  return payments[paymentId] || payments['1'];
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const YEARS = ['2024', '2023', '2022', '2021', '2020'];

export default function MarkPaymentPaidScreen() {
  const { paymentId } = useLocalSearchParams<{ paymentId?: string }>();
  const router = useRouter();
  const existingPayment = paymentId ? getPaymentData(paymentId) : null;

  const [formData, setFormData] = useState({
    tenantId: existingPayment?.tenantId || '',
    month: existingPayment?.month || '',
    year: existingPayment?.year || '',
    amount: existingPayment?.amount?.toString() || '',
    paidDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '/'),
  });

  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const availableTenants = getAvailableTenants();
  const selectedTenant = availableTenants.find((t) => t.id === formData.tenantId);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.tenantId || !formData.month || !formData.year || !formData.amount || !formData.paidDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Mark Payment as Paid',
      `Confirm payment of ₹${parseInt(formData.amount).toLocaleString('en-IN')} for ${selectedTenant?.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Implement API call to mark payment as paid
            console.log('Payment marked as paid:', formData);
            Alert.alert('Success', 'Payment marked as paid successfully', [
              {
                text: 'OK',
                onPress: () => router.back(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mark Payment Paid</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Tenant Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tenant *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowTenantDropdown(!showTenantDropdown);
                setShowMonthDropdown(false);
                setShowYearDropdown(false);
              }}
              disabled={!!existingPayment}>
              <Text style={[styles.dropdownText, !formData.tenantId && styles.placeholderText]}>
                {selectedTenant ? selectedTenant.name : 'Select Tenant'}
              </Text>
              <Ionicons
                name={showTenantDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showTenantDropdown && !existingPayment && (
              <View style={styles.dropdownList}>
                {availableTenants.map((tenant) => (
                  <TouchableOpacity
                    key={tenant.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('tenantId', tenant.id);
                      setShowTenantDropdown(false);
                    }}>
                    <View style={styles.dropdownItemContent}>
                      <Text style={styles.dropdownItemText}>{tenant.name}</Text>
                      <Text style={styles.dropdownItemSubtext}>{tenant.phone}</Text>
                    </View>
                    {formData.tenantId === tenant.id && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Month Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Month *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowMonthDropdown(!showMonthDropdown);
                setShowTenantDropdown(false);
                setShowYearDropdown(false);
              }}>
              <Text style={[styles.dropdownText, !formData.month && styles.placeholderText]}>
                {formData.month || 'Select Month'}
              </Text>
              <Ionicons
                name={showMonthDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showMonthDropdown && (
              <View style={styles.dropdownList}>
                {MONTHS.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('month', month);
                      setShowMonthDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{month}</Text>
                    {formData.month === month && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Year Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Year *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowTenantDropdown(false);
                setShowMonthDropdown(false);
              }}>
              <Text style={[styles.dropdownText, !formData.year && styles.placeholderText]}>
                {formData.year || 'Select Year'}
              </Text>
              <Ionicons
                name={showYearDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showYearDropdown && (
              <View style={styles.dropdownList}>
                {YEARS.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('year', year);
                      setShowYearDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{year}</Text>
                    {formData.year === year && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Amount */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Amount *</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={formData.amount}
                onChangeText={(value) => handleInputChange('amount', value)}
              />
            </View>
          </View>

          {/* Paid Date */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Paid Date *</Text>
            <View style={styles.dateInputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#9CA3AF"
                value={formData.paidDate}
                onChangeText={(value) => handleInputChange('paidDate', value)}
              />
            </View>
            <Text style={styles.helperText}>Format: DD/MM/YYYY</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Mark as Paid</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
    fontWeight: '600',
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  dateInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E9F6E',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginTop: 8,
    shadowColor: '#0E9F6E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

