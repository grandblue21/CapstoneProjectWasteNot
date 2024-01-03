import { useEffect, useState } from 'react';
import getProfile from '../../hook/getProfile';
import getIngredients from '../../hook/getIngredients';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import Navigation from '../../components/common/navigation/Navigation';
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const Recommendation = () => {

    const { profile, isLoading } = getProfile();
    const { ingredients, isLoading: isLI, refetch } =  getIngredients({ column: 'Restaurant_id', comparison: '==', value: profile.adminId });
    const [recommendations, setRecommendations] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        // Refetch if profile is loaded
        if (profile.adminId) {
            refetch();
        }
    }, [profile.adminId]);

    useEffect(() => {

        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
            headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'afab6284a5mshae6dd43c22e53a1p14328bjsn3e3a0c4e172d',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
            },
            data: {
                messages: [{
                    role: 'user',
                    content: `As a Chef, write three recipes when I have ` + (ingredients.map((x) => x.Item_name).join(', ')) + `. Reply in raw json format: [{name: 'string', ingredients: 'array', instructions: 'array'}] after a phrase capitalized "HERE IS YOUR JSON FORMAT:"`
                }],
                system_prompt: '',
                temperature: 0.5,
                top_k: 50,
                top_p: 0.9,
                max_tokens: 2000,
                web_access: false
            }
        };

        const get_recommendations = async () => {
            const response = await axios.request(options);
            setRecommendations('Possible recipes:');
            setRecipes(JSON.parse(response.data.result.substring(response.data.result.indexOf(":") + 1).trim()));
            
            // Set new recommendations
            // setRecommendations('Possible recipes:');
            // setRecipes([
            //     {
            //     "name": "Chicken Stir Fry with Market Na",
            //     "ingredients": [
            //         "500g chicken breast",
            //         "1 bundle of Market Na",
            //         "2 cloves garlic",
            //         "1 medium onion",
            //         "2 tbsp soy sauce",
            //         "1 tbsp oyster sauce",
            //         "1 tbsp cornstarch",
            //         "1/2 cup chicken broth",
            //         "Salt and pepper to taste",
            //         "2 tbsp vegetable oil"
            //     ],
            //     "instructions": [
            //         "Slice the chicken breast into thin strips and season with salt and pepper.",
            //         "Heat 1 tbsp of vegetable oil in a pan over medium-high heat.",
            //         "Add the chicken and cook until browned and cooked through.",
            //         "Remove the chicken from the pan and set aside.",
            //         "In the same pan, add another tbsp of oil and sauté the minced garlic and chopped onion until fragrant.",
            //         "Add the Market Na and cook for 2-3 minutes.",
            //         "In a small bowl, mix together the soy sauce, oyster sauce, and cornstarch.",
            //         "Pour the sauce mixture over the Market Na and stir well.",
            //         "Add the chicken broth and bring to a simmer.",
            //         "Let the sauce thicken for a few minutes, then add the cooked chicken back into the pan.",
            //         "Stir to combine and cook for another 2-3 minutes.",
            //         "Serve hot with rice."
            //     ]
            //     },
            //     {
            //     "name": "Shrimp and Market Na Soup",
            //     "ingredients": [
            //         "500g shrimp, peeled and deveined",
            //         "1 bundle of Market Na",
            //         "2 cloves garlic",
            //         "1 medium onion",
            //         "1 liter of chicken or fish broth",
            //         "1 can of coconut milk (400ml)",
            //         "2 tbsp fish sauce",
            //         "1 tbsp soy sauce",
            //         "Salt and pepper to taste",
            //         "2 tbsp vegetable oil"
            //     ],
            //     "instructions": [
            //         "Heat 1 tbsp of vegetable oil in a large pot over medium-high heat.",
            //         "Add the minced garlic and chopped onion, cook until fragrant.",
            //         "Add the Market Na and cook for 2-3 minutes.",
            //         "Pour in the chicken or fish broth and bring to a boil.",
            //         "Once boiling, add the coconut milk, fish sauce, and soy sauce.",
            //         "Season with salt and pepper to taste.",
            //         "Add the shrimp and cook until they turn pink and are cooked through.",
            //         "Serve hot with crusty bread or steamed rice."
            //     ]
            //     },
            //     {
            //     "name": "Chicken and Shrimp Market Na Fried Rice",
            //     "ingredients": [
            //         "250g chicken breast",
            //         "250g shrimp, peeled and deveined",
            //         "1 bundle of Market Na",
            //         "2 cloves garlic",
            //         "1 medium onion",
            //         "3 cups of cooked jasmine rice",
            //         "2 tbsp soy sauce",
            //         "1 tbsp oyster sauce",
            //         "1 tbsp fish sauce",
            //         "2 tbsp vegetable oil",
            //         "2 eggs, beaten",
            //         "Salt and pepper to taste",
            //         "2 green onions, chopped (optional)"
            //     ],
            //     "instructions": [
            //         "Slice the chicken breast and shrimp into bite-sized pieces.",
            //         "Heat 1 tbsp of vegetable oil in a large pan or wok over medium-high heat.",
            //         "Add the beaten eggs and scramble until fully cooked.",
            //         "Remove the eggs from the pan and set aside.",
            //         "In the same pan, add another tbsp of oil and sauté the minced garlic and chopped onion until fragrant.",
            //         "Add the chicken and cook until browned and cooked through.",
            //         "Add the shrimp and cook until they turn pink and are cooked through.",
            //         "Add the Market Na and cook for 2-3 minutes.",
            //         "Add the cooked rice to the pan and stir well.",
            //         "In a small bowl, mix together the soy sauce, oyster sauce, and fish sauce.",
            //         "Pour the sauce mixture over the rice and stir to combine.",
            //         "Add the scrambled eggs back into the pan and stir to combine.",
            //         "Season with salt and pepper to taste and garnish with chopped green onions (if using).",
            //         "Serve hot."
            //     ]
            //     }
            // ]);
        }
        console.log(isLI);
        // Check if there are ingredients
        if (isLI) {
            setRecommendations('Analyzing ingredients and getting possible recipes...');
        }
        else if (!isLI && ingredients.length > 0) {
            get_recommendations();
        }
        else {
            setRecommendations('No ingredients available');
        }
    }, [isLI, ingredients]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={ styles.body }>
                <Text style={ styles.title }>What can I cook?</Text>
                <Text style={ styles.recommendation }>{ recommendations }</Text>
                {
                    recipes.map((recipe, index) => (
                        <View style={ styles.itemContainer } key={ index }>
                            {/* Background Container */}
                            <View style={ styles.backgroundContainer }>
                                {/* Recipe Name */}
                                <View style={ styles.itemInfoContainer }>
                                    <View style={ styles.itemDetails }>
                                        <Text style={ styles.itemName }>{ recipe.name }</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={ { paddingLeft: 10 } } onPress={ () => setRecipe(recipe) }>
                                    <AntDesign name="enter" size={ 20 } color="#389F4F" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
                {
                    recipe.name && (
                    <View style={ styles.recipeContainer }>
                        <>
                            <View style={ styles.recipeNameHeader }>
                                <Text style={ styles.ingredientLabel }>Recipe</Text>
                                <Text style={ styles.recipeName}>{ recipe.name }</Text>
                            </View>
                            <View style={ styles.ingredientContainer }>
                                <Text style={ styles.ingredientLabel }>Ingredients: </Text>
                                {
                                    recipe.ingredients.map((ingredient) => (
                                        <Text style={ styles.ingredient }> - { ingredient }</Text>
                                    ))
                                }
                            </View>
                            <View style={ styles.ingredientContainer }>
                                <Text style={ styles.ingredientLabel }>Instructions: </Text>
                                {
                                    recipe.instructions.map((instructions, i) => (
                                        <Text key={i} style={ styles.ingredient }> { i + 1 }. { instructions }</Text>
                                    ))
                                }
                            </View>
                        </>
                    </View>
                )}
            </ScrollView>

            <Navigation currentRoute="Menu"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ingredient: {
        paddingHorizontal: SIZES.small,
        color: '#FFFFFF'
    },
    ingredientLabel: {
        color: '#e3e3e3',
        fontSize: 18
    },
    ingredientContainer: {
        
    },
    recipeName: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: SIZES.small
    },
    recipeContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.medium,
        borderRadius: 5
    },
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
        fontSize: 18,
        marginBottom: 10
    },
    itemContainer: {
        marginBottom: 10,
    },
    backgroundContainer: {
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 25,
        minHeight:80,
        shadowColor: '#5A5353',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 2,
        width: 1.4,
        },
    },

    statusIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: '8%', // Add some space to the right of the status indicator
    },
    itemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Expand to take available space
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default Recommendation;