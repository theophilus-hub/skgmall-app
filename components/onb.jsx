import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onb1 from '../assets/images/onb/boy eating illustration.png';
import Onb2 from '../assets/images/onb/hamburger illustration.png';
import Onb3 from '../assets/images/onb/order food illustration.png';
import WideButton from '../components/wideButton';

const Onb = ({item}) => {
  return (
    <View className='bg-white flex-1 w-[100vw]'>
    
      <View className='bg-white  items-center h-[55%] px-4 py-4 w-full justify-end z-[3]'>

     

        <Text className='text-inter text-black text-base font-bold pb-12'>{item.header}</Text>
        <Image
          source={item.image}
          className = {item.size}
        />
      </View>

      <View className='bg-white h-[35%] rounded-b-full absolute w-[110%] top-[31%] left-[-5%] z-[1]' > 
      </View>

      <View className='bg-primary h-[50%] py-28 px-6 z-[0] items-center'>
        <Text className='text-white font-inter font-normal text-sm text-center'>{item.des}</Text>

        
       
      </View>
 
   </View>
  )
}

export default Onb