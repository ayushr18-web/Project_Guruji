import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    card: {
      background: string;
      foreground: string;
    };
    popover: {
      background: string;
      foreground: string;
    };
    accent: {
      main: string;
      contrastText: string;
    };
    spiritual: {
      saffron: string;
      gold: string;
      amber: string;
      ochre: string;
      maroon: string;
      purple: string;
      indigo: string;
    };
    chart: {
      chart1: string;
      chart2: string;
      chart3: string;
      chart4: string;
      chart5: string;
    };
  }
  interface PaletteOptions {
    card: {
      background: string;
      foreground: string;
    };
    popover: {
      background: string;
      foreground: string;
    };
    accent: {
      main: string;
      contrastText: string;
    };
    spiritual: {
      saffron: string;
      gold: string;
      amber: string;
      ochre: string;
      maroon: string;
      purple: string;
      indigo: string;
    };
    chart: {
      chart1: string;
      chart2: string;
      chart3: string;
      chart4: string;
      chart5: string;
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: "blue", // Updated background to be more transparent for texture overlay
    },
    primary: {
      main: "rgb(74 46 35/var(--tw-text-opacity,1))", // saffron
      contrastText: "hsl(0, 0%, 98%)", // white for foreground
    },
    secondary: {
      main: "hsl(42, 20%, 90%)", // Updated secondary
      contrastText: "hsl(240, 5.9%, 10%)",
    },
    error: {
      main: "hsl(0, 84.2%, 60.2%)", // destructive
      contrastText: "hsl(0, 0%, 98%)",
    },
    divider: "hsl(42, 25%, 85% / 0.8)", // border color
    text: {
      primary: "hsl(42, 36%, 95%)", // foreground text color
      secondary: "hsl(240, 3.8%, 46.1%)", // muted foreground
    },
    card: {
      background: "hsl(42, 36%, 95% / 0.95)", // card color
      foreground: "hsl(240, 10%, 3.9%)", // card foreground color
    },
    popover: {
      background: "hsl(42, 36%, 95%)", // popover background
      foreground: "hsl(240, 10%, 3.9%)", // popover foreground
    },
    accent: {
      main: "hsl(42, 25%, 88%)", // accent color
      contrastText: "hsl(30, 60%, 10%)", // accent foreground color
    },
    spiritual: {
      saffron: "hsl(30, 100%, 50%)", // spiritual saffron
      gold: "hsl(36, 100%, 50%)", // spiritual gold
      amber: "hsl(45, 100%, 50%)", // spiritual amber
      ochre: "hsl(30, 59%, 53%)", // spiritual ochre
      maroon: "hsl(0, 100%, 27%)", // spiritual maroon
      purple: "hsl(270, 50%, 40%)", // spiritual purple
      indigo: "hsl(240, 100%, 50%)", // spiritual indigo
    },
    chart: {
      chart1: "hsl(240, 5.9%, 10%)", // chart 1 color
      chart2: "hsl(30, 100%, 50%)", // chart 2 color
      chart3: "hsl(217, 91%, 60%)", // chart 3 color
      chart4: "hsl(142, 71%, 45%)", // chart 4 color
      chart5: "hsl(47, 100%, 50%)", // chart 5 color
    },
  },

  shape: {
    borderRadius: "0.5rem", // Custom border radius
  },
});

export default theme;
