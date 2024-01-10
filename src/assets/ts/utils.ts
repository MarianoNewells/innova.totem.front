export class utils { 
    capitalizeFirstLetter(text: string): string {
        return text.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
          return match.toUpperCase();
        });
      }
      _base64ToArrayBuffer(base64: string) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
      }
} 
