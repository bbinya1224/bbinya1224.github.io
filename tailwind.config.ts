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

            // 단락
            p: {
              fontSize: "1rem",
              lineHeight: "1.6",
              letterSpacing: "-0.01em",
              marginTop: "0.5em",
              marginBottom: "0.5em",
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
            em: {
              color: "#37352F",
              fontStyle: "italic",
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
            },
            "li > p": {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },

            // 인용구
            blockquote: {
              borderLeftColor: "#0084E8",
              borderLeftWidth: "8px",
              paddingLeft: "1.25em",
              color: "#37352F",
              fontStyle: "normal",
              marginTop: "0.5em",
              marginBottom: "0.5em",
              fontWeight: "500",
              backgroundColor: "#F5FAFF",
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
              paddingRight: "1em",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p": {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },

            // 코드
            code: {
              color: "#E03B8D",
              backgroundColor: "#F5F4F3",
              padding: "0.2em 0.4em",
              borderRadius: "0.3em",
              fontWeight: "400",
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
              fontSize: "0.95em",
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
            "aside[data-type='warning']::before": {
              content: '"⚠️ "',
              fontWeight: "bold",
              marginRight: "0.5em",
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
            "aside[data-type='info']::before": {
              content: '"💡 "',
              fontWeight: "bold",
              marginRight: "0.5em",
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
            "aside[data-type='note']::before": {
              content: '"📝 "',
              fontWeight: "bold",
              marginRight: "0.5em",
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
            "aside[data-type='success']::before": {
              content: '"✅ "',
              fontWeight: "bold",
              marginRight: "0.5em",
            },

            // 이미지
            img: {
              borderRadius: "0.5em",
              marginTop: "1.5em",
              marginBottom: "1.5em",
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
              textAlign: "left",
            },
            "tbody td": {
              padding: "0.75em",
              border: "1px solid #E5E5E5",
              color: "#37352F",
            },
            "tbody tr:nth-child(odd)": {
              backgroundColor: "#FAFAF9",
            },

            // 수평선
            hr: {
              borderColor: "#E5E5E5",
              marginTop: "2em",
              marginBottom: "2em",
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
              paddingTop: "0.75em",
              paddingBottom: "0.75em",
              paddingRight: "1em",
            },
            "blockquote p": {
              marginTop: "0",
              marginBottom: "0",
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
            },

            // 경고 (빨간색 계열)
            "aside[data-type='warning']": {
              borderLeftColor: "#E03B8D",
              backgroundColor: "#3D1F1F",
              color: "#FFB3A3",
            },
            "aside[data-type='warning'] strong": {
              color: "#FFB3A3",
            },
            "aside[data-type='warning']::before": {
              content: '"⚠️ "',
              fontWeight: "bold",
              marginRight: "0.5em",
            },
            // 정보 (파란색 계열)
            "aside[data-type='info']": {
              borderLeftColor: "#0084E8",
              backgroundColor: "#1A2F4A",
              color: "#98C9FF",
            },
            "aside[data-type='info'] strong": {
              color: "#98C9FF",
            },
            "aside[data-type='info']::before": {
              content: '"ℹ️ "',
              fontWeight: "bold",
              marginRight: "0.5em",
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
            "aside[data-type='note']::before": {
              content: '"📝 "',
              fontWeight: "bold",
              marginRight: "0.5em",
            },
            // 성공 (녹색 계열)
            "aside[data-type='success']": {
              borderLeftColor: "#46A758",
              backgroundColor: "#1F3D1F",
              color: "#98FF98",
            },
            "aside[data-type='success'] strong": {
              color: "#98FF98",
            },
            "aside[data-type='success']::before": {
              content: '"✅ "',
              fontWeight: "bold",
              marginRight: "0.5em",
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
              borderColor: "#404040",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
