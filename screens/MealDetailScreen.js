import { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  Linking,
  AsyncStorage,
} from "react-native";
import MealDetails from "../components/MealDetail/MealDetails";
import List from "../components/List";
import IconButton from "../components/IconButton";
import { MEALS } from "../data/dummy-data";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

function MealDetailScreen({ route, navigation }) {
  //const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      //favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
      console.log("Remove favorite: " + mealId);
    } else {
      //favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
      console.log("Add favorite: " + mealId);
    }
    console.log("Header button pressed");
  }
  function headerButtonLongPressHandler() {
    console.log("Header button Long pressed");
    navigation.navigate("Favorites");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="star"
            color={mealIsFavorite ? "yellow" : "white"}
            onPress={changeFavoriteStatusHandler}
            onLongPress={headerButtonLongPressHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Pressable
          onPress={() => {
            Linking.openURL(selectedMeal.videoUrl);
          }}
        >
          <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        </Pressable>
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <View>
          <MealDetails meal={selectedMeal} detailScreen={true} />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView>
            {selectedMeal.ingredients.map((ingredient) => (
              <List key={ingredient} list={ingredient} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Steps</Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView>
            {selectedMeal.steps.map((step) => (
              <List key={step} list={step} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  contentContainer: {
    padding: "2%",
    alignItems: "center",
    margin: "2%",
    borderRadius: 20,
    //backgroundColor: "white",
  },
  subtitleContainer: {
    padding: "2%",
    marginVertical: "1%",
    marginHorizontal: "30%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
