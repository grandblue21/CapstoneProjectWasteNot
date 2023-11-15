import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '../../constants';

const EditProfile = () => {

    const router = useRouter();

    return (
        <View style={ styles.container }>

            <Stack.Screen options={{
                headerStyle: { backgroundColor: '#FFF' },
                headerShadowVisible: false,
                headerLeft: () => <ScreenHeaderBtn handlePress={ () => router.back() } component={(
                    <View style={ styles.back }>
                        <FontAwesome name={'chevron-left'} style={ styles.backIcon }/>
                    </View>
                )} />,
                headerRight: null,
                headerTitle: () => null
            }}/>

            <View style={ styles.body }>
                
                <TouchableOpacity style={ styles.imageContainer }>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/666/666201.png' }} style={ styles.image }/>
                </TouchableOpacity>

                <Text style={ styles.nameHeader }>Edit</Text>

                <View style={ styles.infoContainer }>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Name:</Text>
                        <TextInput style={ styles.infoInput } value="Gazelle" placeholder="Name"/>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Gmail:</Text>
                        <TextInput style={ styles.infoInput } value="gazelle@mailinator.com" placeholder="Email"/>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Phone Number:</Text>
                        <TextInput style={ styles.infoInput } value="09123456789" placeholder="Number"/>
                    </View>

                    <View style={ styles.infoItem }>
                        <Text style={ styles.infoLabel }>Address:</Text>
                        <TextInput style={ styles.infoInput } value="Ibabao, Mandaue City" placeholder="Location"/>
                    </View>

                </View>

                <View style={ styles.buttonContainer }>
                    <TouchableOpacity style={ styles.cancelButton } onPress={ () => router.back() }>
                        <Text style={ styles.buttonText }>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.confirmButton }>
                        <Text style={ styles.buttonText }>Confirm</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
    back: {
        height: 38,
        width: 38,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
        marginTop: 6,
        borderWidth: 3,
        borderColor: '#097C31',
        borderRadius: 20
    },
    backIcon: {
        fontSize: 17,
        color: '#f8AF21',
        paddingRight: 2
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
        marginBottom: 12,
        marginRight: 20
    },
    infoLabel: {
        textAlign: 'right',
        textDecorationLine: 'underline',
        fontSize: 15,
        width: '40%',
        marginRight: 10
    },
    infoInput: {
        fontSize: 20,
        fontWeight: '600',
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 2,
        marginBottom: 30
    },
    cancelButton: {
        flexGrow: 1,
        borderWidth: 1,
        height: 61,
        borderColor: '#B20000',
        marginRight: 1.5,
        borderRadius: 7,
        backgroundColor: '#ED5E5E',
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmButton: {
        flexGrow: 1,
        borderWidth: 1,
        height: 61,
        borderColor: '#FFF',
        marginRight: 1.5,
        borderRadius: 7,
        backgroundColor: '#48B560',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '500'
    }
});

export default EditProfile;