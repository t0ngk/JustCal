import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function App() {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [operator, setOperator] = useState("");

  const handleInput = (input) => {
    if (firstNumber.length < 10) {
      if (firstNumber === "0") {
        setFirstNumber(input);
        return;
      }
      setFirstNumber(firstNumber + input);
    }
  };

  const handleOperator = (input) => {
    setOperator(input);
    setSecondNumber(firstNumber);
    setFirstNumber("0");
  };

  const handlePercent = () => {
    if (secondNumber !== "0") {
      setFirstNumber(
        (parseFloat(secondNumber) * parseFloat(firstNumber)) / 100
      );
      return;
    }
    setFirstNumber(parseFloat(firstNumber) / 100);
  };

  const handleAbsolute = () => {
    if (firstNumber > 0) {
      setFirstNumber("-" + firstNumber);
    } else if (firstNumber < 0) {
      setFirstNumber(firstNumber.substring(1));
    }
  };

  const clearAll = () => {
    setFirstNumber("0");
    setSecondNumber("0");
    setOperator("");
  };

  const clear = () => {
    setFirstNumber("0");
  };

  const getResult = () => {
    switch (operator) {
      case "+":
        clearAll();
        setFirstNumber(parseFloat(firstNumber) + parseFloat(secondNumber));
        break;
      case "-":
        clearAll();
        setFirstNumber(parseFloat(secondNumber) - parseFloat(firstNumber));
        break;
      case "x":
        clearAll();
        setFirstNumber(parseFloat(firstNumber) * parseFloat(secondNumber));
        break;
      case "/":
        clearAll();
        setFirstNumber(parseFloat(secondNumber) / parseFloat(firstNumber));
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="w-full h-2/6 bg-black flex justify-end items-end">
        <Text className="text-white text-7xl">{firstNumber}</Text>
      </View>
      <View className="w-full h-4/6 bg-black gap-1 flex flex-col items-center pb-10">
        <View className="w-full h-1/5 flex flex-row gap-4 items-center">
          <TouchableOpacity
            onPress={() => (firstNumber === "0" ? clearAll() : clear())}
            className="flex-1 aspect-square bg-[#a5a5a5] flex justify-center items-center rounded-full"
          >
            <Text className="text-4xl font-medium text-center self-center">
              {firstNumber === "0" ? "AC" : "C"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAbsolute()}
            className="flex-1 aspect-square bg-[#a5a5a5] flex justify-center items-center rounded-full"
          >
            <Text className="text-4xl font-medium text-center self-center">
              +/-
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePercent()}
            className="flex-1 aspect-square bg-[#a5a5a5] flex justify-center items-center rounded-full"
          >
            <Text className="text-4xl font-medium text-center self-center">
              %
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOperator("/")}
            className={`flex-1 aspect-square ${
              operator === "/" ? "bg-white" : "bg-[#ff9f0a]"
            } flex justify-center items-center rounded-full`}
          >
            <Text
              className={` text-5xl font-medium text-center self-center ${
                operator === "/" ? "text-[#ff9f0a]" : "text-white"
              }`}
            >
              ÷
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-1/5 flex flex-row gap-4 items-center">
          <TouchableOpacity
            onPress={() => handleInput("7")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("8")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("9")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              9
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOperator("x")}
            className={`flex-1 aspect-square ${
              operator === "x" ? "bg-white" : "bg-[#ff9f0a]"
            } flex justify-center items-center rounded-full`}
          >
            <Text
              className={` text-5xl font-medium text-center self-center ${
                operator === "x" ? "text-[#ff9f0a]" : "text-white"
              }`}
            >
              x
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-1/5 flex flex-row gap-4 items-center">
          <TouchableOpacity
            onPress={() => handleInput("4")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("5")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("6")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              6
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOperator("-")}
            className={`flex-1 aspect-square ${
              operator === "-" ? "bg-white" : "bg-[#ff9f0a]"
            } flex justify-center items-center rounded-full`}
          >
            <Text
              className={` text-5xl font-medium text-center self-center ${
                operator === "-" ? "text-[#ff9f0a]" : "text-white"
              }`}
            >
              -
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-1/5 flex flex-row gap-4 items-center">
          <TouchableOpacity
            onPress={() => handleInput("1")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("2")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("3")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOperator("+")}
            className={`flex-1 aspect-square ${
              operator === "+" ? "bg-white" : "bg-[#ff9f0a]"
            } flex justify-center items-center rounded-full`}
          >
            <Text
              className={` text-5xl font-medium text-center self-center ${
                operator === "+" ? "text-[#ff9f0a]" : "text-white"
              }`}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-1/5 flex flex-row gap-4 items-center">
          <TouchableOpacity
            onPress={() => handleInput("0")}
            className="flex-[2] h-[85%] bg-[#333333] flex justify-center items-start rounded-full"
          >
            <Text className="text-white w-full text-4xl text-start self-center pl-9">
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput(".")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              .
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getResult()}
            className="flex-1 aspect-square bg-[#ff9f0a] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-5xl font-medium text-center self-center">
              =
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
