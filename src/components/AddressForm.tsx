'use client';

import { useState, useEffect } from 'react';
import { stateDistrictData } from '@/data/StateDistrictData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/store/formStore';

interface AddressFormData {
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  state: string;
  district: string;
}

interface AddressFormProps {
  title: string;
  showCheckbox?: boolean;
  checkboxLabel?: string;
  sourceAddress?: AddressFormData;
  onAddressChange?: (address: AddressFormData) => void;
}

const AddressForm = ({ title, showCheckbox, checkboxLabel, sourceAddress, onAddressChange }: AddressFormProps) => {
  const [isSameAddress, setIsSameAddress] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: sourceAddress
  });

  const selectedState = watch('state');
  const states = Object.keys(stateDistrictData);

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSameAddress(isChecked);
    
    if (isChecked && sourceAddress) {
      const newValues = {
        address1: sourceAddress.address1,
        address2: sourceAddress.address2 || '',
        city: sourceAddress.city,
        pincode: sourceAddress.pincode,
        state: sourceAddress.state,
        district: sourceAddress.district
      };
      
      // Update form values
      Object.entries(newValues).forEach(([key, value]) => {
        setValue(key as keyof AddressFormData, value);
      });
      
      // Notify parent
      onAddressChange?.(newValues);
    }
  };

  // Handle form changes
  const onFormChange = (name: keyof AddressFormData) => {
    if (!isSameAddress) {
      const currentValues = getValues();
      onAddressChange?.(currentValues);
    }
  };

  return (
    <div className="space-y-2 sm:space-y-4">
      <h3 className="text-black text-sm min-[500px]:text-base sm:text-lg font-semibold">{title}</h3>
      
      {showCheckbox && (
        <div className="mb-2 sm:mb-4">
          <label className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
            <input 
              type="checkbox"
              checked={isSameAddress}
              onChange={handleCheckboxChange}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span>{checkboxLabel}</span>
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">Address 1</label>
          <input
            {...register('address1', {
              onChange: () => onFormChange('address1')
            })}
            type="text"
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter Address 1"
          />
          {errors.address1 && (
            <p className="text-red-500 text-xs mt-1">{errors.address1.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">Address 2</label>
          <input
            {...register('address2', {
              onChange: () => onFormChange('address2')
            })}
            type="text"
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter Address 2"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">City</label>
          <input
            {...register('city', {
              onChange: () => onFormChange('city')
            })}
            type="text"
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter City"
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">Pincode</label>
          <input
            {...register('pincode', {
              onChange: () => onFormChange('pincode')
            })}
            type="text"
            maxLength={6}
            disabled={isSameAddress}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter Pincode"
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">State</label>
          <select 
            {...register('state', {
              onChange: () => onFormChange('state')
            })}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state.replace(/([A-Z])/g, ' $1').trim()}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">District</label>
          <select 
            {...register('district', {
              onChange: () => onFormChange('district')
            })}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select District</option>
            {selectedState && stateDistrictData[selectedState].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm; 