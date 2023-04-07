import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
//import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#B87D4B" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#523A34" },
            }}
          >
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              options={({ route, navigation }) => {
                const catTitle = route.params.title;
                return {
                  title: catTitle,
                };
              }}
            />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
            <Stack.Screen name="Favorites" component={FavoriteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}
