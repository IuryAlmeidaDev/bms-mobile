import {
  DarkTheme,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Building2, Gauge, Lightbulb, LogOut, Shield } from "lucide-react-native";
import { Pressable } from "react-native";

import { colors } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { DashboardScreen } from "../screens/DashboardScreen";
import { BlocoDetailScreen } from "../screens/BlocoDetailScreen";
import { BlocosScreen } from "../screens/BlocosScreen";
import { LightControlScreen } from "../screens/LightControlScreen";
import { LoadingScreen } from "../screens/LoadingScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { MainTabParamList, RootStackParamList } from "../types/api";
import { AdminScreen } from "../screens/AdminScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type TabRoute = RouteProp<MainTabParamList, keyof MainTabParamList>;

function AppTabs() {
  const { signOut } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: TabRoute }) => ({
        headerStyle: {
          backgroundColor: "#0f172a",
        },
        headerTintColor: "#f8fafc",
        sceneStyle: {
          backgroundColor: "#e6e7eb",
        },
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopColor: "#1e293b",
        },
        tabBarActiveTintColor: "#38bdf8",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          switch (route.name) {
            case "Dashboard":
              return <Gauge color={color} size={size} />;
            case "Blocos":
              return <Building2 color={color} size={size} />;
            case "Luzes":
              return <Lightbulb color={color} size={size} />;
            default:
              return <Shield color={color} size={size} />;
          }
        },
        headerRight: () => (
          <Pressable onPress={() => void signOut()} style={{ padding: 6 }}>
            <LogOut color="#f8fafc" size={20} />
          </Pressable>
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Dashboard" }} />
      <Tab.Screen name="Blocos" component={BlocosScreen} options={{ title: "Blocos" }} />
      <Tab.Screen name="Luzes" component={LightControlScreen} options={{ title: "Luzes" }} />
      <Tab.Screen name="Admin" component={AdminScreen} options={{ title: "Admin" }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: "#e6e7eb",
          card: "#0f172a",
          border: "#1e293b",
          primary: "#38bdf8",
          text: "#f8fafc",
          notification: "#38bdf8",
        },
      }}
    >
      <RootStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#f8fafc",
          contentStyle: { backgroundColor: "#e6e7eb" },
        }}
      >
        {!token ? (
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <RootStack.Screen
              name="MainTabs"
              component={AppTabs}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="BlocoDetail"
              component={BlocoDetailScreen}
              options={({ route }: { route: RouteProp<RootStackParamList, "BlocoDetail"> }) => ({
                title: route.params.blocoNome,
              })}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
