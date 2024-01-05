// BiddingPage.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";

const BiddingPageScreen = ({ route }) => {
  const { bidName, bidDescription, bidImage, numBidders, timeLeft } =
    route.params;
  const [remainingTime, setRemainingTime] = useState(timeLeft);

  useEffect(() => {
    // Implement logic to update the remaining time (you may need a timer)
    // For simplicity, let's just update every second for demonstration purposes
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <Text>Bid Name: {bidName}</Text>
      <Text>Bid Description: {bidDescription}</Text>
      <Image source={{ uri: bidImage }} style={{ width: 200, height: 200 }} />
      <Text>Number of Bidders: {numBidders}</Text>
      <Text>Time Left: {remainingTime} seconds</Text>
      <Button title="Place Bid" onPress={() => alert("Bid placed!")} />
    </View>
  );
};

export default BiddingPageScreen;
