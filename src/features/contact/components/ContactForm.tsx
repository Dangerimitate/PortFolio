import React from 'react';
import { GlassCard } from '../../../components/elements/GlassCard';
import { Button } from '../../../components/elements/Button';
import { Input } from '../../../components/forms/Input';
import { TextArea } from '../../../components/forms/TextArea';
import { useContactForm } from '../hooks/useContactForm';

export const ContactForm: React.FC = () => {
  const { formData, handleChange, handleSubmit, isValid } = useContactForm();

  return (
    <GlassCard>
      <form className="contact-form" onSubmit={handleSubmit}>
        <Input
          label="Your Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />
        <Input
          label="Your Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
        <TextArea
          label="Message"
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell me about your project..."
        />
        <Button type="submit" className="submit-btn" disabled={!isValid}>
          Send Message
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </Button>
      </form>
    </GlassCard>
  );
};
