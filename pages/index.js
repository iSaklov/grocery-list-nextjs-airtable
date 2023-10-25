import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { table, minifyItems } from '../utils/Airtable'
import { ItemsContext } from '../context/items'
import Item from '../components/Item'
import ItemForm from '../components/ItemForm'

export default function Home({ initialItems }) {
	const { items, setItems } = useContext(ItemsContext)

	useEffect(() => {
		setItems(initialItems)
	}, [initialItems, setItems])

	return (
		<div className='container mx-auto my-6 max-w-xl'>
			<Head>
				<title>Grocery List by iSac</title>
			</Head>

			<main>
				<p className='text-2xl font-bold text-grey-800 py-2'>🛒 Grocery List</p>
				<ItemForm />
				<ul>
					{items &&
						items.map((item) => (
							<Item
								key={item.id}
								item={item}
							/>
						))}
				</ul>
			</main>
		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const items = await table.select({}).firstPage()
		return {
			props: {
				initialItems: minifyItems(items),
			},
		}
	} catch (error) {
		console.log(error)
		return {
			props: {
				err: 'Something went wrong 😕',
			},
		}
	}
}
