/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditChordsComponent } from './edit-chords.component';

describe('EditChordsComponent', () => {
  let component: EditChordsComponent;
  let fixture: ComponentFixture<EditChordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
