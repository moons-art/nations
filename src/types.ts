export interface ProductItem {
  id: string;
  number: string;
  name: string;
  badge: string;
  badgeColor?: 'primary' | 'secondary' | 'emerald';
  description: string;
  icon: string;
  highlights: string[];
  keyFeatures: { title: string; desc: string }[];
  targetUseCase: string;
}

export interface ConsultationRequest {
  id: string;
  churchName: string;
  contactName: string;
  position: string;
  phone: string;
  email?: string;
  churchSize: string;
  selectedProducts: string[];
  inquiryType: 'demo' | 'free_under_100' | 'consultation';
  notes?: string;
  createdAt: string;
}
