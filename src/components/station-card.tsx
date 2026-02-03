import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import { SymbolView } from "expo-symbols";
import type { Station } from "@/data/caltrain";

interface StationCardProps {
  station: Station;
  onPress?: () => void;
  showChevron?: boolean;
}

export default function StationCard({ station, onPress, showChevron = true }: StationCardProps) {
  return (
    <Link href={`/station/${station.id}`} asChild>
      <Link.Trigger>
        <Pressable
          onPress={onPress}
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
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
              }}
              selectable
            >
              {station.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: AC.secondaryLabel,
              }}
            >
              Zone {station.zone}
            </Text>
          </View>
          {showChevron && (
            <SymbolView name="chevron.right" tintColor={AC.tertiaryLabel} size={14} weight="semibold" />
          )}
        </Pressable>
      </Link.Trigger>
      <Link.Preview />
    </Link>
  );
}
