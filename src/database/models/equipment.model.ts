import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Site from "./site.model";
import EquipmentPassport from "./equipment-passport.model";
import MaintenanceRequest from "./maintenance-request.model";

@Table({
  modelName: "equipments",
  timestamps: false,
})
class Equipment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Site)
  @Column({ type: DataType.UUID, allowNull: false, field: "site_id" })
  declare siteId: string;

  @BelongsTo(() => Site)
  declare site: Site;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  })
  declare name: string;

  @Column({
    type: DataType.ENUM("turbine", "inverter", "sensor", "substation"),
    allowNull: false,
  })
  declare type: "turbine" | "inverter" | "sensor" | "substation";

  @Unique
  @Column({ type: DataType.STRING, allowNull: false, field: "serial_number" })
  declare serialNumber: string;

  @Column({
    type: DataType.ENUM(
      "operational",
      "maintenance",
      "fault",
      "decommissioned",
    ),
    allowNull: false,
  })
  declare status: "operational" | "maintenance" | "fault" | "decommissioned";

  @Column({ type: DataType.DATEONLY, allowNull: false, field: "installed_at" })
  declare installedAt: string;

  @HasOne(() => EquipmentPassport)
  declare equipmentPassport: EquipmentPassport | null;

  @HasMany(() => MaintenanceRequest)
  declare requests: MaintenanceRequest[];
}

export default Equipment;
