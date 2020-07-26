import React from 'react';

export default function Radio({
  name,
  label,
  checked,
  disabled,
  color,
  onChangeValue,
}) {
  const handleChange = (event) => {
    const { id } = event.target;
    onChangeValue(id);
  };
  return (
    <p>
      <label style={{ color: color }}>
        {disabled ? (
          <input
            id={label}
            className="with-gap"
            name={name}
            type="radio"
            checked={checked}
            disabled="disabled"
          />
        ) : (
          <input
            id={label}
            className="with-gap"
            name={name}
            type="radio"
            onChange={handleChange}
          />
        )}
        <span>{label}</span>
      </label>
    </p>
  );
}
