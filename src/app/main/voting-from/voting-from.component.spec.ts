import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingFromComponent } from './voting-from.component';

describe('VotingFromComponent', () => {
  let component: VotingFromComponent;
  let fixture: ComponentFixture<VotingFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
