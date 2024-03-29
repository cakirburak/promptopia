'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const Nav = () => {
	const [providers, setProviders] = useState(null)
	const [toggleDropdown, setToggleDropdown] = useState(false)
	const { data: session } = useSession()

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, [])

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href={'/'} className='flex gap-2 flex-center'>
				<Image
					src={'assets/images/logo.svg'}
					alt='Promptopia'
					width={34}
					height={34}
					className='object-contain'
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop View */}
			<div className="sm:flex hidden">
				{session?.user ?
					(
						<div className="flex gap-3 md:gap-6">
							<Link href={"/create-prompt"} className='outline_btn'>
								+ Create Prompt
							</Link>
							<Link href={"/profile"}>
								<Image
									src={session?.user.image}
									width={34}
									height={34}
									className='rounded-full'
									alt='profile'
								/>
							</Link>
							<button className="black_btn" type='button' onClick={signOut}>
								<FaSignOutAlt />
							</button>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map(provider => (
									<button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
										<FaSignInAlt />
									</button>
								))}
						</>
					)}
			</div>

			{/* Mobile View */}
			<div className="sm:hidden flex relative">
				{session?.user ?
					(
						<div className="flex">
							<Image
								src={session?.user.image}
								width={34}
								height={34}
								className='rounded-full'
								alt='profile'
								// you can simply write setToggleDropdown(!toggleDropdown) but it leads to unexpected behaviours 
								// this way we create another callback func inside the setState and prevent that
								onClick={() => setToggleDropdown((prev) => !prev)}
							/>

							{toggleDropdown && (
								<div className="dropdown">
									<Link
										href={"/profile"}
										className='dropdown_link'
										onClick={() => setToggleDropdown(false)}
									>
										Profile
									</Link>
									<Link
										href={"/create-prompt"}
										className='dropdown_link'
										onClick={() => setToggleDropdown(false)}
									>
										+ Create Prompt
									</Link>
									<button
										type='button'
										onClick={() => {
											setToggleDropdown(false)
											signOut()
										}}
										className='mt-5 w-full black_btn'
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map(provider => (
									<button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
										<FaSignInAlt />
									</button>
								))}
						</>
					)
				}
			</div>
		</nav>
	)
}

export default Nav