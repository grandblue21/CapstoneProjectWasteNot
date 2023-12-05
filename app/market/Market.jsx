import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import Header from '../../components/common/header/Header';
import { FONT, SIZES } from '../../constants';
import Search from '../../components/home/search/Search';
import Navigation from '../../components/common/navigation/Navigation';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import getRestaurants from '../../hook/getRestaurants';

const Market = () => {

    const { restaurants } = getRestaurants();

    /* const restaurants = [
        {
            image: 'https://marketplace.canva.com/EAFpeiTrl4c/1/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-9Gfim1S8fHg.jpg',
            name: 'Chef Cooking'
        },
        {
            image: 'https://marketplace.canva.com/EAFMme8qKdk/1/0/1600w/canva-modern-restaurant-bar-and-grill-food-logo-qG0JgcwrqHQ.jpg',
            name: 'Modern Restaurant'
        },
        {
            image: 'https://marketplace.canva.com/EAFYecj_1Sc/1/0/1600w/canva-cream-and-black-simple-elegant-catering-food-logo-2LPev1tJbrg.jpg',
            name: 'Simple Elegant'
        },
        {
            image: 'https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg',
            name: 'Quality Food'
        }
    ]; */

    const router = useRouter();

    return (
        <SafeAreaView style={ styles.container }>

            <Header title={ 'Market' }/>

            <View style={ styles.body }>

                <Search/>
            
                <ScrollView style={ styles.restaurantsContainer }>

                    <Text style={ styles.headerText }>Restaurants</Text>

                    {
                        restaurants.map((restaurant, index) => (
                            <TouchableOpacity key={ index } style={ styles.restaurant } onPress={ () => router.replace(`/restaurant/market/${restaurant.id}`) }>

                                <Image src={ 'https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg' } style={ styles.restaurantImage }/>

                                <Text style={ styles.restaurantName }>{ restaurant.restaurantName }</Text>

                                <View style={ styles.restaurantViewContainer }>
                                    <Text style={ styles.restaurantViewText } numberOfLines={ 1 }>Tap to View</Text>
                                    <FontAwesome name="chevron-right" style={ styles.restaurantViewIcon }/>
                                </View>
                                
                            </TouchableOpacity>
                        ))
                    }

                </ScrollView>

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
        paddingBottom: 5
    },
    restaurantsContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 10,
        marginBottom: 5
    },
    restaurant: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 12
    },
    restaurantImage: {
        width: 59,
        height: 64,
        marginRight: 10,
        borderRadius: 30
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: '600',
    },
    restaurantViewContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 10,
        marginBottom: 10
    },
    restaurantViewText: {
        fontSize: 10,
        textDecorationLine: 'underline',
        marginRight: 5,
        fontWeight: '600'
    },
    restaurantViewIcon: {
        fontSize: 7,
        marginTop: 2
    }
});


export default Market;