import { useState, useMemo, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import * as AC from "@bacons/apple-colors";
import { stations } from "@/data/caltrain";
import StationCard from "@/components/station-card";
import { useNavigation } from "expo-router";

export default function StationsRoute() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search stations...",
        onChangeText: (event: any) => setSearch(event.nativeEvent.text),
        onCancelButtonPress: () => setSearch(""),
      },
    });
  }, [navigation]);

  const filteredStations = useMemo(() => {
    if (!search.trim()) return stations;
    const searchLower = search.toLowerCase();
    return stations.filter((station) =>
      station.name.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const groupedStations = useMemo(() => {
    const groups: Record<number, typeof stations> = {};
    filteredStations.forEach((station) => {
      if (!groups[station.zone]) {
        groups[station.zone] = [];
      }
      groups[station.zone].push(station);
    });
    return groups;
  }, [filteredStations]);

  const zones = Object.keys(groupedStations)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: AC.systemGroupedBackground }}
      contentContainerStyle={{ padding: 16, gap: 24 }}
    >
      {zones.map((zone) => (
        <View key={zone} style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: AC.secondaryLabel,
              textTransform: "uppercase",
              marginLeft: 4,
            }}
          >
            Zone {zone}
          </Text>
          <View style={{ gap: 8 }}>
            {groupedStations[zone].map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </View>
        </View>
      ))}

      {filteredStations.length === 0 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 48,
          }}
        >
          <Text style={{ fontSize: 17, color: AC.secondaryLabel }}>
            No stations found
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
