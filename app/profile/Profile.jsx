import { View, Text, Image, StyleSheet } from 'react-native';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '../../constants';
import Navigation from '../../components/common/navigation/Navigation';

const Profile = () => {

    const router = useRouter();

    return (
        <View style={ styles.container }>

            <Stack.Screen options={{
                headerStyle: { backgroundColor: '#FFF' },
                headerShadowVisible: false,
                headerLeft: () => <ScreenHeaderBtn component={(
                    <FontAwesome name="bars" style={{ fontSize: 23 }} />
                )} />,
                headerRight: () => <ScreenHeaderBtn handlePress={ () => router.push('/profile/EditProfile') } component={(
                    <View style={ styles.editBtnContainer } >
                        <FontAwesome name="pencil" style={ styles.editBtn } />
                    </View>
                )} />,
                headerTitle: () => null
            }}/>

            <View style={ styles.body }>
                
                <View style={ styles.imageContainer }>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/666/666201.png' }} style={ styles.image }/>
                </View>

                <Text style={ styles.nameHeader }>Gazelle</Text>

                <View style={ styles.infoContainer }>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Name:</Text>
                        <Text style={ styles.infoText }>Gazelle</Text>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Gmail:</Text>
                        <Text style={ styles.infoText }>gazelle@mailinator.com</Text>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Phone Number:</Text>
                        <Text style={ styles.infoText }>09123456789</Text>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Address:</Text>
                        <Text style={ styles.infoText }>Ibabao, Mandaue City</Text>
                    </View>

                </View>

            </View>

            <Navigation currentRoute={ 'Profile' }/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    editBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 38,
        height: 38,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 38,
    },
    editBtn: {
        fontSize: 23,
        color: COLORS.primary
    },
    imageContainer: {
        height: 189,
        width: 189,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 95,
        padding: 20,
        marginBottom: 15
    },
    image: {
        flex: 1
    },
    nameHeader: {
        fontSize: 40,
        color: '#FFF',
        textShadowColor: COLORS.primary,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontWeight: '900',
        marginBottom: 55
    },
    infoContainer: {
        flex: 1
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35
    },
    infoLabel: {
        textAlign: 'right',
        textDecorationLine: 'underline',
        fontSize: 15,
        width: '40%',
        marginRight: 10
    },
    infoText: {
        fontSize: 20,
        fontWeight: '600',
        width: '60%'
    }
});

export default Profile;