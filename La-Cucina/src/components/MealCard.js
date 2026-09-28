import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function MealCard({ meal, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: meal.strMealThumb }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text
                    style={styles.title}
                    numberOfLines={2}
                >
                    {meal.strMeal}
                </Text>

                {meal.strCategory && (
                    <Text style={styles.category}>
                        {meal.strCategory}
                    </Text>
                )}

                {meal.strArea && (
                    <Text style={styles.area}>
                        {meal.strArea}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 220,
        marginRight: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 5
    },

    image: {
        width: '100%',
        height: 150
    },

    content: {
        padding: 12
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#222222'
    },

    category: {
        marginTop: 8,
        fontSize: 13,
        color: '#E85D04',
        fontWeight: '600'
    },

    area: {
        marginTop: 4,
        fontSize: 12,
        color: '#777777'
    }
});