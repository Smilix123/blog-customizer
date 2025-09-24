import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для примененных стилей (отображаются в статье)
	const [appliedStyles, setAppliedStyles] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояние для предварительного просмотра (в форме)
	const [previewStyles, setPreviewStyles] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояние для сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isSidebarOpen
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const handleFontFamilyChange = (fontFamily: OptionType) => {
		setPreviewStyles((prev) => ({ ...prev, fontFamilyOption: fontFamily }));
	};

	const handleFontSizeChange = (fontSize: OptionType) => {
		setPreviewStyles((prev) => ({ ...prev, fontSizeOption: fontSize }));
	};

	const handleFontColorChange = (fontColor: OptionType) => {
		setPreviewStyles((prev) => ({ ...prev, fontColor: fontColor }));
	};

	const handleBackgroundColorChange = (backgroundColor: OptionType) => {
		setPreviewStyles((prev) => ({ ...prev, backgroundColor: backgroundColor }));
	};

	const handleContentWidthChange = (contentWidth: OptionType) => {
		setPreviewStyles((prev) => ({ ...prev, contentWidth: contentWidth }));
	};

	// Функция для применения стилей
	const handleApplyStyles = () => {
		setAppliedStyles(previewStyles);
	};

	// Функция для сброса стилей
	const handleResetStyles = () => {
		setPreviewStyles(defaultArticleState);
		setAppliedStyles(defaultArticleState);
	};

	// Обработчик для переключения сайдбара
	const handleSidebarToggle = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedStyles.fontFamilyOption.value,
					'--font-size': appliedStyles.fontSizeOption.value,
					'--font-color': appliedStyles.fontColor.value,
					'--container-width': appliedStyles.contentWidth.value,
					'--bg-color': appliedStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={previewStyles}
				onFontFamilyChange={handleFontFamilyChange}
				onFontSizeChange={handleFontSizeChange}
				onFontColorChange={handleFontColorChange}
				onBackgroundColorChange={handleBackgroundColorChange}
				onContentWidthChange={handleContentWidthChange}
				onApplyStyles={handleApplyStyles}
				onResetStyles={handleResetStyles}
				isOpen={isSidebarOpen}
				onToggle={handleSidebarToggle}
				sidebarRef={sidebarRef}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
