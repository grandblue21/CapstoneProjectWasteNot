import { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';
import Dashboard from './dashboard/Dashboard';
import Chatbot from './chatbot/Chatbot';
import Login from './auth/Login';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        !isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />
    )
}


{/* <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

    <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
        ),
        headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="60%"/>
        )
    }}/>

    <ScrollView style={{ flex: 1, padding: SIZES.medium }}>

        <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
                if (searchTerm) {
                    router.push(`/search/${searchTerm}`);
                }
            }}
        />

        <Popularjobs/>
        <Nearbyjobs/>

    </ScrollView>

</SafeAreaView> */}

export default App;