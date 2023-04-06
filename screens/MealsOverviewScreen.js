import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";

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

  return(
    <MealsList items={displayedMeals}/>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  
});
