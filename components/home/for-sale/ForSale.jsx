import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants';
import { FontAwesome } from '@expo/vector-icons';

const ForSale = () => {

    const items = [
        {
            image: 'https://safeselect.ph/cdn/shop/products/BangusDagupan_1600x.jpg?v=1641871437' 
        },
        {
            image: 'https://images.freshop.com/1564405684711055235/619524125e6ebec8ed25b52df19caff8_large.png'
        },
        {
            image: 'https://embed.widencdn.net/img/beef/ng96sbyljl/800x600px/Ribeye%20Steak_Lip-on.psd?keep=c&u=7fuemlg'
        },
        {
            image: 'https://media.istockphoto.com/id/121137414/photo/small-garden-radish.jpg?s=612x612&w=0&k=20&c=jxRr1s4R4G-odm2BvPvDLuWN436086D98Ef6wiXQFQk='
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>For Sale</Text>
                <TouchableOpacity style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <FontAwesome name="chevron-right" style={styles.seeAllIcon}/>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <FlatList
                    data={ items }
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Image source={{ uri: item.image }} style={styles.item} />
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
    itemContainer: {
        paddingVertical: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginBottom: 5,
        borderColor: COLORS.primary
    },
    item: {
        height: 111,
        width: 102,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default ForSale;