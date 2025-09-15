import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	settings: typeof defaultArticleState;
	onChangeSettings: (newSettings: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	settings,
	onChangeSettings,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState(settings.fontFamilyOption);
	const [fontSize, setFontSize] = useState(settings.fontSizeOption);
	const [fontColor, setFontColor] = useState(settings.fontColor);
	const [bgColor, setBgColor] = useState(settings.backgroundColor);
	const [contentWidth, setContentWidth] = useState(settings.contentWidth);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		onChangeSettings({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor,
			backgroundColor: bgColor,
			contentWidth,
		});
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onChangeSettings({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (!sidebarRef.current?.contains(e.target as Node)) {
				setIsFormOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setIsFormOpen(!isFormOpen);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						placeholder={fontFamily.title}
						onChange={(selected) => setFontFamily(selected)}
						onClose={() => {}}
						title='шрифт'
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={(selected) => setFontSize(selected)}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						placeholder={fontColor.title}
						onChange={(selected) => setFontColor(selected)}
						onClose={() => {}}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						placeholder={bgColor.title}
						onChange={(selected) => setBgColor(selected)}
						onClose={() => {}}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						placeholder={contentWidth.title}
						onChange={(selected) => setContentWidth(selected)}
						onClose={() => {}}
						title='ширина контента'
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
