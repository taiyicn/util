/// <reference types="node" />
import { ThroughStream } from 'through';
export declare function getTypeScriptCompilerOptions(src: string): {
    [key: string]: any;
};
export declare function toFileUri(filePath: string): string;
export interface FilterStream extends NodeJS.ReadWriteStream {
    restore: ThroughStream;
}
export declare function filter(fn: (data: any) => boolean): FilterStream;
export declare function rimraf(dir: string): (cb: any) => void;
