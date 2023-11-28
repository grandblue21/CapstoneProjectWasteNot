import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/common/header/Header';
import { AntDesign } from '@expo/vector-icons';
import Search from '../../components/home/search/Search';
import { useRouter } from 'expo-router';
import Categories from '../../components/common/navigation/Categories';
import Navigation from '../../components/common/navigation/Navigation';
import getIngredients from '../../hook/getIngredients';

const Inventory = () => {

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState(0);
    const categories = ['All', 'Meat', 'Vegetables', 'Spices'];
    const { ingredients, isLoading } = getIngredients();
    const inventoryList = [
        { name: 'Item 1', category: 'Meat', stock: 20, image: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1' },
        { name: 'Item 2', category: 'Vegetables', stock: 5, image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP.jpg' },
        { name: 'Item 3', category: 'Spices', stock: 0, image: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1' },
        { name: 'Item 4', category: 'Spices', stock: 8, image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP.jpg' },
        { name: 'Item 5', category: 'Vegetables', stock: 15, image: 'https://anitalianinmykitchen.com/wp-content/uploads/2020/05/pasta-sq-1-of-1-1.jpg' },
        { name: 'Item 6', category: 'Meat', stock: 0, image: 'https://embed.widencdn.net/img/beef/ng96sbyljl/800x600px/Ribeye%20Steak_Lip-on.psd?keep=c&u=7fueml' },
        { name: 'Item 7', category: 'Meat', stock: 10, image: 'https://embed.widencdn.net/img/beef/ng96sbyljl/800x600px/Ribeye%20Steak_Lip-on.psd?keep=c&u=7fueml' },
        { name: 'Item 8', category: 'Meat', stock: 5, image: 'https://anitalianinmykitchen.com/wp-content/uploads/2020/05/pasta-sq-1-of-1-1.jpg' },
        // Add more data as needed
    ];
    const [inventoryItems, setInventoryItems] = useState(inventoryList);

    const handleCategoryChange = (index, category) => {
        setSelectedCategory(index);
        setInventoryItems(inventoryList.filter((x) => (
            (category != categories[0] && x.category == category) || category == categories[0]
        )));
    };

    useEffect(() => {
        setInventoryItems(ingredients);
    }, [isLoading]);

    return (
        <View style={ styles.container }>
            <Header title="Inventory"/>
            <Search/>
            <View style={  styles.body }>
                <Text style={ styles.txtHeader }>Everything you need</Text>
                <View style={ styles.contentContainer }>
                    <Categories categories={ categories } onCategoryChange={ handleCategoryChange } />

                    {/* Header Label */}
                    <View style={ styles.headerLabelContainer }>
                        <Text style={ styles.headerLabel }>Status</Text>
                        <Text style={ styles.headerLabel }>Product Name</Text>
                        <Text style={ styles.headerLabel }>In Stock (kg)</Text>
                    </View>

                    <FlatList
                        data={ inventoryItems } 
                        keyExtractor={ (item, index) => index }
                        showsVerticalScrollIndicator={ false }
                        renderItem={ ({ item }) => (
                            <View style={ styles.itemContainer }>
                                {/* Background Container */}
                                <View style={ styles.backgroundContainer }>
                                    {/* Status Indicator */}
                                    <View
                                        style={ [
                                            styles.statusIndicator,
                                            { backgroundColor: item.stock >= 10 ? 'green' : item.stock > 0 ? 'yellow' : 'red' },
                                        ] }
                                    />
                                    {/* Item Name and Picture */}
                                    <View style={ styles.itemInfoContainer }>
                                        <Image source={{ uri: item.image }} style={ styles.itemImage } />
                                        <View style={ styles.itemDetails }>
                                            <Text style={ styles.itemName }>{ item.name }</Text>
                                        </View>
                                    </View>
                                    {/* In Stock Label with kilograms */}
                                    <Text style={ styles.inStockLabel }>{`${item.stock} kg`}</Text>
                                    <TouchableOpacity style={ { paddingLeft: 10 } }>
                                        <AntDesign name="doubleright" size={ 20 } color="#389F4F" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity style={ styles.plusButton } onPress={ () => router.replace('/ingredient/AddIngredient') }>
                    <View style={ styles.plusButtonInner }>
                        <AntDesign name="pluscircle" size={ 50 } color="#389F4F" />
                    </View>
                </TouchableOpacity>
                <Navigation currentRoute="Inventory"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    body: {
        flex: 1
    },
    txtHeader: {
        fontSize: 28,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 2,
        fontWeight: '600',
        color: '#389F4F',
        letterSpacing: 2,
    },
    contentContainer: {
        paddingHorizontal: 24
    },
    headerLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerLabel: {
        fontSize: 16,
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
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 24, // Add some space to the right of the item image
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
    },
    inStockLabel: {
        fontSize: 16,
    },
    plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    plusButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Inventory;