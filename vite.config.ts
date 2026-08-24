import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const plugins = [tsconfigPaths(), svgr(), react()];

	if (mode === 'analyze') {
		plugins.push(
			visualizer({
				open: true,
				filename: 'dist/stats.html',
				template: 'flamegraph',
			})
		);
	}

	return {
		plugins,
		base: '/',
		server: {
			port: 8080,
			open: true,
		},
		build: {
			outDir: 'dist',
			assetsDir: 'static',
			sourcemap: false,
			rollupOptions: {
				output: {
					entryFileNames: 'static/scripts/[name].[hash].js',
					chunkFileNames: 'static/scripts/[name].[hash].js',
					assetFileNames: (assetInfo) => {
						const extType = assetInfo.name?.split('.').pop();
						if (/png|jpe?g|gif|webp|svg/i.test(extType || '')) {
							return 'static/images/[name].[hash][extname]';
						}
						if (/woff2?|eot|ttf|otf/i.test(extType || '')) {
							return 'static/fonts/[name].[hash][extname]';
						}
						if (/css/i.test(extType || '')) {
							return 'static/styles/[name].[hash][extname]';
						}
						return 'static/[name].[hash][extname]';
					},
				},
			},
			minify: 'esbuild',
		},
		css: {
			modules: {
				generateScopedName: '[name]__[local]__[hash:base64:5]',
			},
		},
	};
});
