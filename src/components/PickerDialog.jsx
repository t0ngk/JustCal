import { useRef, useEffect } from "react";
import { View, Button, Pressable, Animated } from "react-native";
import { PickerIOS } from "@react-native-picker/picker";

const PickerDialog = ({ show, onClose, onSelect, options, selected }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [show]);

  const closeDialog = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose && onClose();
    });
  };

  return (
    <>
      {show && (
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute inset-0 w-full h-full z-40"
        >
          <Pressable 
          onPress={() => closeDialog()}
          className="bg-white/10 w-full h-full"></Pressable>
        </Animated.View>
      )}
      {show && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="absolute bottom-0 w-full bg-black rounded-t-2xl z-50"
        >
          <View className="w-full flex items-end p-4">
            <View className="w-1/5">
              <Button onPress={() => closeDialog()} title="Close" />
            </View>
          </View>
          <PickerIOS
            themeVariant="dark"
            itemStyle={{ color: "white" }}
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) =>
              onSelect && onSelect(itemValue)
            }
          >
            {options.map((option) => (
              <PickerIOS.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </PickerIOS>
        </Animated.View>
      )}
    </>
  );
};

export default PickerDialog;
