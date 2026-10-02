import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} />
    </div>
  );
};
