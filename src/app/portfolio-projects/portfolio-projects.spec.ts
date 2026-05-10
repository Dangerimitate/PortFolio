import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProjects } from './portfolio-projects';

describe('PortfolioProjects', () => {
  let component: PortfolioProjects;
  let fixture: ComponentFixture<PortfolioProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
