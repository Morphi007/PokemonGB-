import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { Layout } from '../../components/layout';
import { pokeApi } from '../../api';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { redirect } from 'next/dist/server/api-utils';

type Props = {
	pokemon: Pokemon;
};

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
	const [isInfavorites, setisInfavorites] = useState(
		localFavorites.existInfavorite(pokemon.id),
	);

	const onToggleFavorito = () => {
		localFavorites.toggleFavorite(pokemon.id);
		setisInfavorites(!isInfavorites);

		if (isInfavorites) return;

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: {
				x: 1,
				y: 0,
			},
		});
	};

	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card isHoverable isPressable css={{ paddin: '30px' }}>
						<Card.Body>
							<Card.Image
								src={pokemon.sprites.other?.dream_world.front_default || '/NO-IMAGE.png'}
								alt={pokemon.name}
								width="100%0"
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
							<Text h1 transform="capitalize">
								{pokemon.name}
							<Button  ghost={!isInfavorites} color="gradient" onPress={onToggleFavorito} css={{marginTop:"15px"}}>
								Guardar en favoritos
							</Button>
							</Text>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprite:</Text>
						</Card.Body>
						<Container direction="row" display="flex">
							<Image
								src={pokemon.sprites.front_default}
								alt={pokemon.name}
								width={100}
								height={100}
							/>
							<Image
								src={pokemon.sprites.back_default}
								alt={pokemon.name}
								width={100}
								height={100}
							/>
							<Image
								src={pokemon.sprites.front_shiny}
								alt={pokemon.name}
								width={100}
								height={100}
							/>
							<Image
								src={pokemon.sprites.back_shiny}
								alt={pokemon.name}
								width={100}
								height={100}
							/>
						</Container>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};
export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

	return {
		paths: pokemonNames.map((name) => ({ params: { name } })),
		//fallback: false,
		fallback: 'blocking',
	};
};

//getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { name } = params as { name: string };

	const pokemon = await getPokemonInfo(name);

	if (!pokemon) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			pokemon,
		},
		revalidate: 86400,
	};
};

export default PokemonByNamePage;
