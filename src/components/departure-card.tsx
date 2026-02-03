import { Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import { SymbolView } from "expo-symbols";
import type { Departure } from "@/data/caltrain";

interface DepartureCardProps {
  departure: Departure;
}

function getTrainTypeColor(type: Departure["type"]) {
  switch (type) {
    case "bullet":
      return AC.systemRed;
    case "limited":
      return AC.systemYellow;
    case "local":
      return AC.systemGray;
    default:
      return AC.systemGray;
  }
}

function getTrainTypeLabel(type: Departure["type"]) {
  switch (type) {
    case "bullet":
      return "Bullet";
    case "limited":
      return "Limited";
    case "local":
      return "Local";
    default:
      return type;
  }
}

function getStatusColor(status: Departure["status"]) {
  switch (status) {
    case "on-time":
      return AC.systemGreen;
    case "delayed":
      return AC.systemOrange;
    case "cancelled":
      return AC.systemRed;
    default:
      return AC.systemGray;
  }
}

export default function DepartureCard({ departure }: DepartureCardProps) {
  const typeColor = getTrainTypeColor(departure.type);
  const statusColor = getStatusColor(departure.status);

  return (
    <View
      style={{
        backgroundColor: AC.secondarySystemGroupedBackground,
        borderRadius: 12,
        borderCurve: "continuous",
        padding: 16,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              backgroundColor: typeColor,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              borderCurve: "continuous",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {getTrainTypeLabel(departure.type)}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              color: AC.secondaryLabel,
              fontWeight: "500",
            }}
          >
            #{departure.trainNumber}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: statusColor,
            }}
          />
          <Text
            style={{
              fontSize: 13,
              color: statusColor,
              fontWeight: "600",
              textTransform: "capitalize",
            }}
            selectable
          >
            {departure.status === "delayed" && departure.delayMinutes
              ? `+${departure.delayMinutes} min`
              : departure.status.replace("-", " ")}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: AC.label,
              fontVariant: ["tabular-nums"],
            }}
            selectable
          >
            {departure.departureTime}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <SymbolView
              name={departure.direction === "northbound" ? "arrow.up" : "arrow.down"}
              tintColor={AC.secondaryLabel}
              size={12}
            />
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
              }}
              selectable
            >
              {departure.destination}
            </Text>
          </View>
        </View>

        {departure.platform && (
          <View style={{ alignItems: "center", gap: 2 }}>
            <Text
              style={{
                fontSize: 12,
                color: AC.tertiaryLabel,
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Platform
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: AC.label,
              }}
              selectable
            >
              {departure.platform}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
