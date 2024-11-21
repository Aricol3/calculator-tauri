export enum SCREEN {
  BASIC_CALCULATOR = "BASIC_CALCULATOR",
  DATE_CALCULATOR = "DATE_CALCULATOR",
  SETTINGS = "SETTINGS",
}

export enum COLOR {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

export type ColorType = (typeof COLOR)[keyof typeof COLOR];

export enum VARIANT {
  SOLID = "solid",
  FADED = "faded",
  BORDERED = "bordered",
  LIGHT = "light",
  FLAT = "flat",
  GHOST = "ghost",
  SHADOW = "shadow"
}

export type VariantType = (typeof VARIANT)[keyof typeof VARIANT];