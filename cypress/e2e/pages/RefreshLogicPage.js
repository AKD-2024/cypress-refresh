export class RefreshLogicPage {
    constructor() {
        this.max_refresh = 5;
        this.interval = 10000;
        this.refCount = parseInt(localStorage.getItem('refCount')) || 0;
    }


    logMemoryUsage() {
        if (performance.memory) {
            const usedMemoryMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            cy.log(`Memory Usage: ${usedMemoryMB} MB`);
        } else {
            cy.log('Memory usage information is not available in this browser.');
        }
    }


    refreshPage() {
        if (this.refCount < this.max_refresh) {
            this.refCount++;
            localStorage.setItem('refCount', this.refCount);
           
            cy.wait(this.interval).then(() => {
                this.logMemoryUsage();
                cy.window().then((win) => {
                    win.location.reload();
                });
                this.refreshPage();
            });
        } else {
            cy.window().then((win) => {
                cy.log(`Page reloaded: ${this.refCount} times`);
                win.localStorage.removeItem('refCount');
            });
        }
    }


    start() {
        this.refreshPage();
    }
}
