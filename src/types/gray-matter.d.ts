declare module 'gray-matter' {
  type metaData = {
    title: string;
    description: string;
    tags: string[];
    category: string;
    img: string;
    plantedOn: string;
    tendedTo: string;
  };
  interface GrayMatterFile<metaData> {
    data: metaData;
    content: string;
    excerpt?: string;
    orig?: string;
  }

  interface GrayMatterOptions {
    excerpt?: (file: string, options: GrayMatterOptions) => string;
    engines?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [engine: string]: (input: string) => any;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default function matter<T = any>(input: string | Buffer, options?: GrayMatterOptions): GrayMatterFile<T>;
}
