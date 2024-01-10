import { useEffect, useState } from 'react';
import getProfile from '../../hook/getProfile';
import getIngredients from '../../hook/getIngredients';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import Navigation from '../../components/common/navigation/Navigation';
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { COLLECTIONS, COLORS, SIZES } from '../../constants';
import FirebaseApp from '../../helpers/FirebaseApp';

const Recommendation = () => {

    const FBApp = new FirebaseApp();
    const { profile, isLoading } = getProfile();
    const { ingredients, isLoading: isLI, refetch } =  getIngredients({ column: 'Restaurant_id', comparison: '==', value: profile.adminId });
    const [recommendations, setRecommendations] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [ingredientsWStock, setIngredientsWStock] = useState([]);

    useEffect(() => {
        // Refetch if profile is loaded
        if (profile.adminId) {
            refetch();
        }
    }, [profile.adminId]);

    useEffect(() => {

        const options = {
            method: 'POST',
            url: 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'afab6284a5mshae6dd43c22e53a1p14328bjsn3e3a0c4e172d',
                'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com'
            },
                data: {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `As a Chef, write three Asian recipes using only the ingredients mentioned. I have ` + (ingredientsWStock.filter((x) => x.stock > 0).map((x) => x.Item_name).join(', ')) + `. Reply in raw aray json format: [{name: 'string', ingredients: 'array', instructions: 'array'}] after a phrase capitalized "HERE IS YOUR JSON FORMAT:"`
                    }
                ],
                temperature: 0.8
            }
        };

        const get_recommendations = async () => {

            setIngredientsWStock(await Promise.all(ingredients.map(async (ingredient) => {

                // Get History
                const history = await FBApp.db.gets(COLLECTIONS.ingredients_history, {
                    column: 'ItemId',
                    comparison: '==',
                    value: ingredient.ItemId
                });

                return { ...ingredient, stock: (history.length > 0 ? history.reduce((total, current) => total + parseInt(current.item_quantity), 0) : 0) }
            })));

            const response = await axios.request(options);
            setRecommendations('Possible recipes:');
            setRecipes(JSON.parse(response.data.choices[0].message.content.substring(response.data.choices[0].message.content.indexOf(":") + 1).trim()));
            
            // Set new recommendations
            // setRecommendations('Possible recipes:');
            // setRecipes([
            //     {
            //         "name": "Market Na Stir-Fry",
            //         "ingredients": ["Market Na", "Chicken", "Vegetables", "Soy Sauce", "Garlic", "Ginger", "Oil"],
            //         "instructions": ["Heat oil in a pan", "Add garlic and ginger, sauté until fragrant", "Add chicken and cook until browned", "Add Market Na and vegetables, stir-fry until tender", "Pour soy sauce and toss everything together", "Serve hot"]
            //     },
            //     {
            //         "name": "Asian Chicken Curry",
            //         "ingredients": ["Chicken", "Coconut Milk", "Curry Paste", "Potatoes", "Carrots", "Onion", "Garlic", "Ginger", "Fish Sauce", "Lime Juice"],
            //         "instructions": ["Heat oil in a pot", "Add garlic, ginger, and onion, sauté until softened", "Add chicken and cook until browned", "Stir in curry paste and cook for a minute", "Add coconut milk, potatoes, carrots, fish sauce, and lime juice", "Simmer until chicken is cooked and vegetables are tender", "Serve with rice"]
            //     },
            //     {
            //         "name": "Lahus Market Fried Rice",
            //         "ingredients": ["Lahus Market", "Cooked Rice", "Shrimp", "Eggs", "Carrots", "Peas", "Onion", "Garlic", "Soy Sauce", "Sesame Oil"],
            //         "instructions": ["Heat oil in a large skillet", "Add garlic and onion, sauté until fragrant", "Add shrimp and cook until pink", "Push shrimp to one side and pour beaten eggs on the other side", "Scramble eggs and mix with shrimp", "Add Lahus Market, carrots, peas, cooked rice, soy sauce, and sesame oil", "Stir-fry until well combined and heated through", "Serve hot"]
            //     },
            //     {
            //         "name": "Shrimp Pad Thai",
            //         "ingredients": ["Shrimp", "Rice Noodles", "Tofu", "Eggs", "Bean Sprouts", "Garlic", "Shallots", "Peanuts", "Fish Sauce", "Tamarind Paste", "Sugar", "Lime Juice"],
            //         "instructions": ["Soak rice noodles in hot water until softened", "Heat oil in a wok or large skillet", "Add garlic and shallots, sauté until fragrant", "Add shrimp and cook until pink", "Push shrimp to one side and pour beaten eggs on the other side", "Scramble eggs and mix with shrimp", "Add rice noodles, tofu, bean sprouts, peanuts, fish sauce, tamarind paste, sugar, and lime juice", "Stir-fry until everything is well combined and heated through", "Serve with lime wedges"]
            //     },
            //     {
            //         "name": "Chicken and Shrimp Dumplings",
            //         "ingredients": ["Chicken", "Shrimp", "Wonton Wrappers", "Garlic", "Ginger", "Soy Sauce", "Sesame Oil", "Green Onions"],
            //         "instructions": ["In a bowl, mix together chicken, shrimp, garlic, ginger, soy sauce, sesame oil, and green onions", "Place a spoonful of the mixture onto a wonton wrapper", "Moisten the edges of the wrapper with water, then fold and seal the dumpling", "Repeat with remaining mixture and wrappers", "Steam the dumplings for about 10-12 minutes", "Serve hot with dipping sauce"]
            //     }
            // ]);

            // Source 2
            // [
            //     {
            //       "name": "Market Na Stir-Fry",
            //       "ingredients": ["Market Na", "Chicken"],
            //       "instructions": ["1. Cut the chicken into small pieces.", "2. Heat oil in a pan and stir-fry the chicken until cooked.", "3. Add the Market Na and continue stir-frying for a few minutes until tender.", "4. Serve hot and enjoy!"]
            //     },
            //     {
            //       "name": "Lahus Market Soup",
            //       "ingredients": ["Lahus Market", "Chicken"],
            //       "instructions": ["1. Boil chicken in a pot of water until cooked.", "2. Add the Lahus Market and simmer for a few minutes until soft.", "3. Season with salt and pepper to taste.", "4. Serve hot as a comforting soup."]
            //     },
            //     {
            //       "name": "Shrimp Fried Rice",
            //       "ingredients": ["Shrimp", "Market Na"],
            //       "instructions": ["1. Cook the shrimp in a pan until pink and cooked through.", "2. Set aside the shrimp.", "3. In the same pan, stir-fry Market Na until tender.", "4. Add cooked rice and stir-fry for a few minutes.", "5. Finally, add the cooked shrimp and mix well.", "6. Serve hot and enjoy a delicious shrimp fried rice."]
            //     }
            //   ]
            //   HERE IS YOUR JSON FORMAT:
            //   [
            //     {
            //       "name": "Market Na Stir-Fry",
            //       "ingredients": ["Market Na", "Chicken"],
            //       "instructions": ["1. Slice the chicken into thin strips.", "2. Heat a wok or large pan over high heat.", "3. Add a tablespoon of oil to the pan and swirl to coat.", "4. Add the chicken to the pan and stir-fry until cooked through.", "5. Cut the Market Na into bite-sized pieces and add it to the pan.", "6. Continue stir-frying until the Market Na is tender.", "7. Season with your choice of stir-fry sauce or soy sauce.", "8. Serve hot and enjoy!"]
            //     },
            //     {
            //       "name": "Lahus Market Fried Rice",
            //       "ingredients": ["Lahus Market", "Chicken", "Shrimp"],
            //       "instructions": ["1. Cook the Lahus Market according to package instructions and set aside.", "2. Heat a tablespoon of oil in a large skillet or wok over medium-high heat.", "3. Add the chicken and shrimp to the skillet and cook until they are no longer pink.", "4. Push the chicken and shrimp to one side of the skillet and add cooked Lahus Market to the other side.", "5. Stir-fry for a few minutes to heat through.", "6. Mix everything together in the skillet and season with salt, pepper, and your choice of soy sauce or other seasonings.", "7. Cook for another few minutes until the flavors are well combined.", "8. Serve hot as a delicious fried rice dish!"]
            //     },
            //     {
            //       "name": "Shrimp and Market Na Soup",
            //       "ingredients": ["Market Na", "Shrimp"],
            //       "instructions": ["1. Peel and devein the shrimp, then set aside.", "2. Cut the Market Na into small pieces.", "3. Heat a pot or saucepan over medium heat and add a tablespoon of oil.", "4. Sauté the shrimp in the pot until they turn pink and are cooked through.", "5. Add the Market Na to the pot and stir-fry for a few minutes.", "6. Pour in enough water or chicken broth to cover the ingredients.", "7. Bring the soup to a boil and then reduce heat to simmer for about 10 minutes.", "8. Season the soup with salt, pepper, and any other desired seasonings.", "9. Serve hot as a comforting and flavorful shrimp and Market Na soup!"]
            //     }
            //   ]
        }

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
                        <>
                            <View style={ styles.itemContainer } key={ index }>
                                {/* Background Container */}
                                <View style={ styles.backgroundContainer }>
                                    {/* Recipe Name */}
                                    <View style={ styles.itemInfoContainer }>
                                        <View style={ styles.itemDetails }>
                                            <Text style={ styles.itemName }>{ recipe.name }</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={ { paddingLeft: 10 } } onPress={ () => {
                                        setRecipes(recipes.map((x, i) => {

                                            if (i == index) {
                                                x.visible = !x.visible;
                                            }

                                            return x;
                                        }));
                                    } }>
                                        <AntDesign name="enter" size={ 20 } color="#389F4F" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                recipe.visible &&
                                <View style={ styles.recipeContainer }>
                                    <View style={ styles.recipeNameHeader }>
                                        <Text style={ styles.ingredientLabel }>Recipe</Text>
                                        <Text style={ styles.recipeName}>{ recipe.name }</Text>
                                    </View>
                                    <View style={ styles.ingredientContainer }>
                                        <Text style={ styles.ingredientLabel }>Ingredients: </Text>
                                        {
                                            recipe.ingredients.map((ingredient, i) => (
                                                <Text key={i} style={ styles.ingredient }> - { ingredient }</Text>
                                            ))
                                        }
                                    </View>
                                    <View style={ styles.ingredientContainer }>
                                        <Text style={ styles.ingredientLabel }>Instructions: </Text>
                                        {
                                            recipe.instructions.map((instructions, i) => (
                                                <Text key={i} style={ styles.ingredient }> { !Number.isInteger(parseInt(instructions[0])) && ((i + 1 )+ '.') } { instructions }</Text>
                                            ))
                                        }
                                    </View>
                                </View>
                            }
                        </>
                    ))
                }
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
        borderRadius: 5,
        marginBottom: 10,
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