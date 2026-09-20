// enum EquipmentType {
//   turbine,
//   inverter,
//   sensor,
//   substation,
// }

interface EquipmentLocation {
  latitude: number;
  longitude: number;
}

// enum EquipmentStatus {
//   operational,
//   maintenance,
//   fault,
//   decomissioned,
// }

interface Equipment {
  id: string;
  name: string;
  type: "turbine" | "inverter" | "sensor" | "substation";
  serialNumber: string;
  location: EquipmentLocation;
  status: "operational" | "maintenance" | "fault" | "decommissioned";
  installedAt: string;
}
