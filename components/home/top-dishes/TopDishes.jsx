import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants';
import { FontAwesome } from '@expo/vector-icons';

const TopDishes = () => {

    const dishes = [
        {
            image: 'https://omnivorescookbook.com/wp-content/uploads/2020/12/201113_Lumpia-Shanghai_550.jpg' 
        },
        {
            image: 'https://yummykitchentv.com/wp-content/uploads/2022/05/pork-steak-yummy-kitchen.jpg'
        },
        {
            image: 'https://panlasangpinoy.com/wp-content/uploads/2012/06/Fried-Bangus-450x270.jpg'
        },
        {
            image: 'https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_5111,h_5111,c_limit/pasta-carbonara.jpg'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Top Dishes</Text>
                <TouchableOpacity style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <FontAwesome name="chevron-right" style={styles.seeAllIcon}/>
                </TouchableOpacity>
            </View>

            <View style={styles.dishContainer}>
                <FlatList
                    data={ dishes }
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Image source={{ uri: item.image }} style={styles.dish} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                    horizontal
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: FONT.medium
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    seeAllText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        marginRight: 5
    },
    seeAllIcon: {
        fontSize: 12,
        marginTop: 2
    },
    dishContainer: {
        paddingVertical: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginBottom: 5,
        borderColor: COLORS.primary
    },
    dish: {
        height: 111,
        width: 102,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default TopDishes;