"use client";

import { useEffect, useRef, useState } from "react";

const team = [
	{ name: "Ayesha Khan", role: "Managing Director", image: "photo-1534528741775-53994a69daeb" },
	{ name: "Hamza Malik", role: "Property Consultant", image: "photo-1500648767791-00dcc994a43e" },
	{ name: "Zara Ahmed", role: "Investment Advisor", image: "photo-1531123897727-8f129e1688ce" },
	{ name: "Usman Raza", role: "Senior Sales Consultant", image: "photo-1506794778202-cad84cf45f1d" },
	{ name: "Maham Siddiqui", role: "Client Relations", image: "photo-1524504388940-b1c1722653e1" },
	{ name: "Bilal Hussain", role: "Property Consultant", image: "photo-1507003211169-0a1dd7228f2d" },
	{ name: "Hira Shah", role: "Marketing Lead", image: "photo-1517841905240-472988babdf9" },
	{ name: "Daniyal Qureshi", role: "Investment Advisor", image: "photo-1506794778202-cad84cf45f1d" },
	{ name: "Noor Fatima", role: "Client Relations", image: "photo-1529139574466-a303027c1d8b" },
	{ name: "Saad Iqbal", role: "Property Consultant", image: "photo-1500648767791-00dcc994a43e" },
	{ name: "Mina Tariq", role: "Sales Consultant", image: "photo-1534528741775-53994a69daeb" },
	{ name: "Omar Farooq", role: "Property Advisor", image: "photo-1507003211169-0a1dd7228f2d" },
];

const portraitUrl = (image) =>
	`https://images.unsplash.com/${image}?auto=format&fit=crop&w=1200&q=85`;

export default function TeamSection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const nameRefs = useRef([]);
	const scrollFrame = useRef(null);

	useEffect(() => {
		const updateActiveName = () => {
			const markerY = window.innerHeight * 0.7;
			let closestIndex = 0;
			let closestDistance = Infinity;

			nameRefs.current.forEach((element, index) => {
				if (!element) return;
				const bounds = element.getBoundingClientRect();
				const centerY = bounds.top + bounds.height / 2;
				const distance = Math.abs(centerY - markerY);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});

			setActiveIndex(closestIndex);
		};

		const onScroll = () => {
			if (scrollFrame.current !== null) return;
			scrollFrame.current = window.requestAnimationFrame(() => {
				updateActiveName();
				scrollFrame.current = null;
			});
		};

		updateActiveName();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
		};
	}, []);

	const activePerson = team[activeIndex];

	return (
		<section aria-labelledby="team-heading" className="relative bg-stone-950 px-6 text-white sm:px-10">
			<div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 sm:gap-12">
				<div className="py-[12vh]">
					<h2 id="team-heading" className="mb-[8vh] text-center font-lora text-[5vh]">Our team</h2>
					<ul className="list-none p-0">
						{team.map((person, index) => (
							<li
								className="flex min-h-[38vh] items-center justify-center"
								key={person.name}
								ref={(element) => { nameRefs.current[index] = element; }}
							>
								<button
									aria-pressed={activeIndex === index}
									className={`text-center font-lora text-[clamp(1.25rem,3.2vw,3.5rem)] transition-colors duration-300 hover:text-stone-400 focus-visible:text-stone-400 focus-visible:outline-none ${activeIndex === index ? "text-white" : "text-stone-500"}`}
									onFocus={() => setActiveIndex(index)}
									onMouseEnter={() => setActiveIndex(index)}
									type="button"
								>
									{person.name}
								</button>
							</li>
						))}
					</ul>
				</div>

				<aside className="sticky top-[15vh] my-[15vh] h-[70vh] self-start">
					<figure className="relative h-full w-full overflow-hidden rounded-md bg-stone-800">
						{team.map((person, index) => (
							<img
								alt={person.name}
								aria-hidden={activeIndex !== index}
								className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
								key={person.name}
								src={portraitUrl(person.image)}
							/>
						))}
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
						<figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
							<p className="font-lora text-2xl sm:text-3xl">{activePerson.name}</p>
							<p className="mt-1 text-sm text-white/80">{activePerson.role}</p>
						</figcaption>
					</figure>
				</aside>
			</div>
		</section>
	);
}
