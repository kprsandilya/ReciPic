import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import recipesData from "../../data.json";

export default function RecipesScreen() {
  const [ingredients, setIngredients] = useState<string[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const response = await fetch("../../data.json");
                    const json = await response.json();
                    setIngredients(json.ingredients || []);
                } catch (error) {
                    console.error("Failed to load ingredients: ", error);
                }
            };
            loadData();
        }, [])
    );

  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.title}>{recipesData.dish}</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Text style={styles.recipeItem}>{item}</Text>
      )}
      ListFooterComponent={
        <View style={styles.container}>
          <Text style={styles.title}>Recipe</Text>
          <Text>{recipesData.recipe}</Text>
        </View>
      }
    />
  );
}



const styles = StyleSheet.create({
   container: { flex: 1, padding: 20 },
   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
   recipeItem: {fontSize: 18, paddingHorizontal: 20, paddingVertical: 10 },


});
