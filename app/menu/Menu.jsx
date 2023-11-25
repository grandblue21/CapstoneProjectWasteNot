import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Categories from '../../components/common/navigation/Categories';
import Header from '../../components/common/header/Header';
import { useRouter } from 'expo-router';
import Search from '../../components/home/search/Search';
import Navigation from '../../components/common/navigation/Navigation';

const Menu = () => {

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState(0);
    const categories = ['All', 'Grilled', 'Soup', 'Fried', 'Pasta', 'Dessert'];
    const menuList = [{
        category: 'Grilled',
        name: 'Lumpia',
        price: 2500,
        img: 'https://yummykitchentv.com/wp-content/uploads/2022/05/pork-steak-yummy-kitchen.jpg'
    }, {
        category: 'Soup',
        name: 'Sabaw',
        price: 2500,
        img: 'https://omnivorescookbook.com/wp-content/uploads/2020/12/201113_Lumpia-Shanghai_550.jpg'
    }];

    const [menu, setMenu] = useState(menuList);
  
    const handleCategoryChange = (index, category) => {
        setMenu(menuList.filter((x) => (
            (category != categories[0] && x.category == category) || category == categories[0]
        )));
    };
  
    return (
        <SafeAreaView style={ styles.container }>
            <Header title="Menu"/>
            <Search/>
            <View style={ styles.body }>
                <Text style={ styles.txtHeader }>All is prepared</Text>
                <View style={ styles.contentContainer }>
                    <Categories categories={ categories } onCategoryChange={ handleCategoryChange } />
                    <FlatList
                        showsVerticalScrollIndicator={ false }
                        data={ menu } 
                        keyExtractor={ (index) => index }
                        numColumns={ 2 }
                        renderItem={ ({ item }) => (
                            <View style={ styles.menuItem }>
                                <View style={ styles.menuItemContainer }>
                                <Image source={{ uri: item.img }} style={ styles.menuImage } />
                                <Text style={ styles.menuName }>{ item.name }</Text>
                                <Text style={ styles.menuPrice }>₱{ item.price }</Text>
                                </View>
                            </View>
                        ) }
                    />
                </View>
                    
                <TouchableOpacity style={ styles.plusButton } onPress={ () => router.replace('/ingredient/AddIngredient') }>
                    <View style={ styles.plusButtonInner }>
                        <AntDesign name="pluscircle" size={ 50 } color="#389F4F" />
                    </View>
                </TouchableOpacity>
            </View>

            <Navigation currentRoute="Menu"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF'
    },
    body: {
        flex: 1
    },
    txtHeader: {
        fontSize: 28,
        paddingStart: '4%',
        paddingTop: '3%',
        paddingBottom: '2%',
        fontWeight: '600',
        color: '#389F4F',
        letterSpacing: 2
    },
    contentContainer: {
        paddingHorizontal: 5
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        margin: 8
    },
    menuItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: 2,
            width: 0
        }
    },
    menuImage: {
        width: 150,
        height: 180,
        resizeMode: 'cover',
        borderRadius: 5
    },
    menuName: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
        paddingStart: "5%"
    },
    menuPrice: {
        fontSize: 12,
        color: '#389F4F',
        letterSpacing: 1,
        paddingStart: "8%",
        fontWeight: "600"
    },
    plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        width: 60,
        height: 60,
        marginBottom: 70,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    plusButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Menu;