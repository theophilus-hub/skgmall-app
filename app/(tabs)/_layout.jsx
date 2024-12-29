import { StyleSheet, Text, View, Image } from "react-native";
import { Tabs, router } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import SplashScreen from "../../components/splashScreen";

import home from "../../assets/images/tabs/home.png";
import favorites from "../../assets/images/tabs/favorites.png";
import cart from "../../assets/images/tabs/cart.png";
import orders from "../../assets/images/tabs/bookmark.png";
import user from "../../assets/images/tabs/user.png";

import home2 from "../../assets/images/tabs/home2.png";
import favorites2 from "../../assets/images/tabs/favorites2.png";
import cart2 from "../../assets/images/tabs/cart2.png";
import orders2 from "../../assets/images/tabs/bookmark2.png";
import user2 from "../../assets/images/tabs/user2.png";

const TabsLayout = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    // router.replace('/signup')
  });

  const [fontsLoaded, error] = useFonts({
    Odin: require("../../assets/fonts/Odin-Bold.otf"),
    Inter: require("../../assets/fonts/Inter Regular.ttf"),
  });

  const TabIcon = ({ icon, name, focused }) => {
    return (
      <View className="items-center justify-center mt-2">
        <Image source={icon} tintColor={focused ? "#EA0001" : "#606060"} />
        <Text
          className={`${
            focused
              ? "font-bold text-primary"
              : "font-normal text-black opacity-60"
          } text-xs `}
        >
          {" "}
          {name}{" "}
        </Text>
      </View>
    );
  };

  if (showSplash == true) {
    return (
      <>
        <SplashScreen />
      </>
    );
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 87,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
          },
        }}
      >
        <Tabs.Screen
          name="mall"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? home2 : home}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? orders2 : orders}
                name="Orders"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? favorites2 : favorites}
                name="Favorites"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? cart2 : cart}
                name="Cart"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? user2 : user}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    );
  }
};

export default TabsLayout;