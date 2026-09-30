import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Equipment from "./equipment.model";
import { statuses, StatusType } from "../../types/status.type";
import RequestStatusHistory from "./request-status-history.model";
import RequestAssignee from "./request-assignee.model";

@Table({
  modelName: "maintenance_requests",
})
class MaintenanceRequest extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Equipment)
  @Column({ type: DataType.UUID, allowNull: false, field: "equipment_id" })
  declare equipmentId: string;

  @BelongsTo(() => Equipment)
  declare equipment: Equipment;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
    validate: {
      len: [5, 120],
    },
  })
  declare title: string;

  @Column({ type: DataType.STRING(2000), allowNull: false })
  declare description: string;

  @Column({
    type: DataType.ENUM("low", "medium", "high", "critical"),
    allowNull: false,
  })
  declare priority: "low" | "medium" | "high" | "critical";

  @Default("new")
  @Column({
    type: DataType.ENUM(...statuses),
    allowNull: false,
  })
  declare status: StatusType;

  @Column({ type: DataType.DATEONLY, field: "planned_at" })
  declare plannedAt: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  })
  declare author: string;

  @HasMany(() => RequestStatusHistory)
  declare statusHistory: RequestStatusHistory[];

  @HasMany(() => RequestAssignee)
  declare technicians: RequestAssignee[];
}

export default MaintenanceRequest;
