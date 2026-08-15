export interface CircuitLayout {
  name: string;
  slug: string;
  circuit: string;
  description: string;
  length?: number;
  imageUrl?: string | null;
  isActive: boolean;
}