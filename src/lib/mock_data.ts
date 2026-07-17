/** @format */
import type { Hostel } from "./types";

export const RECENT_HOSTELS: Hostel[] = [
	{
		id: "1",
		title: "Sunshine Lodge",
		description:
			"A very clean and secure self contain with running water and 24/7 solar electricity. Features include POP ceiling, fully tiled floors, fitted kitchen cabinets, and a personal prepaid meter. The compound is well fenced with a security gate and security personnel. It is located just 5 minutes walk from the main campus gate, making it very convenient for students.",
		image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
		images: [
			"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1502672260266-1c1c24240f38?q=80&w=800&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
		],
		type: "Self Con",
		price: "₦180,000",
		period: "year",
		negotiable: false,
		location: "Oye",
		views: 124,
		postedAt: "2 hours ago",
		facilities: ["Running Water", "Solar Electricity", "POP Ceiling", "Tiled Floors", "Fitted Kitchen", "Prepaid Meter", "Security Gate"],
		unitsAvailable: 2,
		distanceToSchool: "5 minutes walk",
		closestLandmark: "Main Campus Gate",
		video: "https://www.w3schools.com/html/mov_bbb.mp4",
		agent: {
			name: "Okafor Chibuike",
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
			joined: "1+ years on Houster",
			verified: true,
			phone: "08012345678",
		}
	},
	{
		id: "2",
		title: "Peaceful Haven Flat",
		description:
			"Spacious 2 bedroom flat perfect for sharing. Close to the main school gate.",
		image: "https://images.unsplash.com/photo-1502672260266-1c1c24240f38?q=80&w=800&auto=format&fit=crop",
		type: "Flat",
		price: "₦350,000",
		period: "year",
		negotiable: false,
		location: "Ikole",
	},
	{
		id: "3",
		title: "Student Single Room",
		description:
			"Affordable single room in a student-friendly compound. Shared bathroom and kitchen.",
		image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
		type: "Single Room",
		price: "₦60,000",
		period: "year",
		negotiable: true,
		location: "Oye",
	},
	{
		id: "4",
		title: "Luxury Apartment",
		description:
			"Premium self contain with POP ceiling, tiles, and wardrobe. Very close to campus.",
		image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
		type: "Self Con",
		price: "₦20,000",
		period: "month",
		negotiable: false,
		location: "Ido",
	},
	{
		id: "5",
		title: "Greenway Villa",
		description:
			"Quiet environment, fenced compound with gate and security guard.",
		image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
		type: "Self Con",
		price: "₦150,000",
		period: "year",
		negotiable: true,
		location: "Ikole",
	},
	{
		id: "6",
		title: "Campus View Lodge",
		description:
			"Wake up to the view of the campus. Just a 5-minute walk to lecture halls.",
		image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
		type: "Single Room",
		price: "₦80,000",
		period: "year",
		negotiable: false,
		location: "Oye",
	},
	{
		id: "7",
		title: "Modern 3-Bedroom",
		description:
			"Perfect for a group of friends. 3 bedrooms, 2 bathrooms, large living area.",
		image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
		type: "Flat",
		price: "₦450,000",
		period: "year",
		negotiable: true,
		location: "Ido",
	},
	{
		id: "8",
		title: "Cozy Corner",
		description:
			"A compact, easy-to-maintain self contain for focused students. Borehole water available.",
		image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
		type: "Self Con",
		price: "₦120,000",
		period: "year",
		negotiable: true,
		location: "Oye",
	},
];
