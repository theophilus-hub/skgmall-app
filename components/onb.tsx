import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Link, router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Onb1 from "../assets/images/onb/boy eating illustration.png";
import Onb2 from "../assets/images/onb/hamburger illustration.png";
import Onb3 from "../assets/images/onb/order food illustration.png";
import WideButton from "./wideButton";
import { OnbDataType } from "lib/onbData";

export interface OnbProps { item: OnbDataType }

const Onb: React.FC<OnbProps> = ({ item }) => {
  return (
    <View className="bg-primary flex justify-between items-center w-[100vw] h-full py-12">
      
      <View className="items-center bg-white rounded-full px-4 py-9 w-[360px] h-[360px]  z-[3]">
        <Text className="text-inter text-black text-base font-bold pb-4 rounded-full text-center">
          {item.header}
        </Text>
        <Image source={item.image} className={item.size} />
      </View>
      {/* <View className='bg- h-[35%] rounded-b-full absolute w-[110%] top-[31%] left-[-5%] z-[1]' > 
      </View> */}

      <View className="bg-primary py-40 px-6 z-[0] items-center w-full">
        <Text className="text-white font-inter font-semibold text-sm text-center">
          {item.des}
        </Text>
      </View>
    </View>
  );
};

export default Onb;
