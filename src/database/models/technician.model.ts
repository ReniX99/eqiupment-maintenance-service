import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  modelName: "technicians",
  timestamps: false,
})
class Technician extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "full_name",
  })
  declare fullName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: { len: [3, 100] },
  })
  declare specialization: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "employee_id",
  })
  declare employeeId: string;
}

export default Technician;
