import {
  DarkTheme,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Building2, Gauge, Lightbulb, LogOut } from "lucide-react-native";
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

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type TabRoute = RouteProp<MainTabParamList, keyof MainTabParamList>;

function AppTabs() {
  const { signOut } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: TabRoute }) => ({
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          switch (route.name) {
            case "Dashboard":
              return <Gauge color={color} size={size} />;
            case "Blocos":
              return <Building2 color={color} size={size} />;
            default:
              return <Lightbulb color={color} size={size} />;
          }
        },
        headerRight: () => (
          <Pressable onPress={() => void signOut()} style={{ padding: 6 }}>
            <LogOut color={colors.text} size={20} />
          </Pressable>
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Dashboard" }} />
      <Tab.Screen name="Blocos" component={BlocosScreen} options={{ title: "Blocos" }} />
      <Tab.Screen name="Luzes" component={LightControlScreen} options={{ title: "Luzes" }} />
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
          background: colors.background,
          card: colors.surface,
          border: colors.border,
          primary: colors.primary,
          text: colors.text,
          notification: colors.primary,
        },
      }}
    >
      <RootStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
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
