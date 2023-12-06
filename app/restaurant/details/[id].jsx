import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import Header from '../../../components/common/header/Header';
import { FONT, COLORS, SIZES, COLLECTIONS } from '../../../constants';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalSearchParams } from 'expo-router';
import FirebaseApp from '../../../helpers/FirebaseApp';

const Indent = () => '\t\t\t\t';

const Rating = ({ rate }) => {

    const MAX = 5;
    const left = MAX - rate;

    return  <>
        { Array.from({ length: rate }).map((v, i) => <FontAwesome key={ i } name="star" style={ styles.starFilled } />) }
        { Array.from({ length: left }).map((v, i) => <FontAwesome key={ i } name="star-o" style={ styles.star } />) }
    </>
}

const RestaurantDetails = () => {

    const { id } = useGlobalSearchParams();
    const router = useRouter();
    const FBApp = new FirebaseApp();
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        
        const get_restaurant = async () => {
            setRestaurant(await FBApp.db.get_from_ref(COLLECTIONS.restaurants, id));
        }

        get_restaurant();

    }, []);
    
    return (
        <SafeAreaView style={ styles.container }>

            <Header hideTitle={ true } hideNotification={ true } showBack={{ show: true, handleBack: () => router.replace(`/restaurant/market/${id}`) }}/>

            <ScrollView style={ styles.body }>

                <View style={ styles.mapContainer }>
                    <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thestatesman.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fgoogl_ED.jpg&f=1&nofb=1&ipt=ca3fae3cb793b008ec922ea8e528452c037e38229642aa1708c2ff6e37eeb50f&ipo=images' }} style={{ flex: 1 }}/>
                </View>

                <View style={ styles.restaurantContainer }>
                    <Image src={ restaurant.restaurantLogo } style={ styles.restaurantImage }/>
                    <Text style={ styles.restaurantName } numberOfLines={ 2 } ellipsizeMode="tail">{ restaurant.restaurantName }</Text>
                </View>

                <View style={ styles.restaurantInfoContainer }>
                    
                    <View style={ styles.info }>
                        <Text style={ styles.infoTitle }>About</Text>
                        <Text style={ styles.infoText }>
                            <Indent/>
                            { restaurant.restaurantDesc ?? 'Not Specified' }
                        </Text>
                    </View>

                    <View style={ styles.info }>
                        <Text style={ styles.infoTitle }>Location</Text>
                        <Text style={ styles.infoText }>
                            <Indent/>
                            { restaurant.restaurantAddress ?? 'Not Specified' }
                        </Text>
                    </View>

                    <View style={ styles.info }>
                        <Text style={ styles.infoTitle }>Ratings</Text>
                        <View style={ styles.ratingContainer }>
                            <Rating rate={ restaurant.restaurantRating } />
                        </View>
                    </View>

                </View>

            </ScrollView>
            
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
    restaurantInfoContainer: {
        flex: 1
    },
    info: {
        marginBottom: 20
    },
    infoTitle: {
        fontSize: 25,
        fontWeight: '700'
    },
    infoText: {
        fontSize: 15,
        textAlign: 'justify'
    },
    ratingContainer: {
        flexDirection: 'row',
        marginLeft: 40
    },
    star: {
        fontSize: 30,
        marginRight: 5
    },
    starFilled: {
        fontSize: 30,
        color: 'yellow',
        marginRight: 5
    }
});


export default RestaurantDetails;