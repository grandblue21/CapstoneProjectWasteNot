import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import Header from '../../../components/common/header/Header';
import { FONT, COLORS, SIZES, COLLECTIONS, CATEGORIES } from '../../../constants';
import Navigation from '../../../components/common/navigation/Navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import Categories from '../../../components/common/navigation/Categories';
import { useGlobalSearchParams } from 'expo-router';
import FirebaseApp from '../../../helpers/FirebaseApp';
import getIngredients from '../../../hook/getIngredients';

const Restaurant = () => {

    const { id } = useGlobalSearchParams();
    const router = useRouter();
    const FBApp = new FirebaseApp();
    const [restaurant, setRestaurant] = useState({});
    const { ingredients } = getIngredients({
        column: 'restaurantId',
        comparison: '==',
        value: restaurant.id
    });
    const [ingredientList, setIngredientList] = useState(ingredients);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const handleCategoryChange = (index, category) => {
        setSelectedCategory(index);
        setIngredientList(ingredients.filter((x) => (
            (category != 'All' && x.category == category) || category == 'All'
        )));
    };

    // Restaurant Use Effect
    useEffect(() => {
        const fetch_data = async () => {
            setRestaurant(await FBApp.db.get_from_ref(COLLECTIONS.restaurants, id));
        }

        fetch_data();
    }, []);

    // Ingredients Use Effect
    useEffect(() => {
        const fetch_data = async () => {
            setIngredientList(ingredients);
        }

        fetch_data();
    }, [ingredients]);
    
    return (
        <SafeAreaView style={ styles.container }>

            <Header title={ 'Market' } showBack={{ show: true, handleBack: () => router.replace('/market/Market') }}/>

            <View style={ styles.body }>

                <View style={ styles.mapContainer }>
                    <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thestatesman.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fgoogl_ED.jpg&f=1&nofb=1&ipt=ca3fae3cb793b008ec922ea8e528452c037e38229642aa1708c2ff6e37eeb50f&ipo=images' }} style={{ flex: 1 }}/>
                </View>

                <TouchableOpacity style={ styles.restaurantContainer } onPress={ () => router.replace(`/restaurant/details/${id}`) }>
                    <Image src={ restaurant.restaurantLogo } style={ styles.restaurantImage }/>
                    <Text style={ styles.restaurantName } numberOfLines={ 2 } ellipsizeMode="tail">{ restaurant.restaurantName }</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <View style={ {marginBottom: 10 }}>
                        <Categories categories={ ['All', ...CATEGORIES] } onCategoryChange={ handleCategoryChange } />
                    </View>

                    <ScrollView style={ styles.restaurantIngredientsContainer }>
                    
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
                        {
                            ingredientList.map((ingredient, index) => (
                                <TouchableOpacity key={ index } style={ styles.restaurantIngredient } onPress={ () => router.push('/restaurant/IngredientCart') }>

                                    <Image source={{ uri: ingredient.image }} style={ styles.ingredientImage }/>

                                    <View style={ styles.ingredientInfoContainer }>
                                        <View style={ styles.ingredientNameContainer }>
                                            <Text style={ styles.ingredientName } numberOfLines={ 1 } ellipsizeMode="tail">{ ingredient.name }</Text>
                                            <Text style={ styles.ingredientLeft }>In store: { ingredient.quantity }kg</Text>
                                        </View>
                                        <View style={ styles.ingredientPriceContainer }>
                                            <Text style={ styles.ingredientPrice }>₱{ ingredient.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) }</Text>
                                            <Text style={ styles.ingredientPricePer }>per kg</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            ))
                        }
                        </View>

                    </ScrollView>
                </View>
            </View>

            <Navigation currentRoute={ 'Market' } />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    body: {
        flex: 1,
        padding: SIZES.medium,
        height: 100,
        marginBottom: 60,
        paddingBottom: 5,
        paddingVertical: 10
    },
    mapContainer: {
        height: 183,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 28,
        overflow: 'hidden'
    },
    restaurantContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    restaurantImage: {
        height: 82,
        width: 90,
        borderRadius: 45,
        marginRight: 10
    },
    restaurantName: {
        fontSize: 23,
        fontWeight: '500',
        maxWidth: '70%'
    },
    restaurantIngredientsContainer: {
        flex: 1
    },
    restaurantIngredient: {
        height: 183,
        width: 135,
        marginBottom: 15
    },
    ingredientImage: {
        height: 140,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: 9,
    },
    ingredientNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10
    },
    ingredientName: {
        fontSize: 15,
        fontWeight: '700',
        maxWidth: 80
    },
    ingredientLeft: {
        fontSize: 12,
        color: '#928D8D'
    },
    ingredientPriceContainer: {
        paddingLeft: 15
    },
    ingredientPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.primary
    },
    ingredientPricePer: {

    }
});


export default Restaurant;