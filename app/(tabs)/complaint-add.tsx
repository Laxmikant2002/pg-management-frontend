import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock tenants and rooms data - replace with actual API calls
const getAvailableTenants = () => {
  return [
    { id: '1', name: 'Sarah Johnson', roomNumber: '201' },
    { id: '2', name: 'Michael Chen', roomNumber: '308' },
    { id: '3', name: 'Priya Sharma', roomNumber: '105' },
    { id: '4', name: 'Raj Kumar', roomNumber: '205' },
    { id: '5', name: 'Emily Davis', roomNumber: '301' },
  ];
};

const getAvailableRooms = () => {
  return ['101', '102', '103', '105', '201', '202', '205', '301', '308'];
};

export default function AddComplaintScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roomId: '',
    tenantId: '',
    status: 'OPEN',
  });

  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);

  const availableTenants = getAvailableTenants();
  const availableRooms = getAvailableRooms();

  const selectedTenant = availableTenants.find((t) => t.id === formData.tenantId);
  const selectedRoom = formData.roomId;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      // TODO: Show error alert
      console.log('Title and Description are required');
      return;
    }

    // TODO: Implement API call to create complaint
    console.log('Complaint data:', formData);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Complaint</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter complaint title"
              placeholderTextColor="#9CA3AF"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter complaint description"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
            />
          </View>

          {/* Room Selection (Optional) */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Room (Optional)</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowRoomDropdown(!showRoomDropdown);
                setShowTenantDropdown(false);
              }}>
              <Text style={[styles.dropdownText, !formData.roomId && styles.placeholderText]}>
                {selectedRoom ? `Room ${selectedRoom}` : 'Select Room (Optional)'}
              </Text>
              <Ionicons
                name={showRoomDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showRoomDropdown && (
              <View style={styles.dropdownList}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleInputChange('roomId', '');
                    setShowRoomDropdown(false);
                  }}>
                  <Text style={styles.dropdownItemText}>None (General Complaint)</Text>
                  {!formData.roomId && (
                    <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                  )}
                </TouchableOpacity>
                {availableRooms.map((room) => (
                  <TouchableOpacity
                    key={room}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('roomId', room);
                      setShowRoomDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>Room {room}</Text>
                    {formData.roomId === room && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Tenant Selection (Optional) */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tenant (Optional)</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowTenantDropdown(!showTenantDropdown);
                setShowRoomDropdown(false);
              }}>
              <Text style={[styles.dropdownText, !formData.tenantId && styles.placeholderText]}>
                {selectedTenant ? selectedTenant.name : 'Select Tenant (Optional)'}
              </Text>
              <Ionicons
                name={showTenantDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showTenantDropdown && (
              <View style={styles.dropdownList}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleInputChange('tenantId', '');
                    setShowTenantDropdown(false);
                  }}>
                  <Text style={styles.dropdownItemText}>None</Text>
                  {!formData.tenantId && (
                    <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                  )}
                </TouchableOpacity>
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
                      <Text style={styles.dropdownItemSubtext}>Room {tenant.roomNumber}</Text>
                    </View>
                    {formData.tenantId === tenant.id && (
                      <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Status Info */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
            <Text style={styles.infoText}>
              Status will be set to <Text style={styles.infoBold}>OPEN</Text> by default
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Add Complaint</Text>
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
  textArea: {
    minHeight: 120,
    paddingTop: 12,
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    padding: 12,
    gap: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    flex: 1,
  },
  infoBold: {
    fontWeight: '600',
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

