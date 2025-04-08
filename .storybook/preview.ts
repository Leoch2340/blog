// Импорт типа Preview из Storybook для типизации конфигурации
import type { Preview } from '@storybook/react';

// Импорт декоратора StoryDecorator для использования в истории
import { StoryDecorator } from '../src/ui/story-decorator/StoryDecorator';

// Определение конфигурации preview для Storybook
const preview: Preview = {
	parameters: {
		// Указание параметров для автоматических действий в Storybook
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			// Настройка сопоставлений для контроля различных типов данных
			matchers: {
				// Совпадение для параметров цвета (например, background или color)
				color: /(background|color)$/i,
				// Совпадение для параметров даты
				date: /Date$/i,
			},
		},
	},
	// Список декораторов, которые будут применяться к каждой истории
	decorators: [StoryDecorator],
};

// Экспорт конфигурации preview по умолчанию
export default preview;
