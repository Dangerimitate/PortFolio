import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAbout } from './portfolio-about';

describe('PortfolioAbout', () => {
  let component: PortfolioAbout;
  let fixture: ComponentFixture<PortfolioAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
