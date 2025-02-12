'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddressForm from '@/components/AddressForm';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, useFormStore } from '@/store/formStore';
import toast from 'react-hot-toast';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: useFormStore((state) => state.contactDetails)
  });
  const setContactDetails = useFormStore((state) => state.setContactDetails);

  const [addresses, setAddresses] = useState({
    current: {
      address1: '',
      address2: '',
      city: '',
      pincode: '',
      state: '',
      district: ''
    },
    permanent: {
      address1: '',
      address2: '',
      city: '',
      pincode: '',
      state: '',
      district: ''
    },
    distribution: {
      address1: '',
      address2: '',
      city: '',
      pincode: '',
      state: '',
      district: ''
    }
  });

  const router = useRouter();

  // Simulated API call
  const simulateApiCall = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  const onSubmit = async (contactData: any) => {
    try {
      setIsLoading(true);
      
      // Prepare form data
      const formData = {
        contactDetails: contactData,
        addresses: addresses
      };
      
      // Log form values
      console.log('Form Data:', formData);
      
      // Simulate API call
      await simulateApiCall(formData);
      
      // Update store
      setContactDetails(contactData);
      
      // Show success message
      toast.success('Form submitted successfully!');
      
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 mx-auto px-4 py-2 min-[500px]:py-4 sm:py-8">
        {/* Header form */}
        <div className="max-w-4xl mx-auto min-w-[85vw] min-[500px]:min-w-[80vw] sm:min-w-[75vw]">
          <h1 className="text-lg min-[500px]:text-xl sm:text-2xl font-bold text-[#1a2942] mb-1 sm:mb-2">
            Distributor Application Form
          </h1>
          
          {/* Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <span className="text-gray-400 cursor-pointer" onClick={() => router.push('/dashboard')}>
              Dashboard
            </span>
            <span className="mx-1 sm:mx-2 text-gray-400">›</span>
            <span className="text-gray-600">Apply Distributor</span>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-200 my-2 sm:my-4"></div>

          {/* Progress Steps with connecting lines */}
          <div className="relative flex justify-between mb-4 sm:mb-8 px-2 sm:px-4">
            {/* Connecting lines */}
            <div className="absolute top-2 left-14 sm:left-[72px] right-12 sm:right-16 h-[0.8px] bg-gray-400 z-10"></div>
            
            {/* Steps */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0066FF] rounded-full flex items-center justify-center text-white text-xs sm:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-black">Personal Details</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0066FF] rounded-full flex items-center justify-center text-white text-xs sm:text-sm z-20">2</div>
              <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-black">Contact Details</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#1a4d49] rounded-full flex items-center justify-center text-white text-xs sm:text-sm z-20">3</div>
              <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-gray-400">Document Details</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#1a4d49] rounded-full flex items-center justify-center text-white text-xs sm:text-sm">4</div>
              <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-gray-400">Bank Details</span>
            </div>
          </div>
        </div>
          
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 rounded-xl border-2 border-gray-200 min-w-[85vw] min-[500px]:min-w-[80vw] sm:min-w-[75vw]">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-black text-sm min-[500px]:text-base sm:text-lg font-semibold">Contact Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">
                <div className="w-full">
                  <label className="block text-[#1a2942] text-xs sm:text-sm mb-1 sm:mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
                    placeholder="Enter Phone Number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-[#1a2942] text-xs sm:text-sm mb-1 sm:mb-2">Whatsapp Number</label>
                  <input
                    {...register('whatsapp')}
                    type="tel"
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
                    placeholder="Enter Whatsapp Number"
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>
                  )}
                </div>  

                <div className="w-full col-span-1">
                  <label className="block text-[#1a2942] text-xs sm:text-sm mb-1 sm:mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    onBlur={(e) => {
                      if (!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        toast.error('Please enter a valid email address');
                      }
                    }}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Address */}
            <AddressForm 
              title="Current Address"
              onAddressChange={(address) => setAddresses(prev => ({ ...prev, current: address }))}
            />
            
            {/* Permanent Address */}
            <AddressForm 
              title="Permanent Address"
              showCheckbox={true}
              checkboxLabel="Same as Current Address"
              sourceAddress={addresses.current}
              onAddressChange={(address) => setAddresses(prev => ({ ...prev, permanent: address }))}
            />

            {/* Distribution Centre Address */}
            <AddressForm 
              title="Distribution Centre Address" 
              showCheckbox={true}
              checkboxLabel="Same as Permanent Address"
              sourceAddress={addresses.permanent}
              onAddressChange={(address) => setAddresses(prev => ({ ...prev, distribution: address }))}
            />
            
            {/* Form Actions */}
            <div className="flex justify-start space-x-3 sm:space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 sm:px-6 py-1 sm:py-1.5 bg-[#172943] text-white rounded text-sm sm:text-base font-medium hover:bg-opacity-90 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? 'cursor-wait' : ''
                }`}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                disabled={isLoading}
                className="px-4 sm:px-5 py-1 sm:py-1.5 bg-[#B7C6E1] text-[#0A1628] rounded text-sm sm:text-base font-medium hover:bg-opacity-90 shadow-sm disabled:opacity-50"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
