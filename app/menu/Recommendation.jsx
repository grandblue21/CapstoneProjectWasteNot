import { useEffect, useState } from 'react';
import getProfile from '../../hook/getProfile';
import getIngredients from '../../hook/getIngredients';
import axios from 'axios';
import Navigation from '../../components/common/navigation/Navigation';
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';
import { SIZES } from '../../constants';

const Recommendation = () => {

    const { profile, isLoading } = getProfile();
    const { ingredients, isLoading: isLI, refetch } = getIngredients({ column: 'Restaurant_id', comparison: '==', value: profile.adminId });
    const [recommendations, setRecommendations] = useState('');

    useEffect(() => {
        // Refetch if profile is loaded
        if (profile.adminId) {
            refetch();
        }
    }, [profile.adminId]);

    const options = {
        method: 'POST',
        url: 'https://simple-chatgpt-api.p.rapidapi.com/ask',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'afab6284a5mshae6dd43c22e53a1p14328bjsn3e3a0c4e172d',
            'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
        },
        data: {
            question: `As a Chef, write me recipes considering I have the following ingredients: ` + (ingredients.map(x => x.Item_name).join(', '))
        }
    }

    const get_recommendations = async () => {
        const response = await axios.request(options);
        setRecommendations(response.data.answer);
    }

    useEffect(() => {

        // Check if there are ingredients
        if (ingredients.length > 0) {
            get_recommendations();
        }
        else {
            setRecommendations('No ingredients available');
        }
    }, [ingredients]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={ styles.body }>
                <Text style={ styles.title }>Recipes for Ingredients Available</Text>
                <Text style={ styles.recommendation }>{ recommendations }</Text>
            </ScrollView>

            <Navigation currentRoute="Menu"/>
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
        padding: 3,
        backgroundColor: '#FFF',
        marginBottom: 65,
        paddingBottom: 15,
        paddingHorizontal: SIZES.large
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '900'
    },
    recommendation: {
        fontSize: 18
    }
});

export default Recommendation;