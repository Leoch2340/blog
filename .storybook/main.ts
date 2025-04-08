// Импорт типа конфигурации для Storybook с использованием Webpack 5
import type { StorybookConfig } from '@storybook/react-webpack5';

// Импорт модуля path для работы с путями файлов
const path = require('path');

// Определение конфигурации Storybook
const config: StorybookConfig = {
	// Указание путей, где Storybook будет искать файлы истории (stories)
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

	// Добавление набора плагинов и дополнений для Storybook
	addons: [
		// Плагин для создания ссылок между историями
		'@storybook/addon-links',
		// Основной набор плагинов для Storybook (например, кнопки, действия и т.д.)
		'@storybook/addon-essentials',
		// Плагин для обучающих подсказок при первом запуске
		'@storybook/addon-onboarding',
		// Плагин для добавления интерактивности в истории
		'@storybook/addon-interactions',
		// Плагин для стилизации с использованием Webpack
		'@storybook/addon-styling-webpack',
		{
			// Настройка плагина для стилизации с использованием Webpack
			name: '@storybook/addon-styling-webpack',
			options: {
				// Указание правил обработки CSS и SCSS файлов
				rules: [
					{
						// Правило для обработки файлов с расширением .css
						test: /\.css$/,
						// Указание, что файлы .css имеют побочные эффекты
						sideEffects: true,
						// Используемые загрузчики для обработки CSS файлов
						use: [
							// Использование style-loader для вставки CSS в DOM
							require.resolve('style-loader'),
							{
								// Использование css-loader для обработки CSS файлов
								loader: require.resolve('css-loader'),
								options: {
									// Настройки для работы с CSS-модулями
									modules: {
										auto: true,
									},
								},
							},
						],
					},
					{
						// Правило для обработки файлов с расширением .scss и .sass
						test: /\.s[ac]ss$/,
						// Указание, что файлы .scss и .sass имеют побочные эффекты
						sideEffects: true,
						// Используемые загрузчики для обработки SCSS файлов
						use: [
							// Использование style-loader для вставки стилей в DOM
							require.resolve('style-loader'),
							{
								// Использование css-loader для обработки SCSS файлов
								loader: require.resolve('css-loader'),
								options: {
									// Настройки для работы с CSS-модулями
									modules: {
										auto: true,
									},
									// Указание количества загрузчиков, применяемых до css-loader
									importLoaders: 2,
								},
							},
							// Использование resolve-url-loader для разрешения относительных путей в файлах CSS
							require.resolve('resolve-url-loader'),
							{
								// Использование sass-loader для обработки файлов SCSS
								loader: require.resolve('sass-loader'),
								options: {
									// Настройки для sass-loader
									implementation: require.resolve('sass'),
									sourceMap: true,
									// Дополнительные параметры для работы с Sass
									sassOptions: {},
								},
							},
						],
					},
				],
			},
		},
		// Плагин для использования компилятора SWC с Webpack 5
		'@storybook/addon-webpack5-compiler-swc',
	],

	// Настройка финального Webpack-конфига
	webpackFinal: async (config) => {
		// Проверка на наличие alias в конфиге
		if (config?.resolve?.alias) {
			// Установка alias для удобной работы с путями
			config.resolve.alias = {
				// Alias для папки с шрифтами
				fonts: path.resolve(__dirname, '..', './src/fonts'),
				// Alias для исходной директории src
				src: path.resolve(__dirname, '..', './src'),
				// Alias для компонентов
				components: path.resolve(__dirname, '..', './src/components'),
			};
		}

		// Возврат модифицированного конфига
		return config;
	},

	// Использование фреймворка React с Webpack 5
	framework: '@storybook/react-webpack5',

	// Настройка для SWC компилятора
	swc: () => ({
		jsc: {
			transform: {
				react: {
					// Использование автоматического runtime для React
					runtime: 'automatic',
				},
			},
		},
	}),

	// Настройка документации для Storybook
	docs: {
		// Автоматическое создание документации из тегов
		autodocs: 'tag',
	},
};

// Экспорт конфигурации по умолчанию
export default config;
