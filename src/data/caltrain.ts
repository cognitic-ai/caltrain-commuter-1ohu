export interface Station {
  id: string;
  name: string;
  zone: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Departure {
  id: string;
  trainNumber: string;
  departureTime: string;
  destination: string;
  direction: "northbound" | "southbound";
  type: "local" | "limited" | "bullet";
  platform?: string;
  status: "on-time" | "delayed" | "cancelled";
  delayMinutes?: number;
}

export const stations: Station[] = [
  { id: "sf", name: "San Francisco", zone: 1, coordinates: { latitude: 37.7765, longitude: -122.3942 } },
  { id: "22nd", name: "22nd Street", zone: 1, coordinates: { latitude: 37.7577, longitude: -122.3924 } },
  { id: "bayshore", name: "Bayshore", zone: 1, coordinates: { latitude: 37.7094, longitude: -122.4014 } },
  { id: "ssf", name: "South San Francisco", zone: 1, coordinates: { latitude: 37.6558, longitude: -122.4047 } },
  { id: "sanbruno", name: "San Bruno", zone: 1, coordinates: { latitude: 37.6307, longitude: -122.4117 } },
  { id: "millbrae", name: "Millbrae", zone: 2, coordinates: { latitude: 37.5999, longitude: -122.3868 } },
  { id: "burlingame", name: "Burlingame", zone: 2, coordinates: { latitude: 37.5794, longitude: -122.3450 } },
  { id: "sanmateo", name: "San Mateo", zone: 2, coordinates: { latitude: 37.5685, longitude: -122.3238 } },
  { id: "haywardpark", name: "Hayward Park", zone: 2, coordinates: { latitude: 37.5528, longitude: -122.3090 } },
  { id: "hillsdale", name: "Hillsdale", zone: 2, coordinates: { latitude: 37.5375, longitude: -122.2970 } },
  { id: "belmont", name: "Belmont", zone: 2, coordinates: { latitude: 37.5206, longitude: -122.2761 } },
  { id: "sancarlos", name: "San Carlos", zone: 2, coordinates: { latitude: 37.5075, longitude: -122.2614 } },
  { id: "redwoodcity", name: "Redwood City", zone: 2, coordinates: { latitude: 37.4855, longitude: -122.2320 } },
  { id: "atherrton", name: "Atherton", zone: 3, coordinates: { latitude: 37.4643, longitude: -122.1983 } },
  { id: "menlopark", name: "Menlo Park", zone: 3, coordinates: { latitude: 37.4548, longitude: -122.1822 } },
  { id: "paloalto", name: "Palo Alto", zone: 3, coordinates: { latitude: 37.4435, longitude: -122.1649 } },
  { id: "californiaave", name: "California Ave", zone: 3, coordinates: { latitude: 37.4290, longitude: -122.1422 } },
  { id: "sanantonio", name: "San Antonio", zone: 3, coordinates: { latitude: 37.4068, longitude: -122.1072 } },
  { id: "mountainview", name: "Mountain View", zone: 3, coordinates: { latitude: 37.3939, longitude: -122.0768 } },
  { id: "sunnyvale", name: "Sunnyvale", zone: 3, coordinates: { latitude: 37.3784, longitude: -122.0308 } },
  { id: "lawrence", name: "Lawrence", zone: 4, coordinates: { latitude: 37.3714, longitude: -121.9966 } },
  { id: "santaclara", name: "Santa Clara", zone: 4, coordinates: { latitude: 37.3529, longitude: -121.9366 } },
  { id: "collegepark", name: "College Park", zone: 4, coordinates: { latitude: 37.3424, longitude: -121.9148 } },
  { id: "sanjosediridon", name: "San Jose Diridon", zone: 4, coordinates: { latitude: 37.3297, longitude: -121.9020 } },
  { id: "tamien", name: "Tamien", zone: 4, coordinates: { latitude: 37.3112, longitude: -121.8830 } },
  { id: "capitolstation", name: "Capitol", zone: 5, coordinates: { latitude: 37.2849, longitude: -121.8400 } },
  { id: "blossomhill", name: "Blossom Hill", zone: 5, coordinates: { latitude: 37.2524, longitude: -121.7975 } },
  { id: "morganhill", name: "Morgan Hill", zone: 6, coordinates: { latitude: 37.1296, longitude: -121.6506 } },
  { id: "sanjosemartin", name: "San Martin", zone: 6, coordinates: { latitude: 37.0854, longitude: -121.6104 } },
  { id: "gilroy", name: "Gilroy", zone: 6, coordinates: { latitude: 37.0034, longitude: -121.5663 } },
];

function generateDepartures(stationId: string): Departure[] {
  const now = new Date();
  const departures: Departure[] = [];

  const trainTypes: Array<"local" | "limited" | "bullet"> = ["local", "limited", "bullet"];
  const directions: Array<"northbound" | "southbound"> = ["northbound", "southbound"];

  for (let i = 0; i < 12; i++) {
    const departureDate = new Date(now.getTime() + (i * 20 + Math.floor(Math.random() * 15)) * 60000);
    const hours = departureDate.getHours();
    const minutes = departureDate.getMinutes();
    const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    const direction = directions[i % 2];
    const type = trainTypes[i % 3];
    const trainNum = (100 + i * 2 + (direction === "northbound" ? 1 : 0)).toString();

    const statusRandom = Math.random();
    let status: "on-time" | "delayed" | "cancelled" = "on-time";
    let delayMinutes: number | undefined;

    if (statusRandom > 0.9) {
      status = "cancelled";
    } else if (statusRandom > 0.75) {
      status = "delayed";
      delayMinutes = Math.floor(Math.random() * 15) + 3;
    }

    departures.push({
      id: `${stationId}-${trainNum}-${i}`,
      trainNumber: trainNum,
      departureTime: timeStr,
      destination: direction === "northbound" ? "San Francisco" : "San Jose Diridon",
      direction,
      type,
      platform: Math.random() > 0.5 ? "1" : "2",
      status,
      delayMinutes,
    });
  }

  return departures.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}

export function getDeparturesForStation(stationId: string): Departure[] {
  return generateDepartures(stationId);
}

export function getStationById(id: string): Station | undefined {
  return stations.find((s) => s.id === id);
}
