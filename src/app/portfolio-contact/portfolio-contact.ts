import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio-contact',
  imports: [FormsModule],
  templateUrl: './portfolio-contact.html',
  styleUrl: './portfolio-contact.scss',
})
export class PortfolioContact {
  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    // Placeholder: wire up to a backend or EmailJS later
    console.log('Contact form submitted:', this.contactForm);
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.contactForm = { name: '', email: '', message: '' };
  }
}
