import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioHero } from './portfolio-hero';

describe('PortfolioHero', () => {
  let component: PortfolioHero;
  let fixture: ComponentFixture<PortfolioHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
