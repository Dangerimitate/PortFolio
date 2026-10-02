import { useState } from 'react';
import { ContactFormData } from '../types/contactTypes';

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const isValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  return {
    formData,
    handleChange,
    handleSubmit,
    isValid,
  };
};
