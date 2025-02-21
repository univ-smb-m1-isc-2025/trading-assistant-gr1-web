const colors = {
  primary: "#007BFF", // Bleu principal
  secondary: "#6C757D", // Gris secondaire
  success: "#28A745", // Vert succès
  danger: "#DC3545", // Rouge danger
  warning: "#FFC107", // Jaune avertissement
  info: "#17A2B8", // Bleu info
  light: "#F8F9FA", // Couleur claire
  dark: "#343A40", // Couleur sombre
};

const spacing = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "20px",
  lg: "32px",
  xl: "52px",
  xxl: "84px",
};

const fonts = {
  size: {
    XXXS: "8px",
    XXS: "10px",
    XS: "12px",
    SM: "15px",
    P0: "16px",
    P1: "18px",
    P2: "20px",
    P3: "24px",
    P4: "36px",
    P5: "48px",
    P6: "60px",
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    heavy: 800,
  },
};
const gridUnit = 8;
const borderRadius = {
  subtle: 1,
  round: "5px",
  extraRound: "15px",
  circle: "50%",
};

const shadows = {
  subtle: "0px -6px 8px -2px rgba(0, 0, 0, 0.1)",
  medium: "-8px 8px 20px 0px rgb(0 0 0 / 20%)",
  strong: "0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset",
};

export const theme = {
  colors,
  fonts,
  gridUnit,
  borderRadius,
  shadows,
  spacing,
};
