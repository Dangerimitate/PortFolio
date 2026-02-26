import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSkills } from './portfolio-skills';

describe('PortfolioSkills', () => {
  let component: PortfolioSkills;
  let fixture: ComponentFixture<PortfolioSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
