import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, FONT } from '../../../constants';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Navigation = ({ currentRoute, logout }) => {

    const router = useRouter();

    const [activeNavigation, setActiveNavigation] = useState(currentRoute);

    const NAVIGATIONS = [{
        icon: 'home',
        name: 'Home',
        navigate: () => router.replace('/dashboard/Dashboard')
    }, {
        icon: 'shopping-basket',
        name: 'Market',
        navigate: () => router.replace('/market/Market')
    }, {
        icon: 'wechat',
        name: 'Chat-bot',
        navigate: () => router.replace('/chatbot/Chatbot')
    }, {
        icon: 'user-circle-o',
        name: 'Profile',
        navigate: () => router.replace('/profile/Profile')
    }];

    function handlePress(selectedNavigation) {
        setActiveNavigation(selectedNavigation.name);
        selectedNavigation.navigate();
    }

    return (
        <View style={styles.container}>
            {
                NAVIGATIONS.map((nav, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(nav)}>
                        <FontAwesome name={nav.icon} style={styles.buttonIcon(nav.name, activeNavigation)} />
                        <Text style={styles.buttonText(nav.name, activeNavigation)}>{nav.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 40
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: (name, activeNav) => ({
        color: name === activeNav ? COLORS.primary : '#B1BEB4',
        fontSize: 26
    }),
    buttonText: (name, activeNav) => ({
        color: name === activeNav ? COLORS.primary : '#B1BEB4',
        fontFamily: FONT.medium,
        fontSize: 12
    })
});

export default Navigation;