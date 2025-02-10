export default {
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",

    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    setupFilesAfterEnv: [
        "@testing-library/jest-dom"
    ],

    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};