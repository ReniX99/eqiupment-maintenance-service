import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Equipment from "./equipment.model";

@Table({
  modelName: "sites",
  timestamps: false,
})
class Site extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    validate: {
      len: [3, 100],
    },
  })
  declare name: string | null;

  @Unique
  @Column({ type: DataType.STRING })
  declare code: string | null;

  @Column({ type: DataType.STRING })
  declare region: string | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: -180,
      max: 180,
    },
  })
  declare latitude: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: -90,
      max: 90,
    },
  })
  declare longitude: number;

  @HasMany(() => Equipment)
  declare equipments: Equipment[];
}

export default Site;
