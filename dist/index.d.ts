/// <reference types="node" />
import { ThroughStream } from 'through';
export declare function rimraf(dir: string): (cb: any) => void;
export interface FilterStream extends NodeJS.ReadWriteStream {
    restore: ThroughStream;
}
export declare function filter(this: any, fn: (data: any) => boolean): FilterStream;
