import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="text-align: center;">
      <h1>Entrenador</h1>
      <input type="file" (change)="onFileSelected($event)" accept=".csv" />
      <br /><br />
      <textarea cols="30" rows="5" [value]="currentLine" readonly></textarea>
      <br /><br />
      <button (click)="previousLine()" style="margin-right: 5px;">Anterior</button>
      <button (click)="nextLine()" style="margin-right: 5px;">Siguiente</button>
      <button (click)="pronounce()">Pronunciar</button>
    </div>
  `
})
export class AppComponent {
  csvLines: string[] = [];
  currentLine: string = '';
  currentIndex: number = 0;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = reader.result as string;
        this.csvLines = text.split('\n').filter((line) => line.trim() !== '');
        this.currentIndex = 0;
        this.currentLine = this.csvLines[this.currentIndex];
      };
      reader.readAsText(file);
    }
  }

  nextLine() {
    if (this.csvLines.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.csvLines.length;
      this.currentLine = this.csvLines[this.currentIndex];
    }
  }

  previousLine() {
    if (this.csvLines.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.csvLines.length) % this.csvLines.length;
      this.currentLine = this.csvLines[this.currentIndex];
    }
  }

  pronounce() {
    if (this.isEnglish(this.currentLine)) {
      const utterance = new SpeechSynthesisUtterance(this.currentLine);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      console.log('La frase no está en inglés.');
    }
  }

  isEnglish(text: string): boolean {
    // Verificación básica para determinar si el texto está en inglés
    const englishRegex = /^[A-Za-z0-9 .,!?'"()\n\r-]+$/;
    return englishRegex.test(text);
  }
}
