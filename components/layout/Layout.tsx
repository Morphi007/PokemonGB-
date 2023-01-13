import React, { Children, FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

type Props = {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	keywords?: string[];
	url?: string;
	image?: string;
};

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || 'Pokemon App'}</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<meta name="autor" content="ZMorphy" />
				<meta name="description" content={`Informacion sobre el pokemon ${title}`} />
				<meta name="keywords" content={`${title},pokemon,pokedex`} />
			</Head>
			<Navbar />
			<main style={{ padding: '0px 20px' }}>{children}</main>
		</>
	);
};
