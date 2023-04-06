import { Text, StyleSheet, View } from "react-native";

function MealDetails({ meal, detailScreen }) {
    let font = 12;
    let bgColor = null;
    if(detailScreen){
        font = 15;
        bgColor = 'white',
        console.log("detail screen 15");
    }
    console.log("detail screen " + detailScreen)
  return (
    <View style={styles.detail}>
      <View style={[styles.detailContainer, { backgroundColor: bgColor }]}>
        <Text style={[styles.detailItem, { fontSize: font }]}>
          {meal.duration}mins
        </Text>
      </View>
      <View style={[styles.detailContainer, { backgroundColor: bgColor }]}>
        <Text style={[styles.detailItem, { fontSize: font }]}>
          {(meal.complexity).charAt(0).toUpperCase() + (meal.complexity).slice(1)}
        </Text>
      </View>
      <View style={[styles.detailContainer, { backgroundColor: bgColor }]}>
        <Text style={[styles.detailItem, { fontSize: font }]}>
          {(meal.affordability).charAt(0).toUpperCase() + (meal.affordability).slice(1)}
        </Text>
      </View>
    </View>
  );
}
export default MealDetails;

const styles = StyleSheet.create({
  detail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
  },
  detailContainer: {
    padding: "2%",
    borderWidth: 0.5,
    borderColor: "#523A34",
    margin: "1%",
    borderRadius: 10,
    alignItems: "center",
  },
  detailItem: {
    marginHorizontal: "2%",
    color: "#523A34",
  },
});
