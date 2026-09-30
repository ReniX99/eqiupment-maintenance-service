'use strict';

import { DataTypes, literal, QueryInterface } from "sequelize";


export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("maintenance_requests", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUID
    },

    equipment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "equipments",
        key: "id"
      },
      onDelete: "CASCADE"
    },

    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        len: [5, 120]
      }
    },

    description: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "critical"),
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("new", "in_progress", "done", "rejected"),
      allowNull: false,
      defaultValue: "new"
    },

    planned_at: {
      type: DataTypes.DATEONLY,
    },

    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP")
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP")
    }
  })

  await queryInterface.createTable("request_status_history", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    request_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "maintenance_requests", key: "id" },
      onDelete: "CASCADE"
    },

    old_status: {
      type: DataTypes.ENUM("new", "in_progress", "done", "rejected"),
      allowNull: false
    },

    new_status: {
      type: DataTypes.ENUM("new", "in_progress", "done", "rejected"),
      allowNull: false
    },

    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },

    comment: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP")
    }
  })

  await queryInterface.createTable("technicians", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    employee_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }),

    await queryInterface.createTable("request_assignees", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },

      role: {
        type: DataTypes.ENUM("lead", "member"),
        allowNull: false
      },

      hours: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
      },

      request_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "maintenance_requests",
          key: "id"
        },
        onDelete: "CASCADE"
      },

      technician_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "technicians",
          key: "id"
        },
        onDelete: "CASCADE"
      }
    })

  await queryInterface.addConstraint("request_assignees", {
    type: "unique",
    fields: ["request_id", "technician_id"],
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("request_assignees")
  await queryInterface.dropTable("request_status_history")
  await queryInterface.dropTable("maintenance_requests")
  await queryInterface.dropTable("technicians")

  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_maintenance_requests_priority"`
  )

  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_maintenance_requests_status"`
  )

  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_request_status_history_old_status"`
  )

  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_request_status_history_new_status"`
  )

  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_request_assignees_role"`
  )
}
