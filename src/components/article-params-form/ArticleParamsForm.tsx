import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={fontFamilyOptions[0]}
						onChange={() => {}}
						onClose={() => {}}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						onChange={() => {}}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={fontColors[0]}
						onChange={() => {}}
						onClose={() => {}}
						title='Цвет шрифта'
					/>

					<Select
						options={backgroundColors}
						selected={backgroundColors[0]}
						onChange={() => {}}
						onClose={() => {}}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={contentWidthArr[0]}
						onChange={() => {}}
						onClose={() => {}}
						title='Ширина контейнера'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
