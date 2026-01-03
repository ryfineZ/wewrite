declare module 'marked-extended-tables' {
    import type { Token } from 'marked';

    export interface TableExtension {
      name: string;
      level: 'block' | 'inline';
      start(src: string): number | undefined;
      tokenizer(src: string, tokens: Token[]): Token;
      renderer(token: Token): string;
    }

    export default function(endRegex?: string[]): {
      extensions: TableExtension[];
    };
  }
