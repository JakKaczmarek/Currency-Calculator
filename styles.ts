import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1E1E1E",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 33,
    color: "#FFFFFF",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#CCCCCC",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 2,
    marginBottom: 22,
    overflow: "hidden",
    backgroundColor: "#333333",
    width: windowWidth - 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    padding: 8,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  select: {
    height: 40,
    width: "100%",
    borderColor: "#666666",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: "center",
    color: "#FFFFFF",
    backgroundColor: "#333333",
  },
  currencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  currencySelect: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 16,
    width: windowWidth - 32,
    backgroundColor: "#FFA500",
    borderRadius: 12,
    overflow: "hidden",
  },
  clearButtonContainer: {
    marginTop: 16,
    backgroundColor: "#FFA500",
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  resultHeading: {
    fontSize: 20,
    marginTop: 16,
    color: "#FFFFFF",
  },
  result: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 8,
  },
  historyContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#666666",
    paddingTop: 8,
  },
  historyItem: {
    fontSize: 16,
    color: "#CCCCCC",
    marginTop: 8,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
