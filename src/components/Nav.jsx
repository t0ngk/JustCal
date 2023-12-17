import { Text, Pressable, Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from "react";
import { useNav } from "../hooks/NavHook";

export default function Nav({ navigation }) {
  const [show, setShow] = useState(false);
  const { selected, setSelected } = useNav();
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(-270)).current;

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -270,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShow(false);
    });
  };

  const openMenu = () => {
    setShow(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <Pressable
        onPress={() => {
          openMenu();
        }}
        className="absolute z-40 top-5 left-5"
      >
        <Entypo name="menu" size={36} color="white" />
      </Pressable>
      {show && (
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
          }}
          className="w-[270px] z-50 h-screen bg-[#0F0F0F] absolute pt-20 pb-4 px-4"
        >
          <Pressable
            onPress={() => {
              navigation.replace("Calculator");
              setSelected("Calculator");
              closeMenu();
            }}
            className={`px-2 py-2 rounded mb-2 flex flex-row items-center ${
              selected === "Calculator" ? "bg-[#424242]" : "bg-[#1E1E1E]"
            }`}
          >
            <Entypo name="calculator" size={24} color="white" />
            <Text className="text-2xl text-white ml-2">Calculator</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.replace("Length");
              setSelected("Length");
              closeMenu();
            }}
            className={`px-2 py-2 rounded mb-2 flex flex-row items-center ${
              selected === "Length" ? "bg-[#424242]" : "bg-[#1E1E1E]"
            }`}
          >
            <MaterialCommunityIcons name="tape-measure" size={24} color="white" />
            <Text className="text-2xl text-white ml-2">Length</Text>
          </Pressable>
        </Animated.View>
      )}
      {show && (
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute inset-0 z-40 bg-black w-full h-[150%]"
        >
          <Pressable
            onPress={() => {
              closeMenu();
            }}
            className="absolute w-full h-full z-40"
          />
        </Animated.View>
      )}
    </>
  );
}
