import { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { COLORS, SIZES, COLLECTIONS, CATEGORIES } from '../../../constants';
import Header from '../../../components/common/header/Header';
import FirebaseApp from '../../../helpers/FirebaseApp';
import { useRouter } from 'expo-router';
import getProfile from '../../../hook/getProfile';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment/moment';

const Ingredient = () => {

    const router = useRouter();
    const { id } = useGlobalSearchParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { profile } = getProfile();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState(CATEGORIES.map(x => ({ label: x, value: x })));

    const handleConfirm = async () => {

        try {
            
            // Set Firebase Instance
            const FBApp = new FirebaseApp();
            
            // Insert
            const result = await FBApp.db.insert(COLLECTIONS.market_request, {
                MarketId: id,
                item_Id: name,
                Category: category,
                Date: moment().format('YYYY-MM-DD'),
                price: price,
                Staff_id: profile.id
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
                        <Text style={ { ...styles.infoLabel, width: '40%'} }>Category:</Text>
                        <DropDownPicker
                            open={ open }
                            value={ category }
                            items={ items }
                            setOpen={ setOpen }
                            setValue={ setCategory }
                            setItems={ setItems }
                            style={ styles.infoInput }
                        />
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
        paddingTop: SIZES.small,
        backgroundColor: '#FFF'
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