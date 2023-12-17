import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Nav from "../components/Nav";

export default function Calculator({navigation}) {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [operator, setOperator] = useState("");

  const handleInput = (input) => {
    const lastChar = firstNumber[firstNumber.length - 1];
    if (firstNumber.length < 10) {
      if (firstNumber === "0") {
        setFirstNumber(input);
        return;
      }
      if (input === "." && lastChar === ".") {
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

  const handleDelete = () => {
    if (firstNumber.length === 1) {
      setFirstNumber("0");
      return;
    }
    setFirstNumber(firstNumber?.substring(0, firstNumber.length - 1));
  };

  const getResult = () => {
    switch (operator) {
      case "+":
        clearAll();
        setFirstNumber(
          String(parseFloat(firstNumber) + parseFloat(secondNumber))
        );
        break;
      case "-":
        clearAll();
        setFirstNumber(
          String(parseFloat(secondNumber) - parseFloat(firstNumber))
        );
        break;
      case "x":
        clearAll();
        setFirstNumber(
          String(parseFloat(firstNumber) * parseFloat(secondNumber))
        );
        break;
      case "/":
        clearAll();
        setFirstNumber(
          String(parseFloat(secondNumber) / parseFloat(firstNumber))
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Nav navigation={navigation} />
      <View className="w-full h-2/6 bg-black flex justify-end items-end px-4">
        <Text className="text-white text-6xl">{firstNumber}</Text>
      </View>
      <View className="w-full h-4/6 flex flex-col items-center pb-10 bg-black">
        <View className="w-full h-1/5 flex flex-row gap-4 items-center mb-4 mt-4">
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
        <View className="w-full h-1/5 flex flex-row gap-4 items-center mb-4">
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
        <View className="w-full h-1/5 flex flex-row gap-4 items-center mb-4">
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
        <View className="w-full h-1/5 flex flex-row gap-4 items-center mb-4">
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
            onPress={() => handleDelete()}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
              Del
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInput("0")}
            className="flex-1 aspect-square bg-[#333333] flex justify-center items-center rounded-full"
          >
            <Text className="text-white text-4xl font-medium text-center self-center">
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
    </>
  );
}
