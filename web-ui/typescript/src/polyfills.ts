// Polyfills pour les variables globales Node.js
if (typeof global === 'undefined') {
  (window as any).global = window;
}

if (typeof process === 'undefined') {
  (window as any).process = { env: {} };
}

// Polyfill pour Buffer si nécessaire (utilise TextEncoder/TextDecoder)
if (typeof Buffer === 'undefined') {
  (window as any).Buffer = {
    from: (data: string | Uint8Array) => {
      if (typeof data === 'string') {
        return new TextEncoder().encode(data);
      }
      return data;
    },
    alloc: (size: number) => new Uint8Array(size),
    allocUnsafe: (size: number) => new Uint8Array(size)
  };
}

// Polyfill pour crypto si nécessaire
if (typeof crypto === 'undefined') {
  (window as any).crypto = window.crypto || {
    getRandomValues: (array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
} 