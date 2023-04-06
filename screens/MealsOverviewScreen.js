import { useLayoutEffect } from "react";
import { View, FLatList, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";

import { MEALS, CATEGORIES } from "../data/dummy-data";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  //filter to get the meals for the category
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
    //indexOf if it is empty it will return -1
    //display the meals that have more than 1 id
  });
  console.log("Meals id", displayedMeals[0].categoryIds[1]);

  useLayoutEffect(() => {
    //to find category and it's title
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  function renderMealItem(itemData) {
    return <MealItem meal={itemData.item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "2%",
  },
});
