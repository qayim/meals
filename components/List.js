import { Text, StyleSheet, View, Dimensions } from 'react-native'

function List({list}) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{list}</Text>
      </View>
    );
}

export default List;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  itemContainer: {
    width: deviceWidth * 0.90,
    borderRadius: 20,
    padding: "5%",
    backgroundColor: "white",
    marginVertical: "1%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  itemText: {
    color: "#523a34",
    textAlign: "center",
    fontSize: 15,
  },
});
