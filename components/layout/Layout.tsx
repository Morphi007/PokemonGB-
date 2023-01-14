import React, { Children, FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';
import { useRouter } from 'next/router';

type Props = {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	keywords?: string[];
	url?: string;
	image?: string;
};

const origin = typeof window === 'undefined' ? '' : window.origin;

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || 'Pokemon App'}</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<meta name="autor" content="ZMorphy" />
				<meta name="description" content={`Informacion sobre el pokemon ${title}`} />
				<meta name="keywords" content={`${title},pokemon,pokedex`} />

				<meta property="og:title" content={`informacion sobre ${title}`} />
				<meta property="og:description" content={`esta es la pagina sobre ${title}`} />
				<meta property="og:image" content={`${origin}/img/banner.png`} />
			</Head>
			<Navbar />
			<main style={{ padding: '0px 20px' }}>{children}</main>
		</>
	);
};
