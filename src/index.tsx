// Импорт необходимых модулей из React и других библиотек
import { createRoot } from 'react-dom/client'; // Для создания корня React приложения
import { StrictMode, CSSProperties, useState } from 'react'; // React хуки и компоненты
import clsx from 'clsx'; // Библиотека для удобного объединения классов

// Импорт компонентов приложения
import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	MenuState,
} from './components/article-params-form/ArticleParamsForm';

// Импорт констант и стилей
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss'; // Глобальные стили
import styles from './styles/index.module.scss'; // Стили модули

// Получаем корневой DOM-элемент и создаем корень React приложения
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Основной компонент приложения
const App = () => {
	// Состояние для параметров статьи с начальным значением из defaultArticleState
	const [articleParams, setArticleParams] =
		useState<MenuState>(defaultArticleState);

	return (
		<main
			// Используем clsx для объединения классов
			className={clsx(styles.main)}
			// Динамические CSS переменные для стилизации
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties // Приведение типа к CSSProperties
			}>
			{/* Форма для изменения параметров статьи */}
			<ArticleParamsForm onSubmit={setArticleParams} />
			{/* Компонент статьи */}
			<Article />
		</main>
	);
};

// Рендерим приложение в StrictMode для выявления потенциальных проблем
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
