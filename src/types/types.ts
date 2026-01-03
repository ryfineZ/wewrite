import WeWritePlugin from "../main";

export interface DeepSeekResult {
    summary: string;
    corrections: {
        original: string;
        corrected: string;
    }[];
    polished: string;
    coverImage: string;
}




declare global {
	interface Window {
		electron: unknown;
		require: NodeJS.Require;
	}
}


export { };
