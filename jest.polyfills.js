// Polyfill for TextEncoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Additional polyfills if needed
global.Blob = require('node:buffer').Blob;
