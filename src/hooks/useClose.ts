// Импорт хука useEffect из React
import { useEffect } from 'react';

// Тип для пропсов хука useClose
type TUseClose = {
	isOpen: boolean; // Флаг, указывающий открыт ли элемент
	onClose: () => void; // Функция для закрытия элемента
	rootRef: React.RefObject<HTMLElement>; // Ref на DOM-элемент, который нужно отслеживать
};

// Кастомный хук для закрытия элемента при клике вне его или нажатии Escape
export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		// Если элемент закрыт, ничего не делаем
		if (!isOpen) return;

		// Обработчик клика вне элемента
		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			// Проверяем, что клик был вне элемента:
			// 1. target является DOM-узлом
			// 2. rootRef.current существует
			// 3. Клик не внутри rootRef.current
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);

			// Если клик был снаружи, вызываем onClose
			if (isOutsideClick) {
				onClose();
			}
		}

		// Обработчик нажатия клавиши Escape
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		// Добавляем обработчики событий
		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		// Функция очистки - удаляем обработчики при размонтировании
		// или при изменении зависимостей
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, rootRef]); // Зависимости эффекта
}
