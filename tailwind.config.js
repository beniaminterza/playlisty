module.exports = {
    node: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                bg: "#231E23",
                bgHeader: "rgba(35, 30, 35, 0.98)",
                bgLight0: "#292329",
                bgLight1: "#383038",
                bgLight2: "#383238",
                bgLight3: "#2B242B",
                bgLight4: "#332b33",
                bgLight5: "#282328",
                bgLight6: "#3F393F",
                bgLight7: "#524B52",
                bgLight8: "#504950",
                bgDark1: "#1F1B1F",
                bgDark2: "#0F0D0F",
                grayLight: "#c4c4c4",
                gray: "#858585",
                grayDark: "#494949",
                primaryLight: "#f7688a",
                primary: "#ED335F",
                primaryDark: "#a82241",

                white: "#ffffff",
                red: "#F05B7F",
                pink: "#E45BF0",
                purple: "#a585ff",
                blue1: "#5BA0F0",
                blue2: "#5BC3F0",
                turqoise: "#5BF0A9",
                green: "#79F05B",
                yellow: "#F0EA5B",
                orange1: "#F0AC5B",
                orange2: "#F0765B",
                whiteDark: "#393939",
                redDark: "#48383E",
                pinkDark: "#483848",
                purpleDark: "#3E3848",
                blue1Dark: "#383B48",
                blue1Dark2: "#4b4f61",
                blue2Dark: "#384448",
                turqoiseDark: "#384844",
                greenDark: "#3D4838",
                yellowDark: "#484838",
                orange1Dark: "#484538",
                orange2Dark: "#484038",
                darkblue: "#0f1214",
            },
            spacing: {
                1600: "1600px",
                header: "4.875rem",
                14.25: "14.25rem",
                15: "15rem",
                10.625: "10.625rem",
                10.25: "10.25rem",
                14.375: "14.375rem",
                23.4375: "23.4375rem",
                15.8125: "15.8125rem",
                32.25: "32.25rem",
                40: "40rem",
                17.125: "17.125rem",
                13.4375: "13.4375rem",
                25.875: "25.875rem",
                56.25: "56.25%",
                50.867: "50.8670520231%",
                6.75: "6.75rem",
                1.6: "1.6rem",
                18: "4.5rem",
                "67.46%": "67.4666666667%",
                19.875: "19.875rem",
                20.75: "20.75rem",
                13.5: "13.5rem",
                26.9375: "26.9375rem",
                17.0625: "17.0625rem",
                19.375: "19.375rem",
                22.125: "22.125rem",
                90: "90%",
                45.5: "45.5%",
                50.5: "50.5%",
                16.5: "16.5rem",
                7.75: "9rem",
            },
            maxWidth: {
                "1/9": "90%",
            },
            minHeight: {
                12: "3rem",
                80: "20rem",
            },
            borderRadius: {
                st: "0.25rem",
                img: "20px",
            },
            zIndex: {
                1000: 1000,
                10000: 10000,
            },
            boxShadow: {
                glow: "0 0 20px 0 rgba(237, 51, 95, 0.5)",
                video: "0px 20px 10px rgba(0, 0, 0, 0.25)",
                header: "0px 20px 34px 10px rgba(14,12,14,0.35)",
                account: "0px 0px 16px 8px rgba(14, 12, 14,0.3)",
            },
            height: {
                max: "max-content",
            },
        },
    },
    variants: {
        extend: {
            height: ["group-hover"],
            position: ["hover", "group-hover"],
            display: ["hover", "group-hover"],
            minHeight: ["group-hover"],
            ringWidth: ["group-hover"],
            zIndex: ["group-hover"],
            padding: ["hover"],
            fontWeight: ["hover"],
            flexWrap: ["hover"],
            overflow: ["hover"],
        },
    },
    plugins: [],
};
