// src/types/onnxruntime-web.d.ts

declare module 'onnxruntime-web' {
    export class InferenceSession {
      static create(path: string, options?: any): Promise<InferenceSession>;
      run(feeds: Record<string, any>): Promise<Record<string, any>>;
    }
  
    export class Tensor<T> {
      constructor(type: string, data: T[] | Float32Array, dims: number[]);
      data: T[] | Float32Array;
    }
  
    export const env: {
      wasm: {
        proxy: boolean;
        numThreads: number;
      };
    };
  }