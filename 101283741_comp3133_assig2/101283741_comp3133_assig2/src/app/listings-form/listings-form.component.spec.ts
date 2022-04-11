import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsFormComponent } from './listings-form.component';

describe('ListingsFormComponent', () => {
  let component: ListingsFormComponent;
  let fixture: ComponentFixture<ListingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
