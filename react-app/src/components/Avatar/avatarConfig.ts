import React from "react";

export type AvatarConfigProps = {
  // Core Props
  id?: string;
  className?: string;
  style?: React.CSSProperties;

  // Shape Configuration
  shape?: "circle" | "rounded" | "square";

  // Avatar Features
  sex?: "man" | "woman";
  faceColor?: string;
  earSize?: "small" | "big";

  // Hair Configuration
  hairColor?: string;
  hairStyle?: "normal" | "thick" | "mohawk" | "womanLong" | "womanShort";
  hairColorRandom?: boolean;

  // Accessories
  hatColor?: string;
  hatStyle?: "none" | "beanie" | "turban";

  // Facial Features
  eyeStyle?: "circle" | "oval" | "smile";
  glassesStyle?: "none" | "round" | "square";
  noseStyle?: "short" | "long" | "round";
  mouthStyle?: "laugh" | "smile" | "peace";

  // Clothing
  shirtStyle?: "hoody" | "short" | "polo";
  shirtColor?: string;

  // Background
  bgColor?: string;
  isGradient?: boolean;
};

export const DEFAULT_AVATAR_CONFIG: AvatarConfigProps = {
  shape: "circle",
  sex: "man",
  faceColor: "#F9C9B6",
  earSize: "small",
  hairColor: "#000000",
  hairStyle: "normal",
  hairColorRandom: false,
  hatColor: "#FC909F",
  hatStyle: "none",
  eyeStyle: "circle",
  glassesStyle: "none",
  noseStyle: "short",
  mouthStyle: "smile",
  shirtStyle: "hoody",
  shirtColor: "#9287FF",
  bgColor: "#F0F0F0",
  isGradient: false,
};

export const SHAPE_OPTIONS = [
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
  { value: "square", label: "Square" },
];

export const SEX_OPTIONS = [
  { value: "man", label: "Male" },
  { value: "woman", label: "Female" },
];

export const HAIR_STYLE_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "thick", label: "Thick" },
  { value: "mohawk", label: "Mohawk" },
  { value: "womanLong", label: "Long (Female)" },
  { value: "womanShort", label: "Short (Female)" },
];

// Hair Color Options (assuming this is what you want based on the first line)
export const HAIR_COLOR_RANDOM_OPTIONS = [
  { value: false, label: "Default (Black Only)" },
  { value: true, label: "Random Colors" },
];

// Hat Style Options
export const HAT_STYLE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "beanie", label: "Beanie" },
  { value: "turban", label: "Turban" },
];

// Eye Style Options
export const EYE_STYLE_OPTIONS = [
  { value: "circle", label: "Circle" },
  { value: "oval", label: "Oval" },
  { value: "smile", label: "Smile" },
];

// Glasses Style Options
export const GLASSES_STYLE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
];

// Nose Style Options
export const NOSE_STYLE_OPTIONS = [
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
  { value: "round", label: "Round" },
];

// Mouth Style Options
export const MOUTH_STYLE_OPTIONS = [
  { value: "laugh", label: "Laugh" },
  { value: "smile", label: "Smile" },
  { value: "peace", label: "Peace" },
];

// Shirt Style Options
export const SHIRT_STYLE_OPTIONS = [
  { value: "hoody", label: "Hoody" },
  { value: "short", label: "Short Sleeve" },
  { value: "polo", label: "Polo" },
];

export const COLOR_PALETTE = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F3FF33",
  "#FF33F3",
  "#33FFF3",
  "#000000",
  "#FFFFFF",
  "#F9C9B6",
  "#FC909F",
  "#9287FF",
  "#F0F0F0",
];
