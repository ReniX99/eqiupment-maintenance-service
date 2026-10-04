'use strict';

export async function up(queryInterface, Sequelize) {
  queryInterface.bulkInsert("equipments", [
    {
      id: "464b352d-5b73-4506-9aac-0e20a31df3be",
      site_id: "abeee4c4-e633-484e-a689-183ef7c5d92e",
      name: "Equipment A",
      type: "turbine",
      serial_number: "E001",
      status: "operational",
      installed_at: "2026-10-02",
    },
    {
      id: "16ee8508-234d-44b9-97fd-1207172a1319",
      site_id: "c3c0e516-4c76-4fcf-824c-d773a9a96c5b",
      name: "Equipment B",
      type: "sensor",
      serial_number: "E002",
      status: "maintenance",
      installed_at: "2026-10-01",
    },
    {
      id: "59209f46-50d4-42ca-a1e6-9339881a318d",
      site_id: "c3c0e516-4c76-4fcf-824c-d773a9a96c5b",
      name: "Equipment C",
      type: "substation",
      serial_number: "E003",
      status: "maintenance",
      installed_at: "2026-10-01",
    },
    {
      id: "afdbde5b-57af-481d-9995-cdba36b14b81",
      site_id: "abeee4c4-e633-484e-a689-183ef7c5d92e",
      name: "Equipment D",
      type: "inverter",
      serial_number: "E004",
      status: "fault",
      installed_at: "2026-09-22",
    },
    {
      id: "bbc7a377-7c64-4b94-99ad-f848665c948a",
      site_id: "abeee4c4-e633-484e-a689-183ef7c5d92e",
      name: "Equipment E",
      type: "sensor",
      serial_number: "E005",
      status: "decommissioned",
      installed_at: "2026-09-28"
    },
    {
      id: "e448845a-f2a0-458b-aef7-088bd05b5704",
      site_id: "c3c0e516-4c76-4fcf-824c-d773a9a96c5b",
      name: "Equipment F",
      type: "turbine",
      serial_number: "E006",
      status: "fault",
      installed_at: "2026-09-22",
    },
  ])

  await queryInterface.bulkInsert("equipment_passports", [
    {
      id: "7eaa99f5-195b-466c-8842-199cecf6a852",
      equipment_id: "16ee8508-234d-44b9-97fd-1207172a1319",
      producer: "Producer A",
      model: "Model A",
      power: 240,
      last_check: "2026-10-02T12:00:00Z"
    },
    {
      id: "d870fd10-bd57-49a1-b621-dea7ca89660b",
      equipment_id: "59209f46-50d4-42ca-a1e6-9339881a318d",
      producer: "Producer A",
      model: "Model B",
      power: 300,
      last_check: "2026-10-02T10:00:00Z"
    },
    {
      id: "6f0f6507-dc89-436e-b6ff-696e88ecc589",
      equipment_id: "afdbde5b-57af-481d-9995-cdba36b14b81",
      producer: "Producer B",
      model: "Model A",
      power: 440,
      last_check: "2026-09-30T18:00:00Z"
    },
    {
      id: "5c669e82-78a7-49d2-99fd-52da21001dea",
      equipment_id: "e448845a-f2a0-458b-aef7-088bd05b5704",
      producer: "Producer B",
      model: "Model B",
      power: 500,
      last_check: "2026-10-26T19:00:00Z"
    }
  ])
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("equipments", null, {})
  await queryInterface.bulkDelete("equipment_passports", null, {})
}
