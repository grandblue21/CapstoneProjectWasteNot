import { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ScreenHeaderBtn } from '../../components';
import { COLORS, FONT, SIZES } from '../../constants';
import Search from '../../components/home/search/Search';
import Navigation from '../../components/common/navigation/Navigation';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const Chatbot = () => {

    async function handleSend() {

        // Hide keyboard
        Keyboard.dismiss();

        // Request options
        const options = {
            method: 'POST',
            url: 'https://chatgpt53.p.rapidapi.com/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'afab6284a5mshae6dd43c22e53a1p14328bjsn3e3a0c4e172d',
                'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
            },
            data: {
                messages: [{
                    role: 'user',
                    content: inputQuery
                }],
                temperature: 1
            }
        };
        
        // Include to conversation
        setConversation([...conversation, {
            isBot: false,
            message: inputQuery
        }]);

        // Empty input query
        setInputQuery('');

        // Scroll to bottom
        scrollViewRef.current.scrollToEnd({ animated: true });
        
        try {

            // Perform request
            const response = await axios.request(options);

            // Include to conversation
            setConversation([...conversation, {
                isBot: true,
                message: response.data.choices[0].message.content
            }]);                 
        }
        catch (error) {
             // Show notif
             ToastAndroid.showWithGravity('WasteNot AI cannot reply. Please try again later.', ToastAndroid.LONG, ToastAndroid.TOP);
        }
    }

    // Router
    const router = useRouter();

    // Reference for Scroll View Component
    const scrollViewRef = useRef(null);

    // Chat Images
    const images = (isBot) => {
        return isBot ? require('../../assets/images/logos/normal.png') : {
            uri: 'https://cdn1.iconfinder.com/data/icons/contact-contact-us-communication-social-media-se-3/32/Contact-09-512.png'
        }
    }

    // Initialize Conversation
    const [conversation, setConversation] = useState([{
        isBot: true,
        message: 'Hi! How Can I help you today?'
    }]);
    
    // Initialize Input Query
    const [inputQuery, setInputQuery] = useState('');
    
    return (
        <SafeAreaView style={styles.container}>

            <Stack.Screen options={{
                headerStyle: { backgroundColor: 'white' },
                headerShadowVisible: false,
                headerLeft: () => <ScreenHeaderBtn component={<FontAwesome name="bars" style={{ fontSize: 23 }} />} />,
                headerRight: () => <ScreenHeaderBtn component={<FontAwesome name="bell-o" style={{ fontSize: 23 }} />} />,
                headerTitle: () => (
                    <View style={styles.headerTitleWrapper}>
                        <Text style={styles.headerText}>Chatbot</Text>
                    </View>
                )
            }}/>

            <View style={styles.body}>
                <Search/>
                <ScrollView style={styles.convoContainer} ref={scrollViewRef}>
                    {
                        conversation.map((chat, index) => (
                            <View key={index} style={styles.chatItem(chat.isBot)}>
                                <Image source={images(chat.isBot)} style={styles.chatImage(chat.isBot)}></Image>
                                <View style={styles.chatTextContainer}>
                                    <Text style={styles.chatText(chat.isBot)}>{chat.message}</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>

            <View style={styles.chatInputWrapper}>
                <View style={styles.chatInputContainer}>
                    <TextInput style={styles.chatInput} onChangeText={input => setInputQuery(input)} value={inputQuery}/>
                    <TouchableOpacity style={styles.chatInputIcon} onPress={handleSend}>
                        <FontAwesome name="send-o" style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <Navigation/>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.xLarge,
        backgroundColor: '#FFF'
    },
    body: {
        flex: 1,
        padding: 3,
        backgroundColor: '#FFF',
        marginBottom: 75,
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
    },
    convoContainer: {
        flexGrow: 1,
        backgroundColor: '#F4EDED',
        borderColor: COLORS.primary,
        borderWidth: 1,
        paddingVertical: 14,
        paddingHorizontal: 8,
        marginBottom: 30
    },
    chatImage: (isBot) => {
        return isBot ? {
            height: 71,
            width: 71,
            marginRight: 6
        } : {
            height: 71,
            width: 71,
            marginLeft: 6
        }
    },
    chatItem: (isBot) => {
        return isBot ? {
            flexDirection: 'row',
            marginBottom: 25
        } : {
            flexDirection: 'row-reverse',   
            marginBottom: 25,
            justifyContent: 'flex-end'
        }
    },
    chatTextContainer: {
        flex: 1,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#FFF',
        paddingVertical: 25,
        paddingHorizontal: 16,
        maxWidth: '80%'
    },
    chatText: (isBot) => {
        return isBot ? {
            fontSize: 15,
            fontWeight: '900',
        } : {
            fontSize: 15,
            fontWeight: '900',
            textAlign: 'right'
        }
    },
    chatInputWrapper: {
        backgroundColor: COLORS.primary,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 115,
        borderRadius: 25
    },
    chatInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#ECECEC',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 0,
        marginBottom: 62,
        marginHorizontal: 7
    },
    chatInput: {
        flex: 1,
        height: 46,
        fontSize: 20,
        fontWeight: '900',
        paddingHorizontal: 10
    },
    chatInputIcon: {
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Chatbot;