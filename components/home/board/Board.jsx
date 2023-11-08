import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../../constants';
import { FontAwesome } from '@expo/vector-icons';

const Board = ({ header, data }) => {
    
    const boardItems = data ? data : [];

    return (
        boardItems.length > 0 ? 
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>{ header }</Text>
                    <TouchableOpacity>
                        <FontAwesome name={'angle-double-right'} style={styles.headerIcon}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.boardItemContainer}>
                    <FlatList
                        data={ boardItems }
                        renderItem={ ({ item }) => <Text style={styles.boardItem}>{ item }</Text> }
                        keyExtractor={(item, index) => index}
                    />
                </View>

            </View>
        : null
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.small,
        marginBottom: 10,
        borderRadius: 15
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    headerIcon: {
        fontSize: 25,
        color: 'white'
    },
    boardItemContainer: {
        padding: 5
    },
    boardItem: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    }
});

export default Board;