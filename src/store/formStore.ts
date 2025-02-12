import { create } from 'zustand';
import { z } from 'zod';
import { stateDistrictData } from '@/data/StateDistrictData';

export const contactSchema = z.object({
  phone: z.string()
    .length(10, 'Phone number must be 10 digits')
    .regex(/^[0-9]+$/, 'Only numbers are allowed')
    .refine((val) => val.length === 10, 'Phone number must be exactly 10 digits'),
  whatsapp: z.string()
    .length(10, 'WhatsApp number must be 10 digits')
    .regex(/^[0-9]+$/, 'Only numbers are allowed')
    .refine((val) => val.length === 10, 'WhatsApp number must be exactly 10 digits'),
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required')
});

export const addressSchema = z.object({
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  pincode: z.string()
    .length(6, 'Pincode must be 6 digits')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
  state: z.enum(Object.keys(stateDistrictData) as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a state' })
  }),
  district: z.string().min(1, 'District is required')
});

type FormState = {
  contactDetails: z.infer<typeof contactSchema>;
  addresses: {
    current: z.infer<typeof addressSchema>;
    permanent: z.infer<typeof addressSchema>;
    distribution: z.infer<typeof addressSchema>;
  };
  setContactDetails: (details: z.infer<typeof contactSchema>) => void;
  setAddress: (type: 'current' | 'permanent' | 'distribution', address: z.infer<typeof addressSchema>) => void;
};

export const useFormStore = create<FormState>((set) => ({
  contactDetails: {
    phone: '',
    whatsapp: '',
    email: ''
  },
  addresses: {
    current: { address1: '', address2: '', city: '', pincode: '', state: '', district: '' },
    permanent: { address1: '', address2: '', city: '', pincode: '', state: '', district: '' },
    distribution: { address1: '', address2: '', city: '', pincode: '', state: '', district: '' }
  },
  setContactDetails: (details) => set({ contactDetails: details }),
  setAddress: (type, address) => set((state) => ({
    addresses: { ...state.addresses, [type]: address }
  }))
})); 