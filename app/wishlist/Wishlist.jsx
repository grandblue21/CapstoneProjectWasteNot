import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/common/header/Header';
import Search from '../../components/home/search/Search';
import { COLORS } from '../../constants';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Wishlist = () => {

    const router = useRouter();
    const wishlist = [
        {
            restaurant: 'RS1',
            ingredients: [
                {
                    name: 'Rib Eye',
                    image: 'https://marketplace.canva.com/EAFpeiTrl4c/1/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-9Gfim1S8fHg.jpg',
                    quantity: 4,
                    price: 69
                }
            ]
        },
        {
            restaurant: 'RS2',
            ingredients: [
                {
                    name: 'Rib Eye',
                    image: 'https://marketplace.canva.com/EAFpeiTrl4c/1/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-9Gfim1S8fHg.jpg',
                    quantity: 5,
                    price: 69420
                }
            ]
        }
    ];

    return (
        <SafeAreaView style={ styles.container }>

            <Header title="Wishlist"/>

            <Search/>

            <ScrollView style={ styles.body }>
                
                {
                    wishlist.map((list, index) => (
                        <View style={ styles.restaurant } key={index}>

                            <View style={ styles.restaurantContainer }>
                                <Image source={{ uri: 'https://marketplace.canva.com/EAFpeiTrl4c/1/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-9Gfim1S8fHg.jpg' }} style={ styles.restaurantImage }/>
                                <Text style={ styles.restaurantName } numberOfLines={ 2 } ellipsizeMode="tail">{ list.restaurant }</Text>
                            </View>

                            <ScrollView style={ styles.restaurantIngredients }>

                                {
                                    list.ingredients.map((ingredient, i) => (
                                        <View style={ styles.ingredient } key={i}>
                                            <Image style={ styles.ingredientImage }/>
                                            <View style={{ flex: 1 }}>
                                                <View style={ styles.ingredientHeader }>
                                                    <Text style={ styles.ingredientName }>{ ingredient.name }</Text>
                                                    <View style={ styles.actionContainer }>
                                                        <TouchableOpacity  onPress={ () => router.replace('/dashboard/Dashboard') }>
                                                            <FontAwesome name="pencil" style={ styles.editIcon } />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>
                                                            <FontAwesome name="trash" style={ styles.deleteIcon } />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <Text style={ styles.ingredientPrice }>Price: ₱ { ingredient.price } per Kg.</Text>
                                                <View style={ styles.infoContainer}>
                                                    <View style={ styles.quantityContainer }>
                                                        <TextInput style={ styles.quantity } value={ ingredient.quantity.toString() }/>
                                                    </View>
                                                    <View style={ styles.infoTotalContainer }>
                                                        <Text style={ styles.infoTotal }>/105</Text>
                                                        <Text style={ styles.infoLeft }>kg Available</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }

                            </ScrollView>

                        </View>
                    ))
                }

            </ScrollView>

            <View style={ styles.totalContainer }>
                <Text style={ styles.totalLabel }>Total:</Text>
                <Text style={ styles.total }>₱ 2350.00</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    body: {
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 80
    },
    restaurant: {
        marginBottom: 10,
    },
    restaurantContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10
    },
    restaurantImage: {
        height: 99,
        width: 99,
        borderRadius: 45,
        marginRight: 10
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: '500',
        maxWidth: '70%'
    },
    restaurantIngredients: {
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: COLORS.primary,
        minHeight: 115,
        maxHeight: 300,
        paddingVertical: 10
    },
    ingredient: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 32,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    ingredientImage: {
        height: 105,
        width: 105,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        borderRadius: 25
    },
    ingredientHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionContainer: {
        flexDirection: 'row',
    },
    editIcon: {
        color: COLORS.primary,
        fontSize: 24,
        marginRight: 5
    },
    deleteIcon: {
        color: 'red',
        fontSize: 24
    },
    ingredientName: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    ingredientPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    quantityContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 28,
        width: 57,
        marginRight: 5,
        paddingHorizontal: 10
    },
    quantity: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    infoTotalContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    infoTotal: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 5
    },
    infoLeft: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    totalContainer: {
        height: 71,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 10
    },
    totalLabel: {
        fontSize: 40,
        marginRight: 10,
        color: '#FFF',
        textShadowColor: COLORS.primary,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontWeight: '900'
    },
    total: {
        fontSize: 35,
        fontWeight: 'bold'
    }
});

export default Wishlist;