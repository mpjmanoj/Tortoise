export enum Step {
  Home,
  Form,
  Quiz,
  Certificate,
  Success
}

export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  countryCode: string;
  photo: string;
  optIn?: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
}

export interface QuizAnswer {
  questionId: number;
  selectedOption: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: "A tortoise belongs to which class of animals?", options: ["Amphibia", "Reptilia", "Mammalia", "Aves"], correctAnswer: 1 },
  { id: 2, question: "Tortoises mainly live in:", options: ["Water", "Trees", "Land", "Underground rivers"], correctAnswer: 2 },
  { id: 3, question: "The upper shell of a tortoise is called:", options: ["Plastron", "Carapace", "Skull", "Scale"], correctAnswer: 1 },
  { id: 4, question: "The lower part of a tortoise’s shell is called:", options: ["Carapace", "Plastron", "Backbone", "Shield"], correctAnswer: 1 },
  { id: 5, question: "Tortoises are generally:", options: ["Carnivores", "Omnivores", "Herbivores", "Insectivores"], correctAnswer: 2 },
  { id: 6, question: "Tortoises breathe using:", options: ["Gills", "Lungs", "Skin", "Fins"], correctAnswer: 1 },
  { id: 7, question: "A tortoise protects itself by:", options: ["Running fast", "Changing color", "Hiding inside its shell", "Flying away"], correctAnswer: 2 },
  { id: 8, question: "Tortoises are cold-blooded animals, which means:", options: ["They produce their own heat", "Their body temperature depends on surroundings", "They live only in cold places", "They have cold blood"], correctAnswer: 1 },
  { id: 9, question: "Baby tortoises hatch from:", options: ["Seeds", "Eggs", "Cocoons", "Water bubbles"], correctAnswer: 1 },
  { id: 10, question: "Tortoises have:", options: ["Teeth", "Beaks without teeth", "No mouth", "Sharp claws only"], correctAnswer: 1 },
  { id: 11, question: "The largest tortoise species is:", options: ["Desert tortoise", "Russian tortoise", "Galápagos tortoise", "Box turtle"], correctAnswer: 2 },
  { id: 12, question: "Tortoises can live up to:", options: ["5–10 years", "20–30 years", "50–100+ years", "2–3 years"], correctAnswer: 2 },
  { id: 13, question: "A group of tortoises is called a:", options: ["Herd", "Pack", "Creep", "School"], correctAnswer: 2 },
  { id: 14, question: "Tortoises move:", options: ["Very fast", "Slowly", "By hopping", "By flying"], correctAnswer: 1 },
  { id: 15, question: "The hard shell of a tortoise is made of:", options: ["Metal", "Wood", "Bone and keratin", "Plastic"], correctAnswer: 2 },
  { id: 16, question: "Tortoises are different from turtles because tortoises:", options: ["Live mostly on land", "Have flippers", "Live only in water", "Have soft shells"], correctAnswer: 0 },
  { id: 17, question: "The outer covering of a tortoise’s shell is called:", options: ["Feathers", "Fur", "Scutes", "Skin"], correctAnswer: 2 },
  { id: 18, question: "Tortoises belong to the order:", options: ["Squamata", "Testudines", "Crocodilia", "Rodentia"], correctAnswer: 1 },
  { id: 19, question: "Tortoises usually eat:", options: ["Grass and leaves", "Fish", "Meat only", "Insects only"], correctAnswer: 0 },
  { id: 20, question: "Tortoises are known for being:", options: ["Very aggressive", "Very slow and long-living", "Flying reptiles", "Poisonous animals"], correctAnswer: 1 },
];