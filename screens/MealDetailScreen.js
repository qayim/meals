import { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  Linking,
} from "react-native";
import MealDetails from "../components/MealDetails";
import List from "../components/List";
import IconButton from "../components/IconButton";
import {useNavigation} from '@react-navigation/native'
import { MEALS } from "../data/dummy-data";

function MealDetailScreen({ route, navigation }) {
const [favorites, setFavorites] = useState([]);
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  function headerButtonPressHandler() {
    console.log("Header button pressed");
    addFavoriteHandler(selectedMeal.id);
    console.log("Favorites button: " + favorites)
  }
  function headerButtonLongPressHandler() {
    console.log("Header button Long pressed");
    navigation.navigate('Favorites', {
        favorites: favorites,
    });

  }
  //store favorite meal id into the array
  function addFavoriteHandler(favoriteMeal) {
    setFavorites((prevFavorites) => [...prevFavorites, favoriteMeal]);
    console.log(favoriteMeal);
    console.log("Favorites handler: ", favorites);
    console.log("Meal id: ", route.params.favoriteId);
  }

  useLayoutEffect(()=>{
    //navigation.navigate('App')
  },[headerButtonLongPressHandler]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="star"
            color="white"
            onPress={headerButtonPressHandler}
            onLongPress={headerButtonLongPressHandler}
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

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
