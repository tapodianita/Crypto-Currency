import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyGraphComponent } from './currency-graph.component';

describe('CurrencyGraphComponent', () => {
  let component: CurrencyGraphComponent;
  let fixture: ComponentFixture<CurrencyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
