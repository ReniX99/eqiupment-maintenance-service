'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("technicians", [
    {
      id: "cec9954a-f580-499e-9944-2fd68a96f766",
      full_name: "Петров Сергей Иванович",
      specialization: "Инженер",
      employee_id: "001"
    },
    {
      id: "0f77f981-490d-4259-910a-c5b1aaf787ae",
      full_name: "Васильев Игорь Андреевич",
      specialization: "Электрик",
      employee_id: "002"
    },
    {
      id: "a4cbd891-cd22-450e-853e-dfde6ee9ddc4",
      full_name: "Токарев Иван Александрович",
      specialization: "Механик",
      employee_id: "003"
    },
    {
      id: "63ff9a99-6672-4dae-a407-d9c93044adcb",
      full_name: "Семёнов Валерий Николаевич",
      specialization: "Электрик",
      employee_id: "004"
    },
    {
      id: "0df0ecbc-79cc-4c87-b2bd-16e673476751",
      full_name: "Лимонов Константин Сергеевич",
      specialization: "Инженер",
      employee_id: "005"
    },
  ])
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("technicians", null, {})
}
