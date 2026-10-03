export type TCreateEquipmentPassport = {
  producer: string;
  model: string;
  power: number;
  lastCheck: string;
};

export type TUpdateEquipmentPassport = Partial<TCreateEquipmentPassport>;
