import typography from "@tailwindcss/typography";

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#171e23",
      },
      fontFamily: {
        apple: ["AppleSDGothicNeo-main", "sans-serif"],
        bitcount: ["Bitcount_Prop_Double_Ink", "monospace"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            // 기본 텍스트 색상
            color: "#37352F",
            lineHeight: "1.8",

            // 제목 스타일
            "h1, h2, h3, h4, h5, h6": {
              color: "#000000",
              fontWeight: "600",
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
              borderBottom: "1px solid #E5E5E5",
              paddingBottom: "0.3em",
            },
            h3: {
              fontSize: "1.25rem",
            },
            h4: {
              fontSize: "1.1rem",
            },

            // 기울기
            em: {
              color: "#333",
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
              color: "#000000",
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
              borderLeftColor: "#61AFFE",
              color: "#333",
              fontWeight: "500",
              backgroundColor: "#F7FAFC",
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
              paddingRight: "1em",
            },
            "blockquote p": {
              marginTop: "0",
              marginBottom: "0",
            },

            // 코드
            code: {
              color: "#E03B8D",
              backgroundColor: "#F5F4F3",
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

            aside: {
              backgroundColor: "#F5F4F3",
              borderRadius: "0.5em",
              padding: "1em",
              marginTop: "1.5em",
              marginBottom: "1.5em",
              fontSize: "1rem", // Slightly smaller than body
              borderLeftWidth: "4px", // Thinner
              borderBottomLeftRadius: "0",
              borderTopLeftRadius: "0",
            },
            // 경고 (빨간색 계열)
            "aside[data-type='warning']": {
              borderLeftColor: "#E03B8D",
              backgroundColor: "#FFE5E0",
              color: "#921A1A",
            },
            "aside[data-type='warning'] strong": {
              color: "#921A1A",
            },

            // 정보 (파란색 계열)
            "aside[data-type='info']": {
              borderLeftColor: "#0084E8",
              backgroundColor: "#E5F1FF",
              color: "#004199",
            },
            "aside[data-type='info'] strong": {
              color: "#004199",
            },

            // 주의 (노란색 계열)
            "aside[data-type='note']": {
              borderLeftColor: "#F4A640",
              backgroundColor: "#FFF7E5",
              color: "#805D0C",
            },
            "aside[data-type='note'] strong": {
              color: "#805D0C",
            },

            // 성공 (녹색 계열)
            "aside[data-type='success']": {
              borderLeftColor: "#46A758",
              backgroundColor: "#E5FDE5",
              color: "#0E5F1E",
            },
            "aside[data-type='success'] strong": {
              color: "#0E5F1E",
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
              backgroundColor: "#F5F4F3",
              color: "#37352F",
              fontWeight: "600",
              padding: "0.75em",
              border: "1px solid #E5E5E5",
            },
            "tbody td": {
              padding: "0.75em",
              border: "1px solid #E5E5E5",
              color: "#37352F",
            },
            "tbody tr:nth-child(odd)": {
              backgroundColor: "#FAFAF9",
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
              color: "#E5E5E5",
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
            color: "#EBEBEB",

            "h1, h2, h3, h4, h5, h6": {
              color: "#FFFFFF",
              borderBottom: 0,
            },

            a: {
              color: "#61AFFE",
              borderBottomColor: "#61AFFE",
              "&:hover": {
                backgroundColor: "rgba(97, 175, 254, 0.1)",
              },
            },

            strong: {
              color: "#FFFFFF",
            },

            blockquote: {
              borderLeftColor: "#61AFFE",
              color: "#E0E0E0",
              fontWeight: "500",
              backgroundColor: "#1A2A3D",
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
              paddingRight: "1em",
            },
            "blockquote p": {
              marginTop: "0",
              marginBottom: "0",
            },

            em: {
              color: "#e5f5fd",
              fontStyle: "italic",
            },

            code: {
              color: "#FF7B9F",
              backgroundColor: "#2D2D2D",
            },

            // Aside - 기본 스타일 (다크 모드)
            aside: {
              backgroundColor: "#2D2D2D",
              borderRadius: "0.5em",
              padding: "1em",
              marginTop: "1.5em",
              marginBottom: "1.5em",
              fontSize: "0.95em",
              color: "#EBEBEB",
              borderLeftWidth: "8px",
              borderBottomLeftRadius: "0",
              borderTopLeftRadius: "0",
            },

            // 경고 (빨간색 계열)
            "aside[data-type='warning']": {
              borderLeftColor: "#E03B8D",
              backgroundColor: "#3D1F1F",
            },

            // 정보 (파란색 계열)
            "aside[data-type='info']": {
              borderLeftColor: "#0084E8",
              backgroundColor: "#1A2F4A",
            },

            // 주의 (노란색 계열)
            "aside[data-type='note']": {
              borderLeftColor: "#F4A640",
              backgroundColor: "#3D2F1F",
              color: "#FFD79D",
            },
            "aside[data-type='note'] strong": {
              color: "#FFD79D",
            },

            // 성공 (녹색 계열)
            "aside[data-type='success']": {
              borderLeftColor: "#46A758",
              backgroundColor: "#1F3D1F",
              color: "#98FF98",
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
};
