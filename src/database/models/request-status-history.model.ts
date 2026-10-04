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
import { statuses, StatusType } from "../../types/status.type";

@Table({
  modelName: "request_status_history",
  createdAt: true,
  updatedAt: false,
  hooks: {
    beforeUpdate() {
      throw new Error("Request status history update is forbidden");
    },
    beforeDestroy() {
      throw new Error("Request status history delete is forbidden");
    },
  },
})
class RequestStatusHistory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => MaintenanceRequest)
  @Column({ type: DataType.UUID, allowNull: false, field: "request_id" })
  declare requestId: string;

  @BelongsTo(() => MaintenanceRequest)
  declare request: MaintenanceRequest;

  @Column({
    type: DataType.ENUM(...statuses),
    allowNull: false,
    field: "old_status",
  })
  declare oldStatus: StatusType;

  @Column({
    type: DataType.ENUM(...statuses),
    allowNull: false,
    field: "new_status",
  })
  declare newStatus: StatusType;

  @Column({
    type: DataType.STRING(100),
    validate: { len: [3, 100] },
  })
  declare author: string;

  @Column({
    type: DataType.STRING(2000),
  })
  declare comment: string;
}

export default RequestStatusHistory;
