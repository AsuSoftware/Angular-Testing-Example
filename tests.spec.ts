import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('SideNavComponent', () => {
    // Con async e posibile eseguire attività asincrone, ed è in grado di gestirli come se tutto fosse reale
    it('should fetch data successfully if called asynchronously', async(() => {
        let fixure = TestBed.createComponent(UserComponent);
        let app = fixure.debugElement.componentInstance;
        let dataService = fixure.debugElement.injector.get(DataService);
        // spyOn viene usato per spiare qunado un metodo viene chiamato ed eseguire qualcosa
        let spy = spyOn(dataService, 'getDetails') // Viene chiamato, e ritornerà la stringa 'Data'
            .and.returnValue(Promise.resolve('Data'));
        fixure.detectChanges(); // Dobbiamo sempre aggiornare tutto, per far si che si rilevi
        fixure.whenStable() // questa funzione sulla fixure mi consente di reagire a tutti i task asincroni che sono finiti
            .then(() => {
                expect(app.data).toBe('Data');
            });
    }));

    it('should fetch data successfully if called asynchronously', fakeAsync(() => {
        let fixure = TestBed.createComponent(UserComponent);
        let app = fixure.debugElement.componentInstance;
        let dataService = fixure.debugElement.injector.get(DataService);
        let spy = spyOn(dataService, 'getDetails')
            .and.returnValue(Promise.resolve('Data'));
        fixure.detectChanges();
        tick(); // viene usato per finire i task asincroni
        expect(app.data).toBe('Data');
    }));
});
