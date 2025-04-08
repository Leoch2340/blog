// Импортирование необходимых хуков и компонентов
import { useState, useRef, SyntheticEvent } from 'react';
import {
	// Импорт различных параметров и типов, связанных с параметрами статьи
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

// Импорт стилей для компонента
import styles from './ArticleParamsForm.module.scss';

// Импорт пользовательского хука для закрытия меню при клике за его пределами
import { useClose } from 'src/hooks/useClose';

// Импорт clsx для условного применения классов
import clsx from 'clsx';

// Тип для состояния меню параметров статьи
export type MenuState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

// Тип пропсов для компонента ArticleParamsForm
type ArticleParamsFormProps = {
	// Функция для обработки отправки параметров формы
	onSubmit: (params: MenuState) => void;
};

// Основной компонент для формы параметров статьи
export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	// Состояние для открытия/закрытия меню
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	// Состояние для хранения выбранных параметров меню
	const [menuState, setMenuState] = useState<MenuState>(defaultArticleState);
	// Ссылка на элемент меню для отслеживания кликов за его пределами
	const menuRef = useRef<HTMLElement | null>(null);

	// Функция для переключения состояния меню (открыто/закрыто)
	const handleMenuToggle = () => {
		setIsMenuOpen((prev) => !prev);
	};

	// Функция для закрытия меню
	const handleMenuClose = () => {
		setIsMenuOpen(false);
	};

	// Функция для изменения параметров в состоянии меню
	const handleParamChange = (key: keyof MenuState) => (value: OptionType) => {
		setMenuState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	// Функция для сброса параметров формы в значения по умолчанию
	const handleParamsReset = () => {
		setMenuState(defaultArticleState);
		props.onSubmit(defaultArticleState);
	};

	// Функция для обработки отправки формы
	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault(); // Отмена стандартного поведения формы
		props.onSubmit(menuState); // Отправка текущих параметров
	};

	// Использование хука для закрытия меню при клике за его пределами
	useClose({
		isOpen: isMenuOpen,
		onClose: handleMenuClose,
		rootRef: menuRef,
	});

	// Классы для контейнера меню, включая состояние открыто/закрыто
	const menuClassName = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});

	return (
		<>
			{/* Кнопка для переключения состояния меню */}
			<ArrowButton isOpen={isMenuOpen} onClick={handleMenuToggle} />
			{/* Меню с формой, которое может быть открыто/закрыто */}
			<aside ref={menuRef} className={menuClassName}>
				{/* Форма для параметров статьи */}
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleParamsReset}>
					{/* Заголовок формы */}
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					{/* Выбор шрифта */}
					<Select
						selected={menuState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleParamChange('fontFamilyOption')}
						onClose={() => {}}
						title='Шрифт'
					/>
					{/* Выбор размера шрифта */}
					<RadioGroup
						name='fontSize'
						selected={menuState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleParamChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					{/* Выбор цвета шрифта */}
					<Select
						selected={menuState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleParamChange('fontColor')}
						onClose={() => {}}
						title='Цвет шрифта'
					/>
					{/* Разделитель между блоками */}
					<Separator />
					{/* Выбор цвета фона */}
					<Select
						selected={menuState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleParamChange('backgroundColor')}
						onClose={() => {}}
						title='Цвет фона'
					/>
					{/* Выбор ширины контента */}
					<Select
						selected={menuState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleParamChange('contentWidth')}
						onClose={() => {}}
						title='Ширина контента'
					/>
					{/* Контейнер для кнопок сброса и применения */}
					<div className={styles.bottomContainer}>
						{/* Кнопка для сброса параметров */}
						<Button title='Сбросить' htmlType='reset' type='clear' />
						{/* Кнопка для применения параметров */}
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
