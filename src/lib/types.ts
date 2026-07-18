/** @format */

export interface Hostel {
	id: string;
	title: string;
	description: string;
	image: string; // Featured image
	images?: string[]; // Gallery images
	video?: string; // Optional video url
	type: string;
	price: string;
	period: "year" | "month";
	negotiable: boolean;
	location: string;
	views?: number;
	postedAt?: string;
	facilities?: string[];
	unitsAvailable?: number;
	distanceToSchool?: string;
	closestLandmark?: string;
	agent?: Agent;
}

export interface Agent {
	id: string;
	name: string;
	avatar: string;
	joined: string;
	verified: boolean;
	phone: string;
	role: string;
	activePropertiesCount: number;
}
