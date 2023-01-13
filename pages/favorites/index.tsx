import { useEffect, useState } from 'react';
import { Card, Grid } from '@nextui-org/react';
import { Layout } from '../../components/layout';
import { NoFavorite } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemon } from '../../components/pokemon';

type Props = {};

const PokemonFavorito = (props: Props) => {
	const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

	useEffect(() => {
		setFavoritePokemons(localFavorites.pokemons());
	}, []);

	return (
		<Layout title={'favorite pokemon'}>
			{favoritePokemons.length === 0 
			? (<NoFavorite/>) 
			: (<FavoritePokemon pokemons={favoritePokemons}/>)}
		</Layout>
	);
};

export default PokemonFavorito;
