import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioContact } from './portfolio-contact';

describe('PortfolioContact', () => {
  let component: PortfolioContact;
  let fixture: ComponentFixture<PortfolioContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
