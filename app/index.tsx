import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onb1 from '../assets/images/onb/boy eating illustration.png';
import Onb2 from '../assets/images/onb/hamburger illustration.png';
import Onb3 from '../assets/images/onb/order food illustration.png';
import WideButton from '../components/wideButton';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider';
import Onb from '../components/onb';
import { onbData } from '../lib/onbData';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext()

  if(!isLoading && isLoggedIn ) return <Redirect href='/mall' />


  return (
  <>
    {/* First screen */}
{/*     
         
 */}


  {/* Second screen */}
  {/* <SafeAreaView className='bg-white '>
    
    <View className='bg-white  items-center h-[55%] px-4 py-4 w-full rounded-b-3xl justify-end z-[3]'>

    <TouchableOpacity onPress={() => router.push('/signup')} activeOpacity={0.4} className='justify-center items-center mr-4 absolute top-[8%] right-[20px]'>
          <Text className='font-semibold font-inter text-base text-primary'>Skip</Text>
        </TouchableOpacity>

      <Text className='text-inter text-black text-base font-bold pb-12'>Your Favorite Eateries, All in One Place.</Text>
      <Image
        source={Onb2}
        className = ''
      />
    </View>

    <View className='bg-white h-[25%] rounded-b-full absolute w-[110%] top-[43%] left-[-5%] z-[1]' > 
    </View>

    <View className='bg-primary h-[50%] py-28 px-6 z-[0] items-center'>
      <Text className='text-white font-inter font-normal text-sm text-center'>Delve into a diverse selection of culinary delights{'\n'} from top-rated restaurants.</Text>

      
      <View className='flex flex-row space-x-2 absolute z-[5] bottom-[80%] justify-center '>
        
        <View className='bg-white w-3 h-3 rounded-full opacity-30'></View>
        <View className='bg-white w-6 h-3 rounded-full '></View>
        <View className='bg-white w-3 h-3 rounded-full opacity-30'></View>

       
      </View>
      <TouchableOpacity activeOpacity={0.4} className='justify-center items-center mr-4 absolute bottom-[77%] right-[20px]'>
          <Text className='font-semibold font-inter text-base text-white'>Next</Text>
        </TouchableOpacity>
    </View>

 </SafeAreaView> */}


  {/* Third screen */}
  {/* <SafeAreaView className='bg-white '>
    
    <View className='bg-white  items-center h-[55%] px-4 py-4 w-full rounded-b-3xl justify-end z-[3]'>

    

      <Text className='text-inter text-black text-base font-bold pb-12'>Effortless Ordering</Text>
      <Image
        source='../assets/images/onb/order food illustration.png'
        className = 'h-[250] w-[260.89]'
      />
    </View>

    <View className='bg-white h-[25%] rounded-b-full absolute w-[110%] top-[43%] left-[-5%] z-[1]' > 
    </View>

    <View className='bg-primary h-[50%] py-28 px-6 z-[0] items-center'>
      <Text className='text-white font-inter font-normal text-sm text-center'>Indulge in the ease of our user-friendly ordering
system, guaranteeing prompt deliveries and {'\n'}
a hassle-free dining experience every time.</Text>

        <WideButton
        text="Next"
        bg="white"
        color= 'primary'
        onPress={() => router.push('/signup')}
        style='font-semibold font-inter text-sm'

        />


      <View className='flex flex-row space-x-2 absolute z-[5] bottom-[80%] justify-center '>
        
        <View className='bg-white w-3 h-3 rounded-full opacity-30'></View>
        <View className='bg-white w-3 h-3 rounded-full opacity-30'></View>
        <View className='bg-white w-6 h-3 rounded-full '></View>
        

       
      </View>
     
    </View>

 </SafeAreaView> */}


<SafeAreaView className='bg-white h-[105vh] pt-[20px]'>
    <FlatList
      data={onbData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item, index, separators}) => {
        //
        return(
          <Onb item={item} />
        )
        
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      bounces={false}
      ListEmptyComponent={() => (
        <>
         
        </>
      )}
    />

           <TouchableOpacity onPress={() => router.push('/signup')} activeOpacity={0.4} className=' absolute'>
        <Text className='font-semibold font-inter text-base text-black'>Skip</Text>
      </TouchableOpacity>
      
       

    <View className='flex flex-row space-x-2 absolute z-[5] bottom-[10%] left-[42%] justify-center bg-primary'>
              
              <View className='bg-white w-6 h-3 rounded-full '></View>
              <View className='bg-white w-3 h-3 rounded-full opacity-30'></View>
              <View className='bg-white w-3 h-3 rounded-full opacity-30'></View>

            
            </View>
            <TouchableOpacity activeOpacity={0.4} className='justify-center items-center mr-4 absolute bottom-[10%] right-[20px]'>
                <Text className='font-semibold font-inter text-base text-white'>Next</Text>
              </TouchableOpacity>

    </SafeAreaView>
    
  </>
  
  );
}




