import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants';
import { FontAwesome } from '@expo/vector-icons';

const Inventory = () => {

    const items = [
        {
            image: 'https://i0.wp.com/davaogroceriesonline.com/wp-content/uploads/2020/04/Hunts_Pork_Beans_230G_1024x1024.png?fit=600%2C600&ssl=1' 
        },
        {
            image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP.jpg'
        },
        {
            image: 'https://embed.widencdn.net/img/beef/ng96sbyljl/800x600px/Ribeye%20Steak_Lip-on.psd?keep=c&u=7fueml'
        },
        {
            image: 'https://anitalianinmykitchen.com/wp-content/uploads/2020/05/pasta-sq-1-of-1-1.jpg'
        }
    ];

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Inventory</Text>
                <TouchableOpacity style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <FontAwesome name="chevron-right" style={styles.seeAllIcon}/>
                </TouchableOpacity>
            </View>

            <View style={styles.inventoryContainer}>
                <FlatList
                    data={ items }
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Image source={{ uri: item.image }} style={styles.inventory} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                    horizontal
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
    inventoryContainer: {
        paddingVertical: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginBottom: 5,
        borderColor: COLORS.primary
    },
    inventory: {
        height: 111,
        width: 102,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default Inventory;