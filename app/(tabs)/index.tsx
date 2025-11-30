import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const stats = {
    totalRooms: 24,
    occupied: 18,
    vacant: 6,
    monthlyCollection: 124500,
    pendingDues: 28750,
    pendingTenants: 5,
    occupancyRate: 75,
    collectionChange: 12,
  };

  const handleQuickAction = (action: string) => {
    const router = useRouter();
    switch (action) {
      case 'tenants':
        router.push('/(tabs)/tenants');
        break;
      case 'rooms':
        router.push('/(tabs)/rooms');
        break;
      case 'complaints':
        router.push('/(tabs)/complaints');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  const handleViewDetails = () => {
    console.log('View pending dues details');
    // TODO: Navigate to pending dues screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.appTitle}>Property Manager</Text>
            <Text style={styles.subtitle}>Dashboard Overview</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={32} color="#0E9F6E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Good Morning, Alex</Text>
          <Text style={styles.greetingSubtext}>
            Here's what's happening with your properties today
          </Text>
        </View>

        {/* Stats Cards Grid */}
        <View style={styles.statsGrid}>
          {/* Total Rooms */}
          <View style={styles.statCard}>
            <Ionicons name="business-outline" size={28} color="#0E9F6E" />
            <Text style={styles.statLabel}>Total Rooms</Text>
            <Text style={styles.statValue}>{stats.totalRooms}</Text>
          </View>

          {/* Occupied Rooms */}
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={28} color="#0E9F6E" />
            <Text style={styles.statLabel}>Occupied</Text>
            <Text style={styles.statValue}>{stats.occupied}</Text>
            <Text style={styles.statSubtextGreen}>
              {stats.occupancyRate}% occupancy
            </Text>
          </View>

          {/* Vacant Rooms */}
          <View style={styles.statCard}>
            <Ionicons name="home-outline" size={28} color="#3B82F6" />
            <Text style={styles.statLabel}>Vacant Rooms</Text>
            <Text style={styles.statValue}>{stats.vacant}</Text>
            <Text style={styles.statSubtextBlue}>Available now</Text>
          </View>

          {/* Monthly Collection */}
          <View style={styles.statCard}>
            <Ionicons name="trending-up-outline" size={28} color="#0E9F6E" />
            <Text style={styles.statLabel}>Monthly Collection</Text>
            <Text style={styles.statValue}>₹ {stats.monthlyCollection.toLocaleString('en-IN')}</Text>
            <Text style={styles.statSubtextGreen}>
              +{stats.collectionChange}% from last month
            </Text>
          </View>
        </View>

        {/* Pending Dues Alert Card */}
        <View style={styles.pendingDuesCard}>
          <View style={styles.pendingDuesLeft}>
            <Ionicons name="warning" size={24} color="#DC2626" />
            <View style={styles.pendingDuesContent}>
              <Text style={styles.pendingDuesTitle}>Pending Dues</Text>
              <Text style={styles.pendingDuesAmount}>
                ₹ {stats.pendingDues.toLocaleString('en-IN')}
              </Text>
              <Text style={styles.pendingDuesSubtext}>
                From {stats.pendingTenants} tenants - Action required
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={handleViewDetails}>
            <Text style={styles.viewDetailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => handleQuickAction('tenants')}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconContainer, styles.actionIconGreen]}>
                <Ionicons name="people" size={24} color="#0E9F6E" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>View Tenants</Text>
                <Text style={styles.actionSubtitle}>Manage tenant information</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => handleQuickAction('rooms')}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconContainer, styles.actionIconBlue]}>
                <Ionicons name="home" size={24} color="#3B82F6" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>View Rooms</Text>
                <Text style={styles.actionSubtitle}>Room status and details</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => handleQuickAction('complaints')}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconContainer, styles.actionIconOrange]}>
                <Ionicons name="document-text-outline" size={24} color="#F97316" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>View Complaints</Text>
                <Text style={styles.actionSubtitle}>Track and resolve issues</Text>
              </View>
            </View>
            <View style={styles.actionRight}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3 New</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <View style={[styles.activityIconContainer, styles.activityIconGreen]}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Payment received from Sarah Johnson</Text>
              <Text style={styles.activitySubtitle}>
                Room 201 - ₹ 15,000 - 2 hours ago
              </Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={[styles.activityIconContainer, styles.activityIconOrange]}>
              <Ionicons name="construct-outline" size={24} color="#F97316" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New maintenance request</Text>
              <Text style={styles.activitySubtitle}>
                Room 105 - AC repair needed - 4 hours ago
              </Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={[styles.activityIconContainer, styles.activityIconBlue]}>
              <Ionicons name="person-add-outline" size={24} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New tenant moved in</Text>
              <Text style={styles.activitySubtitle}>
                Michael Chen - Room 308 - Yesterday
              </Text>
            </View>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0E9F6E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
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
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statSubtextGreen: {
    fontSize: 11,
    color: '#0E9F6E',
    fontWeight: '500',
  },
  statSubtextBlue: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '500',
  },
  pendingDuesCard: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  pendingDuesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  pendingDuesContent: {
    marginLeft: 12,
    flex: 1,
  },
  pendingDuesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },
  pendingDuesAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  pendingDuesSubtext: {
    fontSize: 12,
    color: '#DC2626',
  },
  viewDetailsButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewDetailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionIconGreen: {
    backgroundColor: '#D1FAE5',
  },
  actionIconBlue: {
    backgroundColor: '#DBEAFE',
  },
  actionIconOrange: {
    backgroundColor: '#FED7AA',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
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
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconGreen: {
    backgroundColor: '#D1FAE5',
  },
  activityIconOrange: {
    backgroundColor: '#FED7AA',
  },
  activityIconBlue: {
    backgroundColor: '#DBEAFE',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
});
