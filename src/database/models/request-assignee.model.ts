import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import MaintenanceRequest from "./maintenance-request.model";
import Technician from "./technician.model";

@Table({
  modelName: "request_assignees",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["request_id", "technician_id"],
    },
  ],
})
class RequestAssignee extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.ENUM("lead", "member"), allowNull: false })
  declare role: "lead" | "member";

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  declare hours: number;

  @ForeignKey(() => MaintenanceRequest)
  @Column({ type: DataType.UUID, allowNull: false, field: "request_id" })
  declare requestId: string;

  @BelongsTo(() => MaintenanceRequest)
  declare request: MaintenanceRequest;

  @ForeignKey(() => Technician)
  @Column({ type: DataType.UUID, allowNull: false, field: "technician_id" })
  declare technicianId: string;

  @BelongsTo(() => Technician)
  declare technician: Technician;
}

export default RequestAssignee;
