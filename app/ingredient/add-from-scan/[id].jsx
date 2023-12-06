import { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { COLORS, SIZES, COLLECTIONS } from '../../../constants';
import Header from '../../../components/common/header/Header';
import FirebaseApp from '../../../helpers/FirebaseApp';
import { useRouter } from 'expo-router';
import getProfile from '../../../hook/getProfile';

const Ingredient = () => {

    const router = useRouter();
    const { id } = useGlobalSearchParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { profile } = getProfile();
    const handleConfirm = async () => {

        try {
            
            // Set Firebase Instance
            const FBApp = new FirebaseApp();
            
            // Insert
            const result = await FBApp.db.insert(COLLECTIONS.ingredients, {
                id: id,
                name: name,
                category: 'Meat',
                price: price,
                stock: 69,
                image: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1',
                restaurantId: profile.adminId
            });

            // Check if added
            if (!result) {
                throw 'Wala ma add';
            }

            // Show notif
            ToastAndroid.showWithGravity('Ingredient Added', ToastAndroid.LONG, ToastAndroid.TOP);

            // Redirect to ingredients
            router.replace('/inventory/Inventory');
        }
        catch (error) {
            console.log(error);

            // Show notif
            ToastAndroid.showWithGravity('Failed to add ingredient', ToastAndroid.LONG, ToastAndroid.TOP);
        }
    };

    return <>
        <SafeAreaView style={ styles.container }>

            <Header hideTitle={ true } hideNotification={ true } showBack={{ show: true, handleBack: () => router.replace('/inventory/Inventory') }}/>

            <View style={ styles.body }>

                <View style={ styles.imageContainer }>
                    <View style={ styles.image }></View>
                </View>

                <View style={ styles.infoContainer }>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>ID:</Text>
                        <TextInput style={ styles.infoInput } value={ id } editable={ false }/>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Name:</Text>
                        <TextInput style={ styles.infoInput } value={ name } placeholder="Name" onChangeText={ (input) => setName(input) }/>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Price:</Text>
                        <TextInput style={ styles.infoInput } value={ price } placeholder="₱ 0.00" onChangeText={ (input) => setPrice(input) }/>
                    </View>
                </View>

                <View style={ styles.buttonContainer }>
                    <TouchableOpacity style={ styles.confirmButton } onPress={ handleConfirm }>
                        <Text style={ styles.buttonText }>Confirm</Text>
                    </TouchableOpacity> 
                </View>

            </View>

        </SafeAreaView>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.small
    },
    body: {
        flex: 1
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    image: {
        height: 187,
        width: 187,
        borderWidth: 1,
        borderRadius: 94
    },
    infoContainer: {
        flex: 1
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        marginRight: 20
    },
    infoLabel: {
        textAlign: 'right',
        textDecorationLine: 'underline',
        fontSize: 15,
        width: '20%',
        marginRight: 10
    },
    infoInput: {
        fontSize: 20,
        fontWeight: '600',
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 2,
        marginBottom: 30
    },
    confirmButton: {
        flexGrow: 1,
        borderWidth: 1,
        height: 61,
        borderColor: '#FFF',
        marginRight: 1.5,
        borderRadius: 7,
        backgroundColor: '#48B560',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '500'
    }
});

export default Ingredient;