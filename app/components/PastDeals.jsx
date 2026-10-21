"use client";

import { useState } from "react";

const deals = [
	{
		name: "The Palm Residence",
		location: "DHA Bahawalpur · 2025",
		image: "photo-1600607687939-ce8a6c25118c",
	},
	{
		name: "Garden Court Villas",
		location: "DHA Bahawalpur · 2025",
		image: "photo-1600607687920-4e2a09cf159d",
	},
	{
		name: "The Limestone House",
		location: "DHA Bahawalpur · 2024",
		image: "photo-1600566753086-00f18fb6b3ea",
	},
	{
		name: "Cedar Park Estate",
		location: "DHA Bahawalpur · 2024",
		image: "photo-1600210492486-724fe5c67fb0",
	},
	{
		name: "Oakwood Residence",
		location: "DHA Bahawalpur · 2023",
		image: "photo-1600607687644-c7171b42498f",
	},
];

function getImagePosition(pointerX, pointerY) {
	const imageWidth = Math.min(window.innerHeight * 0.6, window.innerWidth * 0.6);
	const imageHeight = window.innerHeight * 0.4;
	const minX = window.innerWidth * 0.4;
	const maxX = Math.max(minX, window.innerWidth - imageWidth);
	const horizontalProgress = Math.min(Math.max(pointerX / minX, 0), 1);
	return {
		left: minX + horizontalProgress * (maxX - minX),
		top: Math.min(Math.max(pointerY - imageHeight / 2, 0), window.innerHeight - imageHeight),
	};
}

export default function PastDeals() {
	const [activeDeal, setActiveDeal] = useState(null);
	const [imagePosition, setImagePosition] = useState({ left: 0, top: 0 });

	const showDeal = (index, event) => {
		setActiveDeal(index);
		if (typeof window !== "undefined") {
			const pointerX = Number.isFinite(event.clientX) ? event.clientX : window.innerWidth * 0.4;
			const pointerY = Number.isFinite(event.clientY) ? event.clientY : window.innerHeight / 2;
			setImagePosition(getImagePosition(pointerX, pointerY));
		}
	};

	return (
		<section aria-labelledby="past-deals-heading" className="relative w-full bg-stone-100 px-6 py-[12vh] text-stone-900 sm:px-10">
			<div className="mx-auto w-full max-w-7xl">
				<h2 id="past-deals-heading" className="mb-[8vh] font-lora text-[4vh] uppercase tracking-wide">
					Selected past deals
				</h2>
				<div>
					{deals.map((deal, index) => (
						<div
							className="past-deal-row flex h-[40vh] w-full items-center border-t border-stone-300"
							key={deal.name}
						>
							<button
								className={`past-deal-title flex h-full w-[40vw] flex-col justify-center text-left transition-transform duration-300 ease-out focus-visible:outline-none ${activeDeal === index ? "-translate-y-[2vh]" : "translate-y-0"}`}
								onMouseEnter={(event) => showDeal(index, event)}
								onMouseMove={(event) => {
									if (activeDeal === index) {
										setImagePosition(getImagePosition(event.clientX, event.clientY));
									}
								}}
								onMouseLeave={() => setActiveDeal(null)}
								onFocus={(event) => showDeal(index, event)}
								onBlur={() => setActiveDeal(null)}
								type="button"
							>
								<span className="font-lora text-[6vh] leading-[1.05]">{deal.name}</span>
								<span className="mt-4 text-sm uppercase tracking-[0.15em] text-stone-500">{deal.location}</span>
							</button>
						</div>
					))}
				</div>
			</div>
			{activeDeal !== null && (
				<img
					alt={`${deals[activeDeal].name} past property deal`}
					className="pointer-events-none fixed z-40 h-[40vh] w-[min(60vh,60vw)] rounded-md object-cover shadow-2xl"
					style={{ left: imagePosition.left, top: imagePosition.top }}
					src={`https://images.unsplash.com/${deals[activeDeal].image}?auto=format&fit=crop&w=1400&q=90`}
				/>
			)}
		</section>
	);
}
