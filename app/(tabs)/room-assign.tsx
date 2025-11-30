import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock available rooms - replace with actual API call
const getAvailableRooms = () => {
  return [
    { id: '1', roomNumber: '101', bedCount: 2, status: 'Vacant' },
    { id: '2', roomNumber: '102', bedCount: 1, status: 'Vacant' },
    { id: '5', roomNumber: '205', bedCount: 1, status: 'Vacant' },
    { id: '6', roomNumber: '301', bedCount: 2, status: 'Vacant' },
  ];
};

// Mock available tenants - replace with actual API call
const getAvailableTenants = () => {
  return [
    { id: '1', name: 'Sarah Johnson', phone: '+91 98765 43210', currentRoom: '201' },
    { id: '2', name: 'Michael Chen', phone: '+91 98765 43211', currentRoom: '308' },
    { id: '3', name: 'Priya Sharma', phone: '+91 98765 43212', currentRoom: null },
    { id: '4', name: 'Raj Kumar', phone: '+91 98765 43213', currentRoom: '205' },
    { id: '5', name: 'Emily Davis', phone: '+91 98765 43214', currentRoom: '301' },
  ];
};

export default function AssignRoomScreen() {
  const { roomId, tenantId } = useLocalSearchParams<{ roomId?: string; tenantId?: string }>();
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(roomId || null);
  const [selectedTenant, setSelectedTenant] = useState<string | null>(tenantId || null);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);

  const availableRooms = getAvailableRooms();
  const availableTenants = getAvailableTenants();

  const selectedRoomData = availableRooms.find((r) => r.id === selectedRoom);
  const selectedTenantData = availableTenants.find((t) => t.id === selectedTenant);

  const handleAssign = () => {
    if (!selectedRoom || !selectedTenant) {
      Alert.alert('Error', 'Please select both a room and a tenant');
      return;
    }

    Alert.alert(
      'Assign Room',
      `Assign ${selectedTenantData?.name} to Room ${selectedRoomData?.roomNumber}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Implement API call to assign room
            console.log('Assigning tenant:', selectedTenant, 'to room:', selectedRoom);
            Alert.alert('Success', 'Room assigned successfully', [
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assign Room</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Room Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Room *</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowRoomDropdown(!showRoomDropdown);
              setShowTenantDropdown(false);
            }}>
            <Text style={[styles.dropdownText, !selectedRoom && styles.placeholderText]}>
              {selectedRoomData
                ? `Room ${selectedRoomData.roomNumber} (${selectedRoomData.bedCount} ${
                    selectedRoomData.bedCount === 1 ? 'Bed' : 'Beds'
                  })`
                : 'Select Room'}
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
                  key={room.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedRoom(room.id);
                    setShowRoomDropdown(false);
                  }}>
                  <View style={styles.dropdownItemContent}>
                    <View style={styles.roomInfoRow}>
                      <Ionicons name="home" size={20} color="#0E9F6E" />
                      <Text style={styles.dropdownItemText}>
                        Room {room.roomNumber}
                      </Text>
                    </View>
                    <Text style={styles.dropdownItemSubtext}>
                      {room.bedCount} {room.bedCount === 1 ? 'Bed' : 'Beds'} • {room.status}
                    </Text>
                  </View>
                  {selectedRoom === room.id && (
                    <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Tenant Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Tenant *</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowTenantDropdown(!showTenantDropdown);
              setShowRoomDropdown(false);
            }}>
            <Text style={[styles.dropdownText, !selectedTenant && styles.placeholderText]}>
              {selectedTenantData ? selectedTenantData.name : 'Select Tenant'}
            </Text>
            <Ionicons
              name={showTenantDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
          {showTenantDropdown && (
            <View style={styles.dropdownList}>
              {availableTenants.map((tenant) => (
                <TouchableOpacity
                  key={tenant.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedTenant(tenant.id);
                    setShowTenantDropdown(false);
                  }}>
                  <View style={styles.dropdownItemContent}>
                    <View style={styles.tenantInfoRow}>
                      <Ionicons name="person" size={20} color="#0E9F6E" />
                      <Text style={styles.dropdownItemText}>{tenant.name}</Text>
                    </View>
                    <Text style={styles.dropdownItemSubtext}>
                      {tenant.phone}
                      {tenant.currentRoom && ` • Current: Room ${tenant.currentRoom}`}
                    </Text>
                  </View>
                  {selectedTenant === tenant.id && (
                    <Ionicons name="checkmark" size={20} color="#0E9F6E" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Selected Info Card */}
        {selectedRoom && selectedTenant && (
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Assignment Summary</Text>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#0E9F6E" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Tenant</Text>
                <Text style={styles.infoValue}>{selectedTenantData?.name}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="home" size={20} color="#0E9F6E" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Room</Text>
                <Text style={styles.infoValue}>
                  Room {selectedRoomData?.roomNumber} ({selectedRoomData?.bedCount}{' '}
                  {selectedRoomData?.bedCount === 1 ? 'Bed' : 'Beds'})
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Assign Button */}
        <TouchableOpacity
          style={[
            styles.assignButton,
            (!selectedRoom || !selectedTenant) && styles.assignButtonDisabled,
          ]}
          onPress={handleAssign}
          disabled={!selectedRoom || !selectedTenant}>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.assignButtonText}>Assign Room</Text>
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
  formGroup: {
    marginBottom: 24,
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
    maxHeight: 300,
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
  roomInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tenantInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 28,
  },
  infoCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
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
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E9F6E',
    borderRadius: 12,
    paddingVertical: 16,
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
  assignButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  assignButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

