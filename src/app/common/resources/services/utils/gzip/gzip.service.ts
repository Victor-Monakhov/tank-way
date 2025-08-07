import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GzipService {

  async decompressGzip(compressedString: string): Promise<string> {
    const charData = atob(compressedString).split('').map(x => x.charCodeAt(0));
    const blob = new Blob([new Uint8Array(charData)]);
    const xmlText = await new Response(blob.stream().pipeThrough(new DecompressionStream('gzip'))).text();
    const charCodeStr = xmlText.split('').map(x => x.charCodeAt(0)).toString();
    const charArr = charCodeStr.split(',0').join('').split(',');
    return charArr.map(charCode => String.fromCharCode(charCode as unknown as number)).join('');
  }

  async compressGzip(text: string): Promise<string> {
    const bytes = text.split('').reduce((acc, char, i) => {
      acc[i] = char.charCodeAt(0);
      return acc;
    }, new Uint8Array(text.length));
    const blob = new Blob([bytes]);
    const buffer =
      await new Response(blob.stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

}
