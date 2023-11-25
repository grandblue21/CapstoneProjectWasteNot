import { StyleSheet, Text, View, ScrollView , FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Categories from '../../components/common/navigation/Categories';
import { MaterialIcons,FontAwesome,AntDesign } from '@expo/vector-icons';
import Header from '../../components/common/header/Header';
import Search from '../../components/home/search/Search';
import Navigation from '../../components/common/navigation/Navigation';

const MarketScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const categories = ['All', 'Top Selling', 'Meat', 'Vegetables', 'Spices'];
    const marketItemsList = [
        { id: 1, category: 'Top Selling', name: 'LumpiaTS', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 2, category: 'Meat', name: 'LumpiaM', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 3, category: 'Meat', name: 'LumpiaM', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 4, category: 'Vegetables', name: 'LumpiaV', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 5, category: 'Spices', name: 'LumpiaS', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 6, category: 'Spices', name: 'LumpiaS', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 7, category: 'Meat', name: 'LumpiaM', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
        { id: 8, category: 'Top Selling', name: 'LumpiaTS', img: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1', price: '2,500',stock:10 },
    ];
    const [marketItems, setMarketItems] = useState(marketItemsList);

    const handleCategoryChange = (index, category) => {
        setSelectedCategory(index);
        setMarketItems(marketItemsList.filter((x) => (
            (category != categories[0] && x.category == category) || category == categories[0]
        )));
    };

    return (
        <View style={ styles.container }>
            <Header title="Market"/>
            <Search/>
            <View style={ styles.body }>
                <View style={ styles.contentContainer }>
                    <Categories categories={ categories} onCategoryChange={ handleCategoryChange } />
                    <FlatList
                        showsVerticalScrollIndicator={ false }
                        data={ marketItems }
                        keyExtractor={ (item, index) => index }
                        numColumns={ 2}
                        renderItem={ ({ item }) => (
                            <View style={ styles.marketItem }>
                                <View style={ styles.marketItemContainer }>
                                    <Image source={{ uri: item.img }} style={ styles.marketImage } />
                                    <View style={ styles.iconContainer }>
                                        <TouchableOpacity>
                                            <View style={ styles.iconBackground }>
                                            <FontAwesome name="trash-o" size={ 18 } color="#ED5E5E" style={ styles.icon } />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={ styles.iconBackground }>
                                                <MaterialIcons name="edit" size={ 18 } color="#389F4F" style={ styles.icon } />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                        <View style={ styles.itemInfoContainer }>
                                        <Text style={ styles.marketName }>{ item.name }</Text>
                                        <Text style={ styles.marketStock }>In Store: { item.stock } kg</Text>
                                    </View>
                                    <Text style={ styles.marketPrice }>₱{ item.price } per kg</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                
                <TouchableOpacity style={ styles.plusButton }>
                    <View style={ styles.plusButtonInner }>
                        <AntDesign name="pluscircle" size={ 50 } color="#389F4F" />
                    </View>
                </TouchableOpacity>

                <Navigation currentRoute="Market"/>
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
    contentContainer: {
        paddingHorizontal: 5
    },
    marketItem: {
        flex: 1,
        alignItems: 'center',
        margin: 8,
    },
    marketItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
        height: 2,
        width: 0,
        },
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    iconBackground: {
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#389F4F',
    },
    icon: {
        margin: 8,
    },
    marketImage: {
        width: 140,
        height: 180,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    itemInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    marketName: {
        fontSize: 20,
        fontWeight: '700',
    },
    marketStock: {
        paddingLeft:10,
        fontSize: 9,
        color: '#999',
    },
    marketPrice: {
        fontSize: 12,
        color: '#389F4F',
        letterSpacing: 1,
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
    }
});

export default MarketScreen;