import '@testing-library/jest-dom/';
import { TextEncoder, TextDecoder } from 'util';
 
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
 
// Mock ResizeObserver
class ResizeObserver {
 observe() {}
 unobserve() {}
 disconnect() {}
}
global.ResizeObserver = ResizeObserver;