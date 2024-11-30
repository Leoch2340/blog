import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType } from 'src/constants/articleProps'
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select'
import { RadioGroup } from 'src/ui/radio-group'
import { Separator } from 'src/ui/separator'

import styles from './ArticleParamsForm.module.scss';

type MenuState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
}

export const ArticleParamsForm = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
	const [menuState, setMenuState] = useState<MenuState>(defaultArticleState);
	const menuRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(evt.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleMenuToggle = () => {
		setIsMenuOpen(prev => !prev);
	};

	const handleParamChange = (key: keyof MenuState) => (value: OptionType) => {
		setMenuState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleParamsReset = () => {
		setMenuState(defaultArticleState)
	}

	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault()
		console.log(menuState);
	}

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleMenuToggle} />
			<aside
				ref={menuRef}
				className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form} onSubmit={handleFormSubmit} onReset={handleParamsReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'
						family='open-sans'
					>
						Задайте параметры
					</Text>
					<Select
						selected={menuState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleParamChange("fontFamilyOption")}
						onClose={() => { }}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={menuState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleParamChange("fontSizeOption")}
						title='Размер шрифта'
					/>
					<Select
						selected={menuState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleParamChange("fontColor")}
						onClose={() => { }}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={menuState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleParamChange("backgroundColor")}
						onClose={() => { }}
						title='Цвет фона'
					/>
					<Select
						selected={menuState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleParamChange("contentWidth")}
						onClose={() => { }}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" htmlType="reset" type="clear" />
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};
