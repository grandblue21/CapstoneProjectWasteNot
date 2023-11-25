import { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, ToastAndroid, Button } from 'react-native';
import { COLORS, FONT, SIZES, COLLECTIONS } from '../../constants';
import Search from '../../components/home/search/Search';
import Navigation from '../../components/common/navigation/Navigation';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/common/header/Header';
import axios from 'axios';
import FirebaseApp from '../../helpers/FirebaseApp';
import getProfile from '../../hook/getProfile';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';

const AddIngredient = () => {
    
    /* return (
        <SafeAreaView style={styles.container}>

            <Header title={ 'Chatbot' }/>

            <View style={styles.body}>

                

            </View>

            <Navigation currentRoute={ 'Chat-bot' } />
            
        </SafeAreaView>
    ) */
    const router = useRouter();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header hideTitle={ true } hideNotification={ true } showBack={{ show: true, handleBack: () => router.replace('/menu/Menu') }}/>

            <View style={styles.body}>

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {/* {scanned && <Button title={'Tap to Scan Again'} onPress={ () => setScanned(false) } />} */}

            </View>

            <Navigation currentRoute={ 'Chat-bot' } />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.xLarge,
        backgroundColor: '#FFF'
    },
    body: {
        flex: 1,
        backgroundColor: '#FFF',
        marginBottom: 75,
        paddingBottom: 5
    },
    convoContainer: {
        flexGrow: 1,
        backgroundColor: '#F4EDED',
        borderColor: COLORS.primary,
        borderWidth: 1,
        paddingVertical: 14,
        paddingHorizontal: 8,
        marginBottom: 30
    },
    chatImage: (isBot) => {
        return isBot ? {
            height: 71,
            width: 71,
            marginRight: 6
        } : {
            height: 71,
            width: 71,
            marginLeft: 6
        }
    },
    chatItem: (isBot) => {
        return isBot ? {
            flexDirection: 'row',
            marginBottom: 25
        } : {
            flexDirection: 'row-reverse',   
            marginBottom: 25,
            justifyContent: 'flex-end'
        }
    },
    chatTextContainer: {
        flex: 1,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#FFF',
        paddingVertical: 25,
        paddingHorizontal: 16,
        maxWidth: '80%'
    },
    chatText: (isBot) => {
        return isBot ? {
            fontSize: 15,
            fontWeight: '900',
        } : {
            fontSize: 15,
            fontWeight: '900',
            textAlign: 'right'
        }
    },
    chatInputWrapper: {
        backgroundColor: COLORS.primary,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 115,
        borderRadius: 25
    },
    chatInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#ECECEC',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 0,
        marginBottom: 62,
        marginHorizontal: 7
    },
    chatInput: {
        flex: 1,
        height: 46,
        fontSize: 20,
        fontWeight: '900',
        paddingHorizontal: 10
    },
    chatInputIcon: {
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default AddIngredient;