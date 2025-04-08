// Декларация модуля для SVG файлов
declare module '*.svg' {
	// Импорт React для типизации
	import React = require('react');

	// Экспорт React компонента SVG как функционального компонента
	// с пропсами для SVG элемента
	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement>
	>;

	// Экспорт SVG как строки (путь к файлу)
	const src: string;
	export default src;
}

// Декларация модуля для PNG файлов (без дополнительных экспортов)
declare module '*.png';

// Декларация модуля для JPG файлов (без дополнительных экспортов)
declare module '*.jpg';

// Декларация модуля для JSON файлов (без дополнительных экспортов)
declare module '*.json';

// Декларация модуля для CSS модулей
declare module '*.module.css' {
	// Объект, где ключи - имена классов, значения - сгенерированные имена
	const classes: { [key: string]: string };
	export default classes;
}

// Декларация модуля для SCSS модулей
declare module '*.module.scss' {
	// Аналогично CSS модулям
	const classes: { [key: string]: string };
	export default classes;
}

// Декларация модуля для SASS модулей
declare module '*.module.sass' {
	// Аналогично CSS модулям
	const classes: { [key: string]: string };
	export default classes;
}
