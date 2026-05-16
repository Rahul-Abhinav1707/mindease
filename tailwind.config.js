import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
        body: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: "#6366f1",
        secondary: "#a78bfa",
        accent: "#fbbf24",
        success: "#10b981",
        midnight: "#0f172a",
        cloud: "#fafbfc",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(99, 102, 241, 0.25)",
        soft: "0 20px 60px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "wellness-radial": "radial-gradient(circle at top left, rgba(99,102,241,.32), transparent 28%), radial-gradient(circle at 80% 10%, rgba(167,139,250,.26), transparent 26%), radial-gradient(circle at 40% 90%, rgba(16,185,129,.18), transparent 30%)"
      },
      animation: {
        "gradient-shift": "gradientShift 12s ease infinite"
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      }
    }
  },
  plugins: []
};
