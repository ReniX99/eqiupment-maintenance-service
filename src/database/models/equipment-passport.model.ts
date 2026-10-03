import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Equipment from "./equipment.model";

@Table({
  modelName: "equipment_passports",
  timestamps: false,
})
class EquipmentPassport extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  })
  declare producer: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare model: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  declare power: number;

  @Column({ type: DataType.DATE, allowNull: false, field: "last_check" })
  declare lastCheck: string;

  @ForeignKey(() => Equipment)
  @Unique
  @Column({ type: DataType.UUID, allowNull: false, field: "equipment_id" })
  declare equipmentId: string;

  @BelongsTo(() => Equipment)
  declare equipemnt: Equipment;
}

export default EquipmentPassport;
