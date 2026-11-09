"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
	{
		number: "01",
		title: "Plan with confidence",
		copy: "A clear master plan gives every neighborhood room to grow, connect, and hold its value over time.",
	},
	{
		number: "02",
		title: "Live with more space",
		copy: "Thoughtful streets, open green areas, and useful amenities bring everyday life closer to what matters.",
	},
	{
		number: "03",
		title: "Invest in tomorrow",
		copy: "DHA Bahawalpur creates a considered setting for buyers who are planning beyond the immediate moment.",
	},
	{
		number: "04",
		title: "Move forward clearly",
		copy: "Professional guidance and a structured development make each property decision simpler and more assured.",
	},
];

function getScrollProgress(section) {
	const scrollDistance = section.offsetHeight - window.innerHeight;
	if (scrollDistance <= 0) return 0;
	return Math.min(Math.max(-section.getBoundingClientRect().top / scrollDistance, 0), 1);
}

export default function CardStack() {
	const sectionRef = useRef(null);
	const frameRef = useRef(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			if (sectionRef.current) setProgress(getScrollProgress(sectionRef.current));
			frameRef.current = null;
		};

		const onScroll = () => {
			if (frameRef.current !== null) return;
			frameRef.current = window.requestAnimationFrame(updateProgress);
		};

		updateProgress();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
		};
	}, []);

	const cardProgress = progress * cards.length;

	return (
		<section ref={sectionRef} aria-labelledby="card-stack-heading" className="card-stack-section">
			<div className="card-stack-sticky">
				<div className="card-stack-heading">
					<p className="card-stack-kicker">The DHA difference</p>
					<h2 id="card-stack-heading">Built for what comes next</h2>
				</div>
				<div className="card-stack-stage" aria-label="DHA principles">
					{cards.map((card, index) => {
						const position = cardProgress - index;
						const isBehind = position >= 1;
						const isVisible = position > 0;
						const rotation = index % 2 === 0 ? -6 : 6;
						const translateY = isBehind ? 0 : Math.max(0, (1 - position) * 110);
						const scale = isBehind ? Math.max(0.9, 1 - (position - 1) * 0.025) : 1;
						const transform = `translate3d(0, ${translateY}vh, 0) rotate(${isBehind ? rotation : 0}deg) scale(${scale})`;

						return (
							<article
								aria-hidden={!isVisible}
								className={`card-stack-card ${isVisible ? "is-visible" : ""}`}
								key={card.number}
								style={{ transform, zIndex: index + (isVisible ? 10 : 0) }}
							>
								<p className="card-stack-number">{card.number} / 04</p>
								<h3>{card.title}</h3>
								<p className="card-stack-copy">{card.copy}</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
