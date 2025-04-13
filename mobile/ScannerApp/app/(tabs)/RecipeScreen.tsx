import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import recipesData from "../../data.json";


export default function RecipesScreen() {


   const ingredients: string[] = recipesData.ingredients;


   //const uniqueIngredients = Array.from(new Set(combinedValues));






   return (
       <View style={styles.container}>
           <Text style={styles.title}>Ingredients</Text>
           <FlatList
               data={ingredients}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                   <Text style={styles.recipeItem}>{item}</Text>
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
