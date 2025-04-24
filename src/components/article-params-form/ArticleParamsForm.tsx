import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef, FormEvent } from 'react';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null);
	const [formState, setFormState] = useState(defaultArticleState);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setAppState(formState);
	};

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((currentIsOpened) => !currentIsOpened);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
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
