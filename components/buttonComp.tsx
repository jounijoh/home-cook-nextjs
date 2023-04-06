import { useState } from "react";

interface Props {
    onSelect: (option: string) => void;
  }
  
  
  export const ButtonWithOptions: React.FC<Props> = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const options: string[] = ["Healthy", "Vegan", "Comfort food", "High protein", "Random"];
  
    const handleOptionClick = (option: string) => {
      setSelectedOption(option);
      onSelect(option);
    };
  
    return (
      <div>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            style={{ backgroundColor: selectedOption === option ? 'green' : 'white' }}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };