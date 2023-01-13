import React, { FC } from 'react';
import { Card, Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from './';
import { useRouter } from 'next/router';

type Props = {
	pokemons: number[];
};

export const FavoritePokemon: FC<Props> = ({ pokemons }) => {

    useRouter
	return (
		<Grid.Container gap={2} direction="row" justify="flex-start">
			{pokemons.map((id) => (
				<FavoriteCardPokemon key={id} pokemonId={id} />
			))}
		</Grid.Container>
	);
};
