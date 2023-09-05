import AsyncStorage from "@react-native-async-storage/async-storage";
import { Parse } from "parse/react-native";

const client = () => {
  Parse.setAsyncStorage(AsyncStorage);
  return Parse;
};

export default client;
