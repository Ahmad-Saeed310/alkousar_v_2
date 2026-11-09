const policies = [
	{
		tag: "01 / Planning",
		title: "A master plan built for lasting value",
		copy: "DHA Bahawalpur brings together considered neighborhoods, open green space, and the infrastructure to support a confident investment.",
	},
	{
		tag: "02 / Community",
		title: "More room for the life you want",
		copy: "From family amenities to everyday conveniences, every district is planned to make modern living feel natural and connected.",
	},
	{
		tag: "03 / Opportunity",
		title: "A place with room to grow",
		copy: "DHA's expanding footprint creates opportunities for buyers who are thinking beyond today and investing in tomorrow's demand.",
	},
	{
		tag: "04 / Confidence",
		title: "Clarity at every step",
		copy: "A structured development, clear sectors, and professional guidance help make property decisions simpler and more considered.",
	},
];

function PolicyCard({ policy, duplicate = false }) {
	return (
		<article aria-hidden={duplicate} className="dha-policy-card">
			<p className="dha-policy-tag">{policy.tag}</p>
			<h3>{policy.title}</h3>
			<p className="dha-policy-copy">{policy.copy}</p>
			<span className="dha-policy-arrow" aria-hidden="true">↗</span>
		</article>
	);
}

export default function DHAblog() {
	return (
		<section aria-labelledby="dha-policies-heading" className="dha-policies-section">
			<div className="dha-policies-header">
				<div>
					<p className="dha-section-kicker">Keeping the theme in view</p>
					<h2 id="dha-policies-heading">DHA policies</h2>
				</div>
				<p className="dha-policies-intro">A closer look at the principles shaping one of Bahawalpur's most considered addresses.</p>
			</div>

			<div className="dha-policy-window" tabIndex="0" aria-label="DHA policies carousel">
				<div className="dha-policy-track">
					<div className="dha-policy-group">
						{policies.map((policy) => <PolicyCard key={policy.tag} policy={policy} />)}
					</div>
					<div className="dha-policy-group" aria-hidden="true">
						{policies.map((policy) => <PolicyCard key={`duplicate-${policy.tag}`} policy={policy} duplicate />)}
					</div>
				</div>
			</div>
		</section>
	);
}
