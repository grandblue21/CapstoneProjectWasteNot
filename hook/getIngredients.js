import { useState, useEffect } from 'react';
import FirebaseApp from '../helpers/FirebaseApp';
import { COLLECTIONS } from '../constants';

const getIngredients = () => {

    const [ingredients, setIngredients] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        
        setIsLoading(true);

        try {
            // Set FireBase App Instance
            const FBApp = new FirebaseApp();

            const data = await FBApp.db.gets(COLLECTIONS.ingredients);

            setIngredients(data);

            setIsLoading(false);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }
 
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {
        ingredients, isLoading, error, refetch
    }
}

export default getIngredients;