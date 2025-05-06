import React from "react";
import styled from "styled-components";
import { DropDownStyle } from "./element";


interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange, disabled }) => {
  return (
    <DropDownStyle value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </DropDownStyle>
  );
};

export default Dropdown;
