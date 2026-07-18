import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

// Static list of Frequently Asked Questions
const faqs = [
	{
		question: "Is Houster free to use for students?",
		answer:
			"Yes! Browsing, searching, and contacting agents through Houster is completely free for all students and renters.",
	},
	{
		question: "How do I know a hostel is legit?",
		answer:
			"We have a strict verification process for every agent and owner. Look out for the 'Verified' badge on listings to ensure you're dealing with a trusted party.",
	},
	{
		question: "Can I list my own hostel or apartment?",
		answer:
			"Absolutely. If you're an agent, landlord, or even a student looking for a roommate, you can create an account and post your listing to reach thousands of students.",
	},
	{
		question: "Are the prices negotiable?",
		answer:
			"Many hostels are negotiable! Just check for the green 'Negotiable' badge on a listing. If you see it, feel free to call the agent and strike a deal.",
	},
	{
		question: "How do I contact an agent?",
		answer: (
			<>
				Once you click on a hostel, you'll see the agent's contact information. You can call them directly or send a message on WhatsApp to schedule a viewing or ask further questions.
			</>
		),
	},
	{
		question: "Do you handle payments?",
		answer:
			"Currently, Houster only connects you with agents and owners. All rent payments and negotiations should be done directly with the verified agent or landlord after inspecting the property.",
	},
];

/**
 * LandingFAQ Component
 * 
 * Renders a list of frequently asked questions using Shadcn's Accordion component.
 * It provides quick answers to common user queries regarding the platform's usage, pricing, and safety.
 */
export function LandingFAQ() {
	return (
		<section
			id='faq'
			className='scroll-mt-24 px-4 py-20 sm:py-24 md:py-28 lg:px-20 bg-secondary/50 dark:bg-secondary/10'
		>
			<div className='mx-auto max-w-7xl'>
				{/* Section Header */}
				<div className='mb-10 text-center'>
					<h2 className='text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Frequently asked questions
					</h2>
					<p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground font-medium'>
						Everything you need to know about finding and securing your
						hostel on Houster.
					</p>
				</div>

				{/* FAQ Accordion List
				  * Renders an interactive list of questions where clicking expands the answer.
				  * The `multiple` prop allows multiple FAQs to be open simultaneously.
				  */}
				<div className='mx-auto max-w-3xl mt-12'>
					<Accordion
						multiple
						className='flex w-full flex-col gap-4 border-0 bg-transparent p-0 shadow-none overflow-visible rounded-none'
					>
						{faqs.map((faq, index) => (
							<AccordionItem
								key={faq.question}
								value={`faq-${index}`}
								className='rounded-4xl border border-border bg-card p-0 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md'
							>
								<AccordionTrigger className='min-h-16 items-center px-5 py-4 text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary transition-colors'>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className='pb-6 px-5 text-base leading-relaxed text-muted-foreground'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
