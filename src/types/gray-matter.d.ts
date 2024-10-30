declare module 'gray-matter' {
  interface GrayMatterFile<T> {
    data: T;
    content: string;
    excerpt?: string;
    orig?: string;
  }

  interface GrayMatterOptions {
    excerpt?: (file: string, options: GrayMatterOptions) => string;
    engines?: {
      [engine: string]: (input: string) => any;
    };
  }

  export default function matter<T = any>(
    input: string | Buffer,
    options?: GrayMatterOptions
  ): GrayMatterFile<T>;
}
