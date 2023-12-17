import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Nav from "../components/Nav";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PickerDialog from "../components/PickerDialog";
import { useEffect, useState } from "react";

const data = [
  {
    label: "Inches",
    value: "Inches",
  },
  {
    label: "Centimeters",
    value: "Centimeters",
  },
  {
    label: "Meters",
    value: "Meters",
  },
  {
    label: "Kilometers",
    value: "Kilometers",
  },
  {
    label: "Feet",
    value: "Feet",
  },
  {
    label: "Yards",
    value: "Yards",
  },
  {
    label: "Miles",
    value: "Miles",
  },
];

const covertToInches = (value, selected) => {
  switch (selected) {
    case "Inches":
      return 1 * parseFloat(value);
    case "Centimeters":
      return 2.54 * parseFloat(value);
    case "Meters":
      return 39.37 * parseFloat(value);
    case "Kilometers":
      return 39370 * parseFloat(value);
    case "Feet":
      return 12 * parseFloat(value);
    case "Yards":
      return 36 * parseFloat(value);
    case "Miles":
      return 63360 * parseFloat(value);
  }
}

const covertInchesTo = (value, selected) => {
  if (value == "0") {
    return "0";
  }
  switch (selected) {
    case "Inches":
      return parseFloat(value) / 1;
    case "Centimeters":
      return parseFloat(value) / 2.54;
    case "Meters":
      return parseFloat(value) / 39.37;
    case "Kilometers":
      return parseFloat(value) / 39370;
    case "Feet":
      return parseFloat(value) / 12;
    case "Yards":
      return parseFloat(value) / 36;
    case "Miles":
      return parseFloat(value) / 63360;
  }
}

export default function Length({ navigation }) {
  const [openSelect, setOpenSelect] = useState(false);
  const [pickerFor, setPickerFor] = useState("first");
  const [firstSelected, setFirstSelected] = useState("Inches");
  const [secondSelected, setSecondSelected] = useState("Centimeters");
  const [firstValue, setFirstValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");

  useEffect(() => {
    let firstValueToInches = covertToInches(firstValue, firstSelected);
    let secondValueToInches = covertInchesTo(firstValueToInches, secondSelected);

    if (secondValueToInches.toString().length > 12) {
      setSecondValue(secondValueToInches.toString().substring(0, 12));
    } else {
      setSecondValue(secondValueToInches);
    }

  }, [firstValue, firstSelected, secondSelected]);

  const handleInput = (value) => {
    if (firstValue.length > 10 && value !== "Del") {
      return;
    }
    if (value === "Del") {
      if (firstValue.length > 1) {
        setFirstValue(firstValue.substring(0, firstValue.length - 1));
      } else {
        setFirstValue("0");
      }
    } else if (value === ".") {
      if (!firstValue.includes(".")) {
        setFirstValue(firstValue + ".");
      }
    } else {
      if (firstValue === "0") {
        setFirstValue(value);
      } else {
        setFirstValue(firstValue + value);
      }
    }
  }

  const swap = () => {
    setFirstSelected(secondSelected);
    setSecondSelected(firstSelected);
  };

  const openDialogFor = (value) => {
    setPickerFor(value);
    setOpenSelect(true);
  };

  const onSelect = (value) => {
    if (pickerFor === "first") {
      setFirstSelected(value);
    } else {
      setSecondSelected(value);
    }
  };

  return (
    <>
      <Nav navigation={navigation} />
      <PickerDialog
        options={data}
        show={openSelect}
        selected={pickerFor === "first" ? firstSelected : secondSelected}
        onSelect={(value) => onSelect(value)}
        onClose={() => setOpenSelect(false)}
      />
      <View className="flex flex-col w-full flex-1">
        <View className="bg-black w-full pt-20 pb-4 flex flex-col">
          <View className="px-5">
            <Text className="text-5xl text-white">{firstValue}</Text>
            <Pressable
              onPress={() => openDialogFor("first")}
              className="flex flex-row items-center gap-2"
            >
              <Text className="text-3xl text-white">{firstSelected}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="white" />
            </Pressable>
          </View>
          <View className="flex flex-row justify-center items-center gap-4 py-2">
            <View className="h-[1px] w-1/3 bg-orange-500"></View>
            <TouchableOpacity
              onPress={() => swap()}
              className="bg-orange-500 rounded-full h-10 w-10 flex justify-center items-center"
            >
              <Ionicons name="swap-vertical" size={24} color="white" />
            </TouchableOpacity>
            <View className="h-[1px] w-1/3 bg-orange-500"></View>
          </View>
          <View className="px-5">
            <Text className="text-5xl text-white">{secondValue}</Text>
            <Pressable
              onPress={() => openDialogFor("second")}
              className="flex flex-row items-center gap-2"
            >
              <Text className="text-3xl text-white">{secondSelected}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="white" />
            </Pressable>
            <Text className="text-slate-400">{covertInchesTo(covertToInches(1, firstSelected), firstSelected)} {firstSelected} = {covertInchesTo(covertToInches(1, firstSelected), secondSelected)} {secondSelected}</Text>
          </View>
        </View>
        <View className="flex-1 bg-black pt-10 flex flex-col items-center">
          <View className="flex h-1/4 flex-row w-full justify-center gap-4">
            <TouchableOpacity onPress={() => handleInput("7")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("8")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("9")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">9</Text>
            </TouchableOpacity>
          </View>
          <View className="flex h-1/4 flex-row w-full justify-center gap-4">
            <TouchableOpacity onPress={() => handleInput("4")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("5")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("6")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">6</Text>
            </TouchableOpacity>
          </View>
          <View className="flex h-1/4 flex-row w-full justify-center gap-4">
            <TouchableOpacity onPress={() => handleInput("1")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("2")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("3")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">3</Text>
            </TouchableOpacity>
          </View>
          <View className="flex h-1/4 flex-row w-full justify-center gap-4">
            <TouchableOpacity onPress={() => handleInput(".")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("0")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-4xl">0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInput("Del")} className="p-4 aspect-square bg-[#333333] rounded-full flex justify-center items-center">
              <Text className="text-white text-2xl">Del</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
