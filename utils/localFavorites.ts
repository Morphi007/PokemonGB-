const toggleFavorite = (id: number) => {
	let favorite: number[] = JSON.parse(localStorage.getItem('favorito') || '[]');

	if (favorite.includes(id)) {
		favorite = favorite.filter((pokerId) => pokerId !== id);
	} else {
		favorite.push(id);
	}

	localStorage.setItem('favorito', JSON.stringify(favorite));
};

const existInfavorite = (id: number): boolean => {
	if (typeof window === 'undefined') return false;
	const favorite: number[] = JSON.parse(localStorage.getItem('favorito') || '[]');
	return favorite.includes(id);
};


const pokemons=():number[]=>{
  return JSON.parse(localStorage.getItem("favorito")||'[]');
  
}


export default { toggleFavorite, existInfavorite,pokemons};
