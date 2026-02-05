import { components } from 'react-select';
import type { DropdownIndicatorProps } from 'react-select';

// Custom dropdown indicator component
const CustomDropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      {/* Your custom icon here */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;