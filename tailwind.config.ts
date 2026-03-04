import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

interface AsideVariant {
  border: string;
  bg: string;
  text: string;
  strong: string;
  codeBg: string;
  codeText: string;
  codeBorder?: string;
  preBg?: string;
}

const asideVariant = (type: string, v: AsideVariant) => ({
  [`aside[data-type='${type}']`]: {
    borderLeftColor: v.border,
    backgroundColor: v.bg,
    color: v.text,
  },
  [`aside[data-type='${type}'] strong`]: { color: v.strong },
  [`aside[data-type='${type}'] code`]: {
    backgroundColor: v.codeBg,
    color: v.codeText,
    ...(v.codeBorder ? { border: `1px solid ${v.codeBorder}` } : {}),
  },
  [`aside[data-type='${type}'] pre code`]: {
    backgroundColor: "transparent !important",
    color: "inherit !important",
    border: "0 !important",
  },
  ...(v.preBg
    ? { [`aside[data-type='${type}'] pre`]: { backgroundColor: `${v.preBg} !important` } }
    : {}),
});

export default {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        apple: ["AppleSDGothicNeo-main", "sans-serif"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "#2D2A26",
            lineHeight: "1.8",

            // 제목 스타일
            "h1, h2, h3, h4, h5, h6": {
              color: "#2D2A26",
              fontWeight: "600",
              lineHeight: "1.35",
              marginTop: "1em",
              marginBottom: "0.3em",
              borderBottom: 0,
            },
            h1: {
              fontSize: "2rem",
              marginTop: "0.5em",
            },
            h2: {
              fontSize: "1.5rem",
              background:
                "linear-gradient(to top, #DDD6FE 40%, transparent 40%)",
              width: "fit-content",
              boxDecorationBreak: "clone",
            },
            h3: {
              fontSize: "1.25rem",
              background:
                "linear-gradient(to top, rgba(221, 214, 254, 0.5) 40%, transparent 40%)",
              width: "fit-content",
              boxDecorationBreak: "clone",
            },
            h4: {
              fontSize: "1.15rem",
              fontWeight: "700",
            },

            // 기울기
            em: {
              color: "#2D2A26",
              fontStyle: "italic",
            },

            // 단락
            p: {
              fontSize: "1.125rem", // 18px
              lineHeight: "1.8",
              letterSpacing: "-0.01em",
              marginTop: "0.8em",
              marginBottom: "0.8em",
              wordSpacing: "0.05em",
            },

            // 링크
            a: {
              color: "#0084E8",
              textDecoration: "none",
              borderBottom: "0.5px solid #0084E8",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 132, 232, 0.1)",
                borderBottomColor: "#0084E8",
              },
            },

            // 강조
            strong: {
              color: "#2D2A26",
              fontWeight: "600",
            },

            // 리스트
            "ul, ol": {
              paddingLeft: "1.5em",
              marginTop: "1em",
              marginBottom: "1em",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
              paddingLeft: "0.5em",
              fontSize: "1.125rem", // Match p size
              lineHeight: "1.8",
            },
            "li > p": {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },

            // 인용구
            blockquote: {
              borderLeftColor: "#3B82F6",
              color: "#374151",
              fontWeight: "500",
              fontStyle: "normal",
              backgroundColor: "#F8FAFC",
              paddingTop: "1em",
              paddingBottom: "0.75em",
              paddingInline: "1.25em",
              borderRadius: "0 0.5em 0.5em 0",
              position: "relative",
              quotes: "none",
            },
            "blockquote::before": {
              position: "absolute",
              left: "0.5em",
              top: "0.25em",
              fontSize: "2.5em",
              color: "#93C5FD",
              fontFamily: "Georgia, serif",
              lineHeight: "1",
            },
            "blockquote p": {
              marginTop: "0",
              marginBottom: "0",
            },
            "blockquote code": {
              backgroundColor: "#E2E8F0",
            },

            // 코드
            code: {
              color: "#E03B8D",
              backgroundColor: "#F5F3EE",
              padding: "0.2em 0.4em",
              borderRadius: "0.3em",
              fontWeight: "400",
              fontSize: "0.9em",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },

            pre: {
              backgroundColor: "#1e1e1e",
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.02), transparent)",
              borderRadius: "0.75em !important",
              paddingInline: "1.5em !important",
              paddingTop: "2.75em !important",
              overflow: "auto !important",
              marginTop: "2em !important",
              marginBottom: "2em !important",
              border: "none !important",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3) !important",
              position: "relative !important",
            },
            "pre::before": {
              content: '""',
              position: "absolute",
              top: "0.75em",
              left: "1.25em",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ED6158",
              boxShadow: "22px 0 0 0 #FCC02E, 44px 0 0 0 #5FC038",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "inherit",
              padding: "0",
            },

            // Aside - 기본 스타일
            aside: {
              backgroundColor: "#F7F7F5",
              borderRadius: "0.5em",
              padding: "1em 1.25em",
              marginTop: "1.5em",
              marginBottom: "1.5em",
              fontSize: "1rem",
              color: "#4A4A4A",
              borderLeftWidth: "4px",
              borderLeftColor: "#D4D4D4",
              borderBottomLeftRadius: "0",
              borderTopLeftRadius: "0",
              lineHeight: "1.7",
            },
            "aside p": {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            "aside strong": {
              color: "#1A1A1A",
            },
            "aside:not([data-type]) code": {
              backgroundColor: "#EAEAEA",
              color: "#1F2937",
              border: "1px solid #D1D5DB",
              borderRadius: "0.35em",
              padding: "0.15em 0.35em",
            },
            "aside pre": {
              marginTop: "1em !important",
              marginBottom: "1em !important",
              boxShadow: "none !important",
            },

            ...asideVariant("warning", {
              border: "#DC2626", bg: "#FEF2F2", text: "#7F1D1D",
              strong: "#7F1D1D", codeBg: "#FEE2E2", codeText: "#991B1B",
              codeBorder: "#FCA5A5", preBg: "#111827",
            }),
            ...asideVariant("info", {
              border: "#2563EB", bg: "#EFF6FF", text: "#1E40AF",
              strong: "#1E3A8A", codeBg: "#DBEAFE", codeText: "#1D4ED8",
              codeBorder: "#93C5FD", preBg: "#111827",
            }),
            ...asideVariant("note", {
              border: "#D97706", bg: "#FFFBEB", text: "#92400E",
              strong: "#78350F", codeBg: "#FEF3C7", codeText: "#B45309",
              codeBorder: "#FCD34D", preBg: "#111827",
            }),
            ...asideVariant("success", {
              border: "#16A34A", bg: "#F0FDF4", text: "#166534",
              strong: "#14532D", codeBg: "#DCFCE7", codeText: "#15803D",
              codeBorder: "#86EFAC", preBg: "#111827",
            }),

            // 형광펜 (mark)
            mark: {
              background:
                "linear-gradient(to top, #FDE68A 40%, transparent 40%)",
              color: "inherit",
              padding: "0.05em 0.15em",
              borderRadius: "0.2em",
              boxDecorationBreak: "clone",
            },

            // 이미지
            img: {
              margin: "2em auto",
              borderRadius: "0.5em",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            },

            // 테이블
            table: {
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            "thead th": {
              backgroundColor: "#F5F3EE",
              color: "#2D2A26",
              fontWeight: "600",
              padding: "0.75em",
              border: "1px solid #E8E5DE",
            },
            "tbody td": {
              padding: "0.75em",
              border: "1px solid #E8E5DE",
              color: "#2D2A26",
            },
            "tbody tr:nth-child(odd)": {
              backgroundColor: "#FAFAF7",
            },
            "thead th:first-child": {
              paddingLeft: "0.75em",
            },
            "thead th:last-child": {
              paddingRight: "0.75em",
            },
            "tbody td:first-child": {
              paddingLeft: "0.75em",
            },
            "tbody td:last-child": {
              paddingRight: "0.75em",
            },

            // 수평선 (Medium Style)
            hr: {
              borderColor: "transparent",
              marginTop: "3em",
              marginBottom: "3em",
              borderTopWidth: "0",
              position: "relative",
              height: "2em",
              textAlign: "center",
            },
            "hr::after": {
              content: '"· · ·"',
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#CCC",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              letterSpacing: "0.6em",
            },
          },
        },

        // 다크 모드
        invert: {
          css: {
            color: "#E8E6E3",

            "h1, h2, h3, h4, h5, h6": {
              color: "#E8E6E3",
            },
            h2: {
              background:
                "linear-gradient(to top, rgba(139, 92, 246, 0.3) 40%, transparent 40%)",
              width: "fit-content",
              boxDecorationBreak: "clone",
            },
            h3: {
              background:
                "linear-gradient(to top, rgba(139, 92, 246, 0.15) 40%, transparent 40%)",
              width: "fit-content",
              boxDecorationBreak: "clone",
            },

            a: {
              color: "#7CC4FA",
              borderBottomColor: "#7CC4FA",
              "&:hover": {
                backgroundColor: "rgba(124, 196, 250, 0.15)",
              },
            },

            strong: {
              color: "#FFFFFF",
            },

            blockquote: {
              borderLeftColor: "#60A5FA",
              color: "#D1D5DB",
              fontWeight: "500",
              fontStyle: "normal",
              backgroundColor: "#1E293B",
              paddingTop: "1em",
              paddingBottom: "0.75em",
              paddingInline: "1.25em",
              borderRadius: "0 0.5em 0.5em 0",
              position: "relative",
              quotes: "none",
            },
            "blockquote::before": {
              position: "absolute",
              left: "0.5em",
              top: "0.25em",
              fontSize: "2.5em",
              color: "#3B82F6",
              fontFamily: "Georgia, serif",
              lineHeight: "1",
            },
            "blockquote p": {
              marginTop: "0",
              marginBottom: "0",
            },
            "blockquote code": {
              backgroundColor: "#334155",
            },

            em: {
              color: "#D4E8F8",
              fontStyle: "italic",
            },

            code: {
              color: "#F8A5B8",
              backgroundColor: "#363636",
            },

            // Aside - 기본 스타일 (다크 모드)
            aside: {
              backgroundColor: "#2A2A2A",
              borderRadius: "0.5em",
              padding: "1em 1.25em",
              marginTop: "1.5em",
              marginBottom: "1.5em",
              fontSize: "1rem",
              color: "#D4D4D4",
              borderLeftWidth: "4px",
              borderLeftColor: "#525252",
              borderBottomLeftRadius: "0",
              borderTopLeftRadius: "0",
            },
            "aside p": {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            "aside strong": {
              color: "#FFFFFF",
            },
            "aside:not([data-type]) code": {
              backgroundColor: "#404040",
              color: "#F3F4F6",
              borderRadius: "0.35em",
              padding: "0.15em 0.35em",
            },
            "aside pre": {
              marginTop: "1em !important",
              marginBottom: "1em !important",
              boxShadow: "none !important",
            },

            ...asideVariant("warning", {
              border: "#F87171", bg: "#2D1B1B", text: "#FCA5A5",
              strong: "#FECACA", codeBg: "#3D2626", codeText: "#FCA5A5",
            }),
            ...asideVariant("info", {
              border: "#60A5FA", bg: "#1E293B", text: "#BFDBFE",
              strong: "#DBEAFE", codeBg: "#1E3A5F", codeText: "#BFDBFE",
            }),
            ...asideVariant("note", {
              border: "#FBBF24", bg: "#2D2518", text: "#FDE68A",
              strong: "#FEF3C7", codeBg: "#3D3118", codeText: "#FDE68A",
            }),
            ...asideVariant("success", {
              border: "#4ADE80", bg: "#1A2E1A", text: "#BBF7D0",
              strong: "#DCFCE7", codeBg: "#1F3D1F", codeText: "#BBF7D0",
            }),

            mark: {
              background:
                "linear-gradient(to top, rgba(253, 230, 138, 0.45) 40%, transparent 40%)",
              color: "inherit",
            },

            pre: {
              backgroundColor: "#1e1e1e !important",
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.02), transparent)",
              borderRadius: "0.75em !important",
              paddingInline: "1.5em !important",
              paddingTop: "2.75em !important",
              overflow: "auto !important",
              marginTop: "1.5em !important",
              marginBottom: "1.5em !important",
              border: "none !important",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3) !important",
              position: "relative !important",
            },
            "pre::before": {
              content: '""',
              position: "absolute",
              top: "0.75em",
              left: "1.25em",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ED6158",
              boxShadow: "22px 0 0 0 #FCC02E, 44px 0 0 0 #5FC038",
            },
            "pre code": {
              backgroundColor: "transparent !important",
              color: "inherit !important",
              padding: "0 !important",
            },
            "thead th:first-child": {
              paddingLeft: "0.75em",
            },
            "thead th:last-child": {
              paddingRight: "0.75em",
            },
            "tbody td:first-child": {
              paddingLeft: "0.75em",
            },
            "tbody td:last-child": {
              paddingRight: "0.75em",
            },
            "thead th": {
              backgroundColor: "#404040",
              color: "#EBEBEB",
              borderColor: "#404040",
            },

            "tbody td": {
              borderColor: "#404040",
              color: "#EBEBEB",
            },

            "tbody tr:nth-child(odd)": {
              backgroundColor: "#262626",
            },

            hr: {
              borderColor: "transparent",
            },
            "hr::after": {
              color: "#404040",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
