import React from 'react';

interface TagProps {
  text: string;
}

export const Tag: React.FC<TagProps> = ({ text }) => {
  return <span className="tag">{text}</span>;
};
