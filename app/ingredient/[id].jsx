import { StyleSheet, View, Text } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

const Ingredient = () => {

    const parameters = useGlobalSearchParams();

    console.log(parameters);
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1
    }
});

export default Ingredient;