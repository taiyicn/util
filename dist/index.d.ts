/// <reference types="node" />
import { ThroughStream } from 'through';
<<<<<<< HEAD
export declare function getTypeScriptCompilerOptions(src: string): {
    [key: string]: any;
};
export declare function toFileUri(filePath: string): string;
export interface FilterStream extends NodeJS.ReadWriteStream {
    restore: ThroughStream;
}
export declare function filter(fn: (data: any) => boolean): FilterStream;
export declare function rimraf(dir: string): (cb: any) => void;
=======
export declare function rimraf(dir: string): (cb: any) => void;
export interface FilterStream extends NodeJS.ReadWriteStream {
    restore: ThroughStream;
}
export declare function filter(this: any, fn: (data: any) => boolean): FilterStream;
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
