import styles from './styles/index.module.scss';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { CSSProperties, useState } from 'react';

const App = () => {
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				settings={articleSettings}
				onChangeSettings={setArticleSettings}
			/>
			<Article />
		</main>
	);
};

export default App;
