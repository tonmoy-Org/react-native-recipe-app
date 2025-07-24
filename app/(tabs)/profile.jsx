import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { COLORS } from '../../constants/colors';

const ProfileScreen = () => {
    const { signOut, isLoaded } = useAuth();
    const { user } = useUser();

    const handleLogout = async () => {
        try {
            await signOut();
            console.log("User signed out");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    if (!isLoaded || !user) return null;

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.userId}>User ID: {user.id}</Text>
            <Text style={styles.email}>Email: {user.primaryEmailAddress?.emailAddress}</Text>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        backgroundColor: COLORS.border,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 12,
    },
    userId: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 6,
        textAlign: 'center',
    },
    email: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 24,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: COLORS.danger || '#ff4d4f',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    logoutText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
