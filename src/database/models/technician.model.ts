import {
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import RequestAssignee from "./request-assignee.model";
import User from "./user.model";

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

  @HasMany(() => RequestAssignee)
  declare requests: RequestAssignee[];

  @HasOne(() => User)
  declare user: User | null;
}

export default Technician;
