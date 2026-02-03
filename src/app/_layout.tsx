import { ThemeProvider } from "@/components/theme-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsLayout />
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(schedule)"
        options={{
          title: "Schedule",
          tabBarIcon: (props) => <MaterialIcons {...props} name="schedule" />,
        }}
      />
      <WebTabs.Screen
        name="(stations)"
        options={{
          title: "Stations",
          tabBarIcon: (props) => <MaterialIcons {...props} name="train" />,
        }}
      />
      <WebTabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <WebTabs.Screen
        name="info"
        options={{
          href: null,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(schedule)">
        <NativeTabs.Trigger.Label>Schedule</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "clock", selected: "clock.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="schedule" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(stations)">
        <NativeTabs.Trigger.Label>Stations</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "tram", selected: "tram.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="train" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="index" hidden />
      <NativeTabs.Trigger name="info" hidden />
    </NativeTabs>
  );
}
