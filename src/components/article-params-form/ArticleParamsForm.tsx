import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RefObject } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onFontFamilyChange: (fontFamily: OptionType) => void;
	onFontSizeChange: (fontSize: OptionType) => void;
	onFontColorChange: (fontColor: OptionType) => void;
	onBackgroundColorChange: (backgroundColor: OptionType) => void;
	onContentWidthChange: (contentWidth: OptionType) => void;
	onApplyStyles: () => void;
	onResetStyles: () => void;
	isOpen: boolean;
	onToggle: () => void;
	sidebarRef: RefObject<HTMLDivElement>;
};

export const ArticleParamsForm = ({
	articleState,
	onFontFamilyChange,
	onFontSizeChange,
	onFontColorChange,
	onBackgroundColorChange,
	onContentWidthChange,
	onApplyStyles,
	onResetStyles,
	isOpen,
	onToggle,
	sidebarRef,
}: ArticleParamsFormProps) => {
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={onFontFamilyChange}
						onClose={() => {}}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={onFontSizeChange}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={articleState.fontColor}
						onChange={onFontColorChange}
						onClose={() => {}}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={onBackgroundColorChange}
						onClose={() => {}}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={onContentWidthChange}
						onClose={() => {}}
						title='Ширина контейнера'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onResetStyles}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={onApplyStyles}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
