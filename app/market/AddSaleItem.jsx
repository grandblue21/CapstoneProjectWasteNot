import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { COLORS, SIZES, COLLECTIONS } from '../../constants'
import Header from '../../components/common/header/Header';
import FirebaseApp from '../../helpers/FirebaseApp';
import { useRouter } from 'expo-router';
import getProfile from '../../hook/getProfile';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment/moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import getIngredients from '../../hook/getIngredients';

const AddSaleItem = () => {

    const router = useRouter();
    const { profile } = getProfile();
    const { ingredients } = getIngredients();
    const [ingredientList, setIngredientList] = useState([]);
    const [item, setItem] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [open, setOpen] = useState(false);
    const [itemImage, setItemImage] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foppenheimerusa.com%2Fwp-content%2Fthemes%2Foppenheimer%2Fassets%2Fimages%2Fproduct-placeholder.jpg&f=1&nofb=1&ipt=66fdf705465b3aaaa8e0b1458f5450cd7d60dd360b48ed5e8679d0293ce68a01&ipo=images');
    const handleItemChange = (selectedItem) => {

        // Find item
        const selected = ingredients.find(x => x.ItemId == selectedItem);

        // Check if there is match
        if (!selected) {
            return true;
        }

        // Change image
        setItemImage(selected.image);
    };
    const handleConfirm = async () => {

        try {
            
            const data = {
                item_id: item,
                Date: moment().format('YYYY-MM-DD'),
                price: price,
                item_quantity: quantity,
                Staff_id: profile.id,
                Restaurant_id: profile.adminId
            }

            // Check data
            Object.values(data).map((value) => {
                if (!value) {
                    throw 'Fill in required fields';
                }
            });
            
            // Set Firebase Instance
            const FBApp = new FirebaseApp();

            const result = await FBApp.db.insert(COLLECTIONS.market_request, data);

            // Check if added
            if (!result) {
                throw 'Failed to add market request';
            }

            // Show notif
            ToastAndroid.showWithGravity('Ingredient for Market Sale Request Added', ToastAndroid.LONG, ToastAndroid.TOP);

            // Redirect to market
            router.replace('/market/StaffMarket');
        }
        catch (error) {

            // Show notif
            ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
        }
    };

    useEffect(() => {
        setIngredientList(ingredients.map(x => ({ label: x.Item_name, value: x.ItemId })));
    }, [ingredients]);

    return <>
        <SafeAreaView style={ styles.container }>

            <Header hideTitle={ true } hideNotification={ true } showBack={{ show: true, handleBack: () => router.replace('/market/StaffMarket') }}/>

            <View style={ styles.body }>

                <View style={ styles.imageContainer }>
                    <Image src={ itemImage } style={ styles.image }></Image>
                </View>

                <View style={ styles.infoContainer }>

                    <View style={ styles.infoItem }>
                        <Text style={ { ...styles.infoLabel, width: '40%'} }>Ingredient:</Text>
                        <DropDownPicker
                            open={ open }
                            value={ item }
                            items={ ingredientList }
                            setOpen={ setOpen }
                            setValue={ setItem }
                            setItems={ setIngredientList }
                            onChangeValue={ handleItemChange }
                            placeholder="Select Ingredient"
                            style={ styles.infoInput }
                        />
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Price:</Text>
                        <TextInput style={ styles.infoInput } value={ price } placeholder="₱0.00" onChangeText={ (input) => setPrice(input) }/>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Quantity:</Text>
                        <TextInput style={ styles.infoInput } value={ quantity } placeholder="0" onChangeText={ (input) => setQuantity(input) }/>
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

export default AddSaleItem;