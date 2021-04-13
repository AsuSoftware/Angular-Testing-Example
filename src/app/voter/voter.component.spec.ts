import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>; // con ComponentFixure<..> possiamo accedere sia al template che al componente

  // la funzione anonima e asincrona perchè il compileComponents serve
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents(); // Diciamo ad Angular di compilare tutti i componenti e i loro Html
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent); // Creaimo il componente che Angular ci fornisce
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    let de = fixture.debugElement.query(By.css('.vote-count')); // facciamo riferimento ad una classe css
    let el: HTMLElement = de.nativeElement;
    fixture.detectChanges(); // rileva le modifiche che apportiamo
    expect(el.innerText).toContain('21');
  });

  it('should highlight the upvote button if i have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase total votes when i click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    // il primo parametro e il nome dell'evento che si vuole generare,
    // il secondo un oggetto che rappresenta dati aggiuntivi sull'evento
    button.triggerEventHandler('click', null); // ci permette di premere in automatico il pulsante
    expect(component.totalVotes).toBe(1);
  });
});
