export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  poeticDescription: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: string[];
}