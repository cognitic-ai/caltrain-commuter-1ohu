import { useState, useMemo } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";
import { SymbolView } from "expo-symbols";
import { stations, getDeparturesForStation } from "@/data/caltrain";
import DepartureCard from "@/components/departure-card";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function ScheduleRoute() {
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id);
  const [showStationPicker, setShowStationPicker] = useState(false);
  const navigation = useNavigation();

  const selectedStation = useMemo(
    () => stations.find((s) => s.id === selectedStationId) || stations[0],
    [selectedStationId]
  );

  const departures = useMemo(
    () => getDeparturesForStation(selectedStationId),
    [selectedStationId]
  );

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search departures...",
      },
    });
  }, [navigation]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: AC.systemGroupedBackground }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Pressable
        onPress={() => setShowStationPicker(!showStationPicker)}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: pressed ? AC.systemGray5 : AC.secondarySystemGroupedBackground,
          borderRadius: 12,
          borderCurve: "continuous",
          gap: 12,
        })}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            borderCurve: "continuous",
            backgroundColor: AC.systemRed,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SymbolView name="tram.fill" tintColor="white" size={22} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ fontSize: 13, color: AC.secondaryLabel }}>Departures from</Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: AC.label,
            }}
            selectable
          >
            {selectedStation.name}
          </Text>
        </View>
        <SymbolView
          name={showStationPicker ? "chevron.up" : "chevron.down"}
          tintColor={AC.tertiaryLabel}
          size={14}
          weight="semibold"
        />
      </Pressable>

      {showStationPicker && (
        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground,
            borderRadius: 12,
            borderCurve: "continuous",
            overflow: "hidden",
          }}
        >
          {stations.slice(0, 10).map((station, index) => (
            <Pressable
              key={station.id}
              onPress={() => {
                setSelectedStationId(station.id);
                setShowStationPicker(false);
              }}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                paddingLeft: 16,
                backgroundColor: pressed ? AC.systemGray5 : "transparent",
                borderBottomWidth: index < 9 ? 0.5 : 0,
                borderBottomColor: AC.separator,
              })}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: station.id === selectedStationId ? AC.systemBlue : AC.label,
                  fontWeight: station.id === selectedStationId ? "600" : "400",
                }}
              >
                {station.name}
              </Text>
              {station.id === selectedStationId && (
                <SymbolView name="checkmark" tintColor={AC.systemBlue} size={16} weight="semibold" />
              )}
            </Pressable>
          ))}
        </View>
      )}

      <View style={{ gap: 8 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: AC.secondaryLabel,
            textTransform: "uppercase",
            marginLeft: 4,
          }}
        >
          Upcoming Departures
        </Text>
        {departures.map((departure) => (
          <DepartureCard key={departure.id} departure={departure} />
        ))}
      </View>
    </ScrollView>
  );
}
