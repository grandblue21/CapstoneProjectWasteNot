import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { COLLECTIONS } from '../../constants';
import Navigation from '../../components/common/navigation/Navigation';
import Header from '../../components/common/header/Header';
import FirebaseApp from '../../helpers/FirebaseApp';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';

const AddIngredient = () => {
    
    const router = useRouter();
    const FBApp = new FirebaseApp();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };
    const handleBarCodeScanned = async ({ type, data }) => {

        alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        setScanned(true);

        try {
            
            await FBApp.db.insert(COLLECTIONS.ingredients, {
                id: data,
                name: data,
                category: 'Meat',
                stock: 69,
                image: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1'
            });

            router.replace('/inventory/Inventory');

            // Show notif
            ToastAndroid.showWithGravity('Ingredient Added', ToastAndroid.LONG, ToastAndroid.TOP);
        }
        catch (error) {
            setScanned(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getBarCodeScannerPermissions();
    }, []);

    // No permission yet
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }

    // Permission denied
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header hideTitle={ true } hideNotification={ true } showBack={{ show: true, handleBack: () => router.replace('/inventory/Inventory') }}/>

            <View style={styles.body}>

                <BarCodeScanner
                    onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned }
                    style={ StyleSheet.absoluteFillObject }
                />
                
                <Navigation currentRoute="Inventory"/>

            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    body: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingBottom: 5
    }
});


export default AddIngredient;