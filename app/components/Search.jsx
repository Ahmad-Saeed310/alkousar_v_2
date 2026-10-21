"use client";

import { useMemo, useState } from "react";

const properties = [
	{
		name: "The Courtyard Villa",
		location: "DHA Bahawalpur",
		category: "Villa",
		price: "PKR 4.8 Cr",
		image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
		hoverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
	},
	{
		name: "Oakwood Residence",
		location: "DHA Bahawalpur",
		category: "House",
		price: "PKR 3.2 Cr",
		image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
		hoverImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
	},
	{
		name: "Palm Grove Estate",
		location: "DHA Bahawalpur",
		category: "Villa",
		price: "PKR 5.6 Cr",
		image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
		hoverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
	},
	{
		name: "The Limestone House",
		location: "DHA Bahawalpur",
		category: "House",
		price: "PKR 2.9 Cr",
		image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
		hoverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
	},
	{
		name: "Garden View Villa",
		location: "DHA Bahawalpur",
		category: "Villa",
		price: "PKR 4.1 Cr",
		image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
		hoverImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
	},
	{
		name: "Cedar Park Residence",
		location: "DHA Bahawalpur",
		category: "House",
		price: "PKR 3.7 Cr",
		image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
		hoverImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
	},
];

export default function Search() {
	const [query, setQuery] = useState("");
	const filteredProperties = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		if (!normalizedQuery) return properties;
		return properties.filter((property) =>
			[property.name, property.location, property.category]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery),
		);
	}, [query]);

	return (
		<section
			aria-labelledby="property-search-heading"
			className="min-h-[150vh] w-full bg-stone-50 px-6 py-[10vh] text-stone-900 sm:px-10"
		>
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center">
				<h2 id="property-search-heading" className="mb-8 text-center font-lora text-[4vh]">
					Find your place
				</h2>
				<label className="mb-[8vh] flex w-full max-w-2xl items-center gap-3 rounded-full border border-stone-300 bg-white px-6 py-4 shadow-sm focus-within:border-stone-900">
					<span className="sr-only">Search properties</span>
					<svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<circle cx="11" cy="11" r="7" strokeWidth="1.5" />
						<path d="m16 16 4 4" strokeWidth="1.5" strokeLinecap="round" />
					</svg>
					<input
						className="w-full bg-transparent text-base outline-none placeholder:text-stone-500"
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search by property, location, or type"
						value={query}
					/>
				</label>

				<div className="property-grid grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
					{filteredProperties.map((property) => (
						<article className="property-card group relative min-w-0 overflow-hidden rounded-md bg-stone-200 text-white" key={property.name} tabIndex={0}>
							<div className="relative aspect-[4/5] min-h-[48vh] overflow-hidden rounded-md bg-stone-200">
								<img
									alt={`${property.name}, ${property.location}`}
									className="property-card-image absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-focus-within:opacity-0"
									src={property.image}
								/>
								<img
									alt=""
									aria-hidden="true"
									className="property-card-image absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100"
									src={property.hoverImage}
								/>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
								<div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
									<p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/85">{property.category}</p>
									<div className="flex items-end justify-between gap-4">
										<div>
											<h3 className="font-lora text-2xl text-white">{property.name}</h3>
											<p className="mt-1 text-sm text-white/85">{property.location}</p>
										</div>
										<p className="shrink-0 text-sm text-white">{property.price}</p>
									</div>
								</div>
							</div>
						</article>
					))}
					{filteredProperties.length === 0 && (
						<p className="col-span-full py-12 text-center text-stone-600">
							No properties match “{query}”. Try another search.
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
