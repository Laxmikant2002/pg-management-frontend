import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ID_PROOF_TYPES = ['Aadhaar', 'PAN', 'Driving License', 'Passport', 'Voter ID'];

export default function AddTenantScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idProofType: 'Aadhaar',
    idProofNumber: '',
    joiningDate: '',
    room: '',
    rentAmount: '',
    advancePaid: '',
    isActive: true,
  });

  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [showIdProofDropdown, setShowIdProofDropdown] = useState(false);

  // Mock rooms data
  const availableRooms = ['101', '102', '103', '201', '202', '205', '301', '308'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // TODO: Implement form submission
    console.log('Form data:', formData);
    // Navigate back after successful submission
    router.back();
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
          <Text style={styles.headerTitle}>Add Tenant</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Name */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter tenant name"
              placeholderTextColor="#9CA3AF"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          {/* Phone */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
            />
          </View>

          {/* ID Proof Type */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>ID Proof Type *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowIdProofDropdown(!showIdProofDropdown)}>
              <Text style={[styles.dropdownText, !formData.idProofType && styles.placeholderText]}>
                {formData.idProofType || 'Select ID Proof Type'}
              </Text>
              <Ionicons
                name={showIdProofDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showIdProofDropdown && (
              <View style={styles.dropdownList}>
                {ID_PROOF_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('idProofType', type);
                      setShowIdProofDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{type}</Text>
                    {formData.idProofType === type && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* ID Proof Number */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>ID Proof Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ID proof number"
              placeholderTextColor="#9CA3AF"
              value={formData.idProofNumber}
              onChangeText={(value) => handleInputChange('idProofNumber', value)}
            />
          </View>

          {/* Joining Date */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Joining Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#9CA3AF"
              value={formData.joiningDate}
              onChangeText={(value) => handleInputChange('joiningDate', value)}
            />
          </View>

          {/* Room Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Room *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowRoomDropdown(!showRoomDropdown)}>
              <Text style={[styles.dropdownText, !formData.room && styles.placeholderText]}>
                {formData.room ? `Room ${formData.room}` : 'Select Room'}
              </Text>
              <Ionicons
                name={showRoomDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showRoomDropdown && (
              <View style={styles.dropdownList}>
                {availableRooms.map((room) => (
                  <TouchableOpacity
                    key={room}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('room', room);
                      setShowRoomDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>Room {room}</Text>
                    {formData.room === room && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Rent Amount */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Rent Amount *</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter rent amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={formData.rentAmount}
                onChangeText={(value) => handleInputChange('rentAmount', value)}
              />
            </View>
          </View>

          {/* Advance Paid */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Advance Paid</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter advance amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={formData.advancePaid}
                onChangeText={(value) => handleInputChange('advancePaid', value)}
              />
            </View>
          </View>

          {/* Is Active Toggle */}
          <View style={styles.formGroup}>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleLabelContainer}>
                <Text style={styles.label}>Active Status</Text>
                <Text style={styles.toggleSubtext}>
                  {formData.isActive ? 'Tenant is active' : 'Tenant is inactive'}
                </Text>
              </View>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => handleInputChange('isActive', value)}
                trackColor={{ false: '#D1D5DB', true: '#0E9F6E' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Tenant</Text>
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
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
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
  dropdownItemText: {
    fontSize: 16,
    color: '#1F2937',
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleLabelContainer: {
    flex: 1,
  },
  toggleSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#0E9F6E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
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

