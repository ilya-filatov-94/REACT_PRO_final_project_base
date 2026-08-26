/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module '*.svg' {
	import * as React from 'react';
	const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;
	export default ReactComponent;
}

declare module '*.svg?url' {
	const src: string;
	export default src;
}
