'use client';

import { useState, useEffect } from 'react';
import { stateDistrictData } from '@/data/StateDistrictData';

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
  const [address, setAddress] = useState<AddressFormData>({
    address1: '',
    address2: '',
    city: '',
    pincode: '',
    state: '',
    district: ''
  });

  const states = Object.keys(stateDistrictData);

  useEffect(() => {
    if (isSameAddress && sourceAddress) {
      setAddress(sourceAddress);
    }
  }, [isSameAddress, sourceAddress]);

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    onAddressChange?.(newAddress);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSameAddress(e.target.checked);
    if (e.target.checked && sourceAddress) {
      setAddress(sourceAddress);
      onAddressChange?.(sourceAddress);
    }
  };

  return (
    <div className="space-y-2 sm:space-y-4">
      
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

      <h3 className="text-black text-sm min-[500px]:text-base sm:text-lg font-semibold">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-5 sm:mb-10 mt-0.5 sm:mt-1">
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">Address 1</label>
          <input
            type="text"
            value={address.address1}
            onChange={(e) => handleInputChange('address1', e.target.value)}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter Address 1"
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">Address 2 (Optional)</label>
          <input
            type="text"
            value={address.address2}
            onChange={(e) => handleInputChange('address2', e.target.value)}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter Address 2"
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">City</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter City"
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">Pincode</label>
          <input
            type="number"
            value={address.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Enter Pincode"
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">State</label>
          <select 
            title="State"
            value={address.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
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
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-0.5 sm:mb-1">District</label>
          <select 
            title="District"
            value={address.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            disabled={isSameAddress}
            className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select District</option>
            {address.state && stateDistrictData[address.state].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddressForm; 