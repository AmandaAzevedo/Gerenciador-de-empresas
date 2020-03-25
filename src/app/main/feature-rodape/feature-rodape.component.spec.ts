import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRodapeComponent } from './feature-rodape.component';

describe('FeatureRodapeComponent', () => {
  let component: FeatureRodapeComponent;
  let fixture: ComponentFixture<FeatureRodapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureRodapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureRodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
