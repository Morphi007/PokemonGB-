import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces';

type Props = {
	pokemons: SmallPokemon;
};

export const PokemonCard: FC<Props> = ({ pokemons }) => {
	const router = useRouter();

	const handlePokemon = () => {
		router.push(`/pokemon/${pokemons.id}`);
	};

	return (
		<Grid xs={6} sm={3} md={2} xl={1} key={pokemons.id}>
			<Card onClick={handlePokemon} isHoverable isPressable>
				<Card.Body css={{ p: 1 }}>
					<Card.Image src={pokemons.img} width="100%" height={140} alt={pokemons.name} />
				</Card.Body>
				<Card.Footer>
					<Row justify="space-between">
						<Text transform="capitalize">{pokemons.name}</Text>
						<Text>#{pokemons.id}</Text>
					</Row>
				</Card.Footer>
			</Card>
		</Grid>
	);
};
