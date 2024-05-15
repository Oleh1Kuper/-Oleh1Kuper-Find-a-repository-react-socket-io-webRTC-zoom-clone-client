import React from 'react';

function Input({ handleChange, value, placeholder }) {
  return (
    <input
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      type="text"
      className="join_room_input"
    />
  );
}

export default Input;
