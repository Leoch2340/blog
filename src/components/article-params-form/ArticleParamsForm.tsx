import { useState, useRef, useEffect } from 'react';
import { defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps'
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select'
import { RadioGroup } from 'src/ui/radio-group'
import { Separator } from 'src/ui/separator'

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLElement | null>(null);

	const handleMenuToggle = () => {
		setIsMenuOpen(prev => !prev);
	};

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

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleMenuToggle} />
			<aside
				ref={menuRef}
				className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form}>
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
						selected={defaultArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={() => { }}
						onClose={() => { }}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={defaultArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={() => { }}
						title='Размер шрифта'
					/>
					<Select
						selected={defaultArticleState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={() => { }}
						onClose={() => { }}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={defaultArticleState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={() => { }}
						onClose={() => { }}
						title='Цвет фона'
					/>
					<Select
						selected={defaultArticleState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={() => { }}
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
