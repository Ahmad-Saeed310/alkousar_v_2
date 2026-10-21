"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
	{
		image:
			"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90",
		alt: "Contemporary home surrounded by a quiet landscape",
	},
	{
		image:
			"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90",
		alt: "Warm, modern living room with natural materials",
	},
	{
		image:
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
		alt: "Minimalist architecture framed by greenery",
	},
	{
		image:
			"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90",
		alt: "Sunlit interior with a view of the garden",
	},
];

const navigation = [
	["Al-Kousar", "#name"],
	["Projects", "#projects"],
	["Gallery", "#gallery"],
	["Insights", "#insights"],
	["Real estate agency", "#real-estate-agency"],
	["Contact", "#contact"],
];

function renderNavigationItem([label, href]) {
	return (
		<a
			aria-label={label === "Real estate agency" ? label : undefined}
			className="overflow-hidden text-sm transition-opacity duration-200 hover:opacity-60 sm:text-base"
			data-nav-item
			data-agency={label === "Real estate agency" ? "" : undefined}
			href={href}
			key={label}
		>
			{label === "Al-Kousar" ? (
				<span className="overflow-hidden">
					<span className="inline-block left-0" data-name-text>
						{label}
					</span>
				</span>
			) : label === "Real estate agency" ? (
				<>
					<span className="sr-only">{label}</span>
					<span aria-hidden="true" className="inline-flex">
						{Array.from(label).map((letter, index) => (
							<span className="inline-block right-0 overflow-hidden" key={`${letter}-${index}`}>
								<span className="inline-block" data-agency-letter>
									{letter === " " ? "\u00a0" : letter}
								</span>
							</span>
						))}
					</span>
				</>
			) : (
				<span>
					<span data-other-text>{label}</span>
				</span>
			)}
		</a>
	);
}

export default function Loading() {
	const screenRef = useRef(null);
	const navRef = useRef(null);
	const overlayRef = useRef(null);
	const introCoverRef = useRef(null);
	const slideRefs = useRef([]);

	useLayoutEffect(() => {
		let rotation;
		const context = gsap.context(() => {
			const layers = slideRefs.current.filter(Boolean);
			let activeIndex = 0;
			const navItems = Array.from(navRef.current.querySelectorAll("[data-nav-item]"));
			const nameText = navRef.current.querySelector("[data-name-text]");
			const otherTexts = Array.from(navRef.current.querySelectorAll("[data-other-text]"));
			const agencyLetters = Array.from(
				navRef.current.querySelectorAll("[data-agency-letter]"),
			);
			const centerX = window.innerWidth / 2;

			gsap.set(layers, { scale: 1, opacity: 0 });
			gsap.set(navItems, {
				x: (index, item) => {
					if (index === 0) {
						const bounds = item.getBoundingClientRect();
						return centerX - bounds.left - bounds.width / 2;
					}
					if (index === 4) {
						const nameBounds = navItems[0].getBoundingClientRect();
						const agencyBounds = item.getBoundingClientRect();
						return nameBounds.right + 16 - agencyBounds.left;
					}
					return 0;
				},
				opacity: 0,
			});
			gsap.set(navItems[0], { opacity: 1 });
			gsap.set(nameText, { yPercent: 100 });
			gsap.set(otherTexts, { yPercent: 100 });
			gsap.set(agencyLetters, {
				yPercent: 100,
				opacity: 0,
			});
			gsap.set(introCoverRef.current, { opacity: 1 });

			const entrance = gsap.timeline();
			entrance.to(navItems[0], {
				opacity: 1,
				duration: 0.01,
			}, 0);
			entrance.to(nameText, {
				yPercent: 0,
				opacity: 1,
				duration: 0.9,
				ease: "power3.out",
			}, 0.2);
			entrance.set(navItems[4], { opacity: 1 }, 1.2);
			entrance.to(agencyLetters, {
				yPercent: 0,
				opacity: 1,
				duration: 0.55,
				ease: "power3.out",
				stagger: { each: 0.045, from: "start" },
			}, 1.2);
			entrance.to([navItems[0], navItems[4]], {
				x: 0,
				duration: 1,
				ease: "power3.inOut",
			}, 2.65);
			entrance.to(navItems.filter((_, index) => index !== 0 && index !== 4), {
				opacity: 1,
				duration: 0.01,
			}, 3.1);
			entrance.to(otherTexts, {
				yPercent: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
				stagger: 0.04,
			}, 3.2);
			entrance.to(layers[0], { opacity: 1, duration: 1.1, ease: "power1.out" }, 2.8);
			entrance.to(introCoverRef.current, { opacity: 0, duration: 1.1, ease: "power1.out" }, 2.9);

			gsap.to(layers, {
				scale: 2,
				ease: "none",
				scrollTrigger: {
					trigger: screenRef.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
					invalidateOnRefresh: true,
				},
			});

			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0.25 },
				{
					opacity: 0.72,
					ease: "none",
					immediateRender: false,
					scrollTrigger: {
						trigger: screenRef.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
						invalidateOnRefresh: true,
					},
				},
			);

			const advance = () => {
				const previous = layers[activeIndex];
				activeIndex = (activeIndex + 1) % layers.length;
				const next = layers[activeIndex];

				gsap.to(previous, { opacity: 0, duration: 0.85, ease: "power1.inOut" });
				gsap.fromTo(
					next,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.85, ease: "power1.inOut" },
				);
				rotation = gsap.delayedCall(3, advance);
			};

			rotation = gsap.delayedCall(6.7, advance);

			gsap.fromTo(
				navRef.current,
				{
					y: () => window.innerHeight / 2 - navRef.current.offsetHeight / 2,
				},
				{
					y: 12,
					ease: "none",
					scrollTrigger: {
						trigger: screenRef.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
						invalidateOnRefresh: true,
					},
				},
			);
		});

		return () => {
			rotation?.kill();
			context.revert();
		};
	}, []);

	return (
		<div className="w-full bg-neutral-950 text-white mix-blend-difference">
			<section
				ref={screenRef}
				className="relative  flex min-h-svh w-full justify-center overflow-hidden bg-neutral-950"
			>
				<div className="absolute inset-0 " aria-hidden="true">
					{slides.map((slide, index) => (
						<div
							aria-label={slide.alt}
							className={`absolute inset-0 bg-cover bg-center ${index === 0 ? "opacity-100" : "opacity-0"}`}
							key={slide.image}
							ref={(element) => {
								slideRefs.current[index] = element;
							}}
							role="img"
							style={{ backgroundImage: `url("${slide.image}")` }}
						/>
					))}
					<div
						ref={overlayRef}
						className="absolute inset-0 bg-black opacity-25"
					/>
					<div
						ref={introCoverRef}
						className="absolute inset-0 bg-black"
					/>
				</div>
			</section>

			<nav
				aria-label="Main navigation"
				className="  fixed w-full top-0 z-50 flex items-center justify-between gap-x-8 gap-y-4 px-6 py-5 text-center text-white sm:gap-x-10 lg:gap-x-12"
				ref={navRef}
			>
				{navigation.slice(0, 1).map(renderNavigationItem)}
				<div className="flex items-center gap-[2vw]">
					{navigation.slice(1, 4).map(renderNavigationItem)}
				</div>
				{navigation.slice(4).map(renderNavigationItem)}
			</nav>

			
		</div>
	);
}
