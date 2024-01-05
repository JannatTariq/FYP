import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import SignInScreen from "./src/screens/SignInScreen.js";
import SignUpScreen from "./src/screens/SignUpScreen.js";
import SignupOptionsScreen from "./src/screens/SignUpOptions.js";
import ClientScreen from "./src/screens/ClientScreen.js";
import ArchitectScreen from "./src/screens/ArchitectScreen.js";
import ContractorScreen from "./src/screens/ContractorScreen.js";
import InteriorDesignerScreen from "./src/screens/InteriorDesignerScreen.js";
import TransactionScreen from "./src/screens/TransactionScreen.js";
import Appointment from "./src/screens/AppointmentScreen.js";
import ScheduleMeetingScreen from "./src/screens/ScheduleMeetingScreen.js";
import BiddingListScreen from "./src/screens/BiddingListScreen.js";
import BiddingPageScreen from "./src/screens/BiddingPageScreen.js";
import { Provider as AuthContext } from "./src/context/authContext.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setNavigator } from "./src/navigationRef.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContext>
        <NavigationContainer
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="SignUpOptions"
              component={SignupOptionsScreen}
            />
            <Stack.Screen name="Client" component={ClientScreen} />
            <Stack.Screen name="Architect" component={ArchitectScreen} />
            <Stack.Screen
              name="InteriorDesigner"
              component={InteriorDesignerScreen}
            />
            <Stack.Screen name="Contractor" component={ContractorScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen name="Appointment" component={Appointment} />
            <Stack.Screen
              name="ScheduleMeeting"
              component={ScheduleMeetingScreen}
            />
            <Stack.Screen name="BiddingList" component={BiddingListScreen} />
            <Stack.Screen name="BiddingPage" component={BiddingPageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext>
    </SafeAreaProvider>
  );
}
