import	React			from	'react';
import	Image			from	'next/image';
import	{useRouter}		from	'next/router';
import	Paragraphs		from	'components/articleSystem/Paragraphs';

function	Article() {
	const	router = useRouter();
	const	[articles, set_articles] = React.useState(null);

	React.useEffect(() => {
		try {
			const	_pageName = router.pathname === '/' ? '/index' : router.pathname;
			const	_articles = require(`/localization/${router.locale}${_pageName}.json`);
			set_articles(_articles);	
		} catch (error) {/**/}
	}, [router]);

	function	renderIcon(article) {
		if (article?.icon?.type === 'svg') {
			return (
				<span
					dangerouslySetInnerHTML={{__html: article.icon.src}} />
			);
		}
		if (article?.icon?.type === 'img') {
			return (
				<Image
					quality={90}
					src={article.icon.src}
					width={article.icon?.width || 40}
					height={article.icon?.height || 40}
					objectFit={'contain'}
					loading={'eager'} />
			);
		}
		return (null);
	}
	if (!articles) {
		return (null);
	}

	return (
		<section className={'space-y-16'}>
			{articles.map((article, index) => (
				<div key={`section_${index}`} className={'w-full mt-10 md:mt-20 pt-2'}>
					<div className={'flex flex-col'}>
						<div className={'mb-8'}>
							{renderIcon(article)}
						</div>
						<div className={'mb-8'}>
							<h1 className={'text-4xl md:text-6xl text-ygray-100 font-bold whitespace-pre'}>
								{article.title.map(({text, style}) => {
									if (style === 'highlight')
										return <span className={'text-yblue'}>{text}</span>;
									return text;
								})}
							</h1>
							{article.subtitle ? <div className={'mt-6'}>
								<i className={'text-ygray-200'}>
									{article.subtitle}
								</i>
							</div> : null}
						</div>
						<Paragraphs paragraphs={article.paragraphs} />
					</div>
				</div>
			))}
		</section>
	);
}

export default Article;
