import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ScreenHeaderBtn } from '../../components';
import { COLORS, FONT, icons, images, SIZES } from '../../constants';
import Search from '../../components/home/search/Search';
import Board from '../../components/home/board/Board';
import TopDishes from '../../components/home/top-dishes/TopDishes';
import Inventory from '../../components/home/inventory/Inventory';
import SaleItems from '../../components/home/sale-items/SaleItems';
import Navigation from '../../components/common/navigation/Navigation';
import { FontAwesome } from '@expo/vector-icons';

const Dashboard = ({ setIsLoggedIn }) => {

    const router = useRouter();

    const data = Array.from({ length: 5 });
    
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Stack.Screen options={{
                headerStyle: { backgroundColor: 'white' },
                headerShadowVisible: false,
                headerLeft: () => <ScreenHeaderBtn component={<FontAwesome name="bars" style={{ fontSize: 23 }} />} />,
                headerRight: () => <ScreenHeaderBtn component={<FontAwesome name="bell-o" style={{ fontSize: 23 }} />} />,
                headerTitle: () => (
                    <View style={styles.headerTitleWrapper}>
                        <Text style={styles.headerText}>Home</Text>
                    </View>
                )
            }}/>

            <ScrollView style={styles.body}>

                <Search/>

                <Board header={'Inventory Lacking'} data={['Carrots needs Refill', 'Potatoes needs Refill', 'Rib Eye needs Refill']} />
            
                <TopDishes/>

                <Inventory/>

                <SaleItems/>

            </ScrollView>

            <Navigation logout={setIsLoggedIn}/>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.xLarge,
    },
    body: {
        padding: SIZES.medium,
        backgroundColor: '#FFF',
        height: 100,
        marginBottom: 60,
        paddingBottom: 5
    },
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


export default Dashboard;