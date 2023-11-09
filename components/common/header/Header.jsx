import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import ScreenHeaderBtn from './ScreenHeaderBtn';
import { FontAwesome } from '@expo/vector-icons';
import { FONT } from '../../../constants';

const Header = ({ title }) => {
    return (
        <Stack.Screen options={{
            headerStyle: { backgroundColor: 'white' },
            headerShadowVisible: false,
            headerLeft: () => <ScreenHeaderBtn component={<FontAwesome name="bars" style={{ fontSize: 23 }} />} />,
            headerRight: () => <ScreenHeaderBtn component={<FontAwesome name="bell-o" style={{ fontSize: 23 }} />} />,
            headerTitle: () => (
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerText}>{ title }</Text>
                </View>
            )
        }}/>
    )
}

const styles = StyleSheet.create({
    headerTitleWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontFamily: FONT.medium,
        fontSize: 40,
        paddingRight: '22%'
    }
});

export default Header;