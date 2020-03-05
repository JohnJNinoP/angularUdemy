import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateconsultinComponent } from './templateconsultin.component';

describe('TemplateconsultinComponent', () => {
  let component: TemplateconsultinComponent;
  let fixture: ComponentFixture<TemplateconsultinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateconsultinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateconsultinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
