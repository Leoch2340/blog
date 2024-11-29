import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLElement | null>(null);

	const handleMenuToggle = () => {
		setIsMenuOpen(prev => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(evt.target as Node)) {
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
				ref={sidebarRef}
				className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" htmlType="reset" type="clear" />
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};
