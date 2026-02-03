import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import * as AC from "@bacons/apple-colors";
import { SymbolView } from "expo-symbols";
import { getStationById, getDeparturesForStation } from "@/data/caltrain";
import DepartureCard from "@/components/departure-card";

export default function StationDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const station = useMemo(() => getStationById(id), [id]);
  const departures = useMemo(() => getDeparturesForStation(id), [id]);

  useEffect(() => {
    if (station) {
      navigation.setOptions({
        title: station.name,
      });
    }
  }, [station, navigation]);

  if (!station) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AC.systemGroupedBackground,
        }}
      >
        <Text style={{ color: AC.secondaryLabel, fontSize: 17 }}>Station not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: AC.systemGroupedBackground }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View
        style={{
          backgroundColor: AC.secondarySystemGroupedBackground,
          borderRadius: 12,
          borderCurve: "continuous",
          padding: 16,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              borderCurve: "continuous",
              backgroundColor: AC.systemRed,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SymbolView name="tram.fill" tintColor="white" size={26} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label,
              }}
              selectable
            >
              {station.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
              }}
            >
              Zone {station.zone}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            paddingTop: 8,
            borderTopWidth: 0.5,
            borderTopColor: AC.separator,
          }}
        >
          <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
            <SymbolView name="arrow.up.circle.fill" tintColor={AC.systemBlue} size={24} />
            <Text style={{ fontSize: 13, color: AC.secondaryLabel }}>Northbound</Text>
            <Text style={{ fontSize: 17, fontWeight: "600", color: AC.label }}>
              {departures.filter((d) => d.direction === "northbound").length}
            </Text>
          </View>
          <View
            style={{
              width: 0.5,
              backgroundColor: AC.separator,
            }}
          />
          <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
            <SymbolView name="arrow.down.circle.fill" tintColor={AC.systemOrange} size={24} />
            <Text style={{ fontSize: 13, color: AC.secondaryLabel }}>Southbound</Text>
            <Text style={{ fontSize: 17, fontWeight: "600", color: AC.label }}>
              {departures.filter((d) => d.direction === "southbound").length}
            </Text>
          </View>
        </View>
      </View>

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
          All Departures
        </Text>
        {departures.map((departure) => (
          <DepartureCard key={departure.id} departure={departure} />
        ))}
      </View>
    </ScrollView>
  );
}
