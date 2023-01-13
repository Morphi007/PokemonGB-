import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from "canvas-confetti"
import { pokeApi } from '../../api';
import { Layout } from '../../components/layout';
import { Pokemon } from '../../interfaces';
import Image from 'next/image';
import { localFavorites } from '../../utils';

type Props = {
	pokemon: Pokemon;
};

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	
	const [isInfavorites, setisInfavorites] = useState(localFavorites.existInfavorite(pokemon.id));
	
	const  onToggleFavorito =()=>{
        localFavorites.toggleFavorite(pokemon.id)
		setisInfavorites(!isInfavorites)
		console.log(isInfavorites)

		if(isInfavorites)return
        
		confetti({
			zIndex:999,
			particleCount:100,
			spread:160,
			angle:-100,
			origin:{
				x:1,
				y:0,
			}
		})
	
	}
	
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
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform="capitalize">
								{pokemon.name}
							</Text>
							<Button ghost={!isInfavorites}  color="gradient"  onPress={onToggleFavorito}  >
								Guardar en favoritos
							</Button>
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

//getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
	const pokemons151 = [];

	for (let i = 1; i <= 151; i++) {
		pokemons151.push(i.toString());
	}
	return {
		paths: pokemons151.map((id) => ({ params: { id } })),
		fallback: false,
	};
};
//getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string };
	const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

	return {
		props: {
			pokemon: data,
		},
	};
};

export default PokemonPage;
