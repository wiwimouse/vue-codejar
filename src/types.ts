import { CodeJar } from 'codejar';

type CodejarOptions = Parameters<CodeJar['updateOptions']>[0];
type CodejarHighlight = Parameters<typeof CodeJar>[1];

export interface VueCodeJarProps {
  value?: string;
  options?: CodejarOptions;
  highlight?: CodejarHighlight;
}
