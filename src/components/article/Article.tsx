// Импорт библиотеки clsx для условных классов
import clsx from 'clsx';

// Импорт изображения самолета и его использование в компоненте
import plane from 'src/images/plane.png';

// Импорт компонента Text для отображения текста с различными стилями
import { Text } from 'src/ui/text';

// Импорт стилей для компонента Article
import styles from './Article.module.scss';

// Определение компонента Article
export const Article = () => {
	return (
		// Основной контейнер статьи с применением стилей из Article.module.scss
		<article className={clsx(styles.article)}>
			{/* Заголовок с использованием компонента Text и динамическими стилями */}
			<Text as='h1' size={45} weight={800} uppercase dynamicLite>
				Портрет Западной Швейцарии
			</Text>
			<div className={styles.titleDescription}>
				{/* Описание заголовка с использованием компонента Text */}
				<Text size={22} weight={800} uppercase align='center' dynamicLite>
					Примитивист Фиштр расписывает новый бюджетный авиалайнер
				</Text>
			</div>
			{/* Изображение самолета с классом для стилизации */}
			<img className={styles.image} src={plane} alt='Картинка самолета' />
			{/* Текст с курсивным шрифтом и динамическими стилями */}
			<Text dynamic size={18} fontStyle='italic'>
				Фото: Hans-Peter Gauster , &quot;Bombardier CSeries CS300 HB-JCA&quot; ©
				2017 CC BY-SA 2.0
			</Text>
			{/* Описание о швейцарском авиалайнере с использованием компонента Text */}
			<Text dynamic size={18}>
				В конце 2016 года швейцарская авиакомпания Swiss получила свой первый
				канадский «Бомбардье CS300» для полётов малой и средней дальности. Чтобы
				придать новой 145-местной машине неповторимую индивидуальность, ливрею
				заказали живописцу. При условии, что эскиз он выполнит в одиночку и
				лично поправит роспись, когда её будут наносить на фюзеляж.
			</Text>
			<Text dynamic size={18}>
				Выбор пал на примитивиста Матиаса Форбаша, работающего под псевдонимом
				Фиштр. Ему поставили задачу изобразить всё лучшее во франкоговорящей
				части Швейцарии — горы, озёра, вина, сыры, доброжелательность и свободу.
				Заказ был выполнен в рекордный срок, всего за 5 месяцев. Самолёт
				получился похожим на самого художника: такой же добродушный и с улыбкой
				до ушей.
			</Text>
			<Text dynamic size={18}>
				С мая 2017 года &quot;Бомбардье&quot; носит имя &quot;Швейцарская
				Романдия&quot; и регистрационный номер HB-JCA ; совершает в среднем 4
				коммерческих полёта в сутки. Его можно видеть в &quot;Домодедово&quot;,
				а также в аэропортах Парижа, Валенсии, Кракова, Берлина, Вены, Загреба,
				на на Майорке, Крите и Сицилии. Самолёт останется в той же ливрее, пока
				его купит другая авиакомпания.
			</Text>
		</article>
	);
};
