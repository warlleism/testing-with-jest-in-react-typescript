export default {
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: [
        "<rootDir>/jest.polyfills.js"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom"
    ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};