import NextLink from 'next/link';
import Image from 'next/image';
import { Link, Spacer, Text, useTheme } from '@nextui-org/react';

export const Navbar = () => {
	const { theme } = useTheme();
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'start',
				padding: '0x 50px',
				background: theme?.colors.gray500.value,
			}}
		>
			<Image
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
				alt="Icon App"
				width={70}
				height={70}
			/>

			<NextLink href="/" passHref style={{display:'flex',color:"white"}}>
				<Text color="whiter" h2>
					P
				</Text>
				<Text color="whiter" h3>
					okémon
				</Text>
			</NextLink>
			<Spacer css={{ flex: 1 }}></Spacer>

			<NextLink href="/favorites" passHref>
				<Text css={{ marginRight: '10px', color: 'White' }} color="whiter" h2>
					Favorito
				</Text>
			</NextLink>
		</div>
	);
};
