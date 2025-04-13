import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function RecipesScreen() {
    const sampleRecipes = [
        { id: "1", title: "Banana Pancakes" },
        { id: "2", title: "Avocado Toast" },
        { id: "3", title: "Spaghetti Bolognese" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipes</Text>
            <FlatList
                data={sampleRecipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.recipeItem}>{item.title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    recipeItem: {fontSize: 18, paddingVertical: 10 },

});