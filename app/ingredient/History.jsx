import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/common/header/Header';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../../constants';
import moment from 'moment/moment';

const History = () => {

    const router = useRouter();
    const history = [
        {
            quantity: 18,
            date_added: '2023-06-02',
            expiration_date: '2023-07-08'
        },
        {
            quantity: 10,
            date_added: '2023-07-07',
            expiration_date: '2023-07-10'
        },
        {
            quantity: 7,
            date_added: '2023-07-10',
            expiration_date: '2023-07-10'
        },
        {
            quantity: 8,
            date_added: '2023-07-14',
            expiration_date: '2023-07-28'
        },
        {
            quantity: 18,
            date_added: '2023-06-02',
            expiration_date: '2023-07-08'
        },
        {
            quantity: 10,
            date_added: '2023-07-07',
            expiration_date: '2023-07-10'
        },
        {
            quantity: 7,
            date_added: '2023-07-10',
            expiration_date: '2023-07-10'
        },
        {
            quantity: 8,
            date_added: '2023-07-14',
            expiration_date: '2023-07-28'
        },
        {
            quantity: 18,
            date_added: '2023-06-02',
            expiration_date: '2023-07-08'
        },
        {
            quantity: 10,
            date_added: '2023-07-07',
            expiration_date: '2023-07-10'
        },
        {
            quantity: 7,
            date_added: '2023-07-10',
            expiration_date: '2023-07-10'
        },
        {
            quantity: 8,
            date_added: '2023-07-14',
            expiration_date: '2023-07-28'
        }
    ];

    return (
        <SafeAreaView style={ styles.container }>
            <Header hideTitle={ true } hideNotification={ true } showBack={{ show: true, handleBack: () => router.replace('/inventory/Inventory') }}/>
            <View style={ styles.body }>

                <View style={ styles.imageContainer }>
                    <Image source={{ uri: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP.jpg' }} style={ styles.image }/>
                </View>
                <Text style={ styles.ingredientName }>Rib Eye</Text>
                <View style={ styles.historyContainer }>
                    <View style={ styles.historyHeaderContainer }>
                        <Text style={ styles.historyLabel }>History</Text>
                        <TouchableOpacity style={ styles.plusButton } onPress={ () => router.replace('/ingredient/AddIngredient') }>
                            <View style={ styles.plusButtonInner }>
                                <AntDesign name="pluscircle" size={ 40 } color="#389F4F" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={ styles.history }>
                        {
                            history.map((x, index) => (
                                <View key={ index } style={ styles.historyItem }>
                                    <View style={ styles.stockTextContainer }>
                                        <Text style={ styles.stockText }>{ x.quantity }kg</Text>
                                    </View>
                                    <View style={ styles.details }>
                                        <Text style={ styles.detailText }>Date Added { moment(x.date_added).format('MMMM D, YYYY') }</Text>
                                        <Text style={ styles.detailText }>Expiration Date: { moment(x.expiration_date).format('MMMM D, YYYY') }</Text>
                                    </View>
                                    <View style={ styles.action }>
                                        <FontAwesome name="pencil" style={ styles.editAction } />
                                        <FontAwesome name="trash" style={ styles.deleteAction } />
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    body: {
        flex: 1
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    image: {
        height: 187,
        width: 187,
        borderRadius: 93,
    },
    ingredientName: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    historyContainer: {
        marginHorizontal: 5,
        borderBottomWidth: 3,
        borderBottomColor: COLORS.primary
    },
    historyHeaderContainer: {
        marginBottom: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    historyLabel: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    plusButtonInner: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#FFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    history: {
        marginBottom: 25
    },
    historyItem: {
        borderTopWidth: 3,
        borderColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    historyStockContainer: {

    },
    stockText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    details: {
        justfiyContent: 'center',
        alignItems: 'center'
    },
    detailText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    editAction: {
        fontSize: 24,
        color: COLORS.primary,
        marginRight: 15
    },
    deleteAction: {
        fontSize: 24,
        color: 'red'
    }
});

export default History;