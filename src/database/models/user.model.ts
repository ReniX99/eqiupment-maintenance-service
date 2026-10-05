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
import Technician from "./technician.model";

@Table({
  modelName: "users",
  timestamps: false,
})
class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [6, 100],
    },
  })
  declare login: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "hash_password",
  })
  declare hashPassword: string;

  @Default("viewer")
  @Column({
    type: DataType.ENUM("viewer", "technician", "admin"),
    allowNull: false,
  })
  declare role: "viewer" | "technician" | "admin";

  @ForeignKey(() => Technician)
  @Column({ type: DataType.UUID, field: "technician_id" })
  declare technicianId: string | null;

  @BelongsTo(() => Technician)
  declare technician: Technician | null;
}

export default User;
