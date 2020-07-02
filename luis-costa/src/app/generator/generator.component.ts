/* tslint:disable */

import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, filter, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {
  @ViewChild('hrHand', {static: false}) hrHand: ElementRef;
  @ViewChild('minHand', {static: false}) minHand: ElementRef;
  @ViewChild('secHand', {static: false}) secHand: ElementRef;
  
  tbl: any = document.createElement('table');
  name = 'Angular';
  time = new Date();
  code = '';
  readonly matrixDimensions = 10;
  matrixvalues = Array(this.matrixDimensions).fill([]).map(a => Array(this.matrixDimensions).fill('a'));
  timer;
  generateCode;
  values: string[] = [];
  character = new FormControl({ value: '', disabled: false }, Validators.pattern('^[A-Z]$'));
  constructor() {
  }

  ngOnInit() {
    this.startTime();
    this.algorithm();

    this.generateCode = setInterval(() => {
      this.generateCaracter();
      this.algorithm();
    }, 2000);
  }
  startTime() {
    this.timer = setInterval(() => {
      this.time = new Date();
      this.updateClock(new Date());
    }, 1000);
  }

  updateClock(date: Date){
    this.secHand.nativeElement.style.transform = 'rotate('+ date.getSeconds() * 6+ 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate('+ date.getMinutes() * 6+ 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' + (date.getHours()*30+date.getMinutes()*0.5)+'deg)'
  }


  ngOnDestroy() {
    clearInterval(this.timer);
    clearInterval(this.generateCode)
  }

  generateCaracter() {
    this.matrixvalues = this.matrixvalues.map(i => Array.from(i, j => String.fromCharCode(65 + Math.floor(Math.random() * 26))));
    if (!this.character.value) return;
    Array(20).fill([]).map(x => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]).forEach(([x, y]) => this.matrixvalues[x][y] = this.character.value);
  }

  checkLetter() {
    this.character.disable();
    setTimeout(() => {
      this.character.enable();
    }, 4000);
    const alphaExp = /^[a-zA-Z]+$/;
    this.character.value.match(alphaExp) ? this.generateCaracter() : alert('please insert a character');
  }

  algorithm() {
    const seconds = this.time.getSeconds();
    const [p1, p2] = seconds < 10 ? [0, seconds] : '' + seconds
    const firstChar = this.matrixvalues[p1][p2]
    const secondChar = this.matrixvalues[p2][p1]

    const countFirstChar = this.matrixvalues.reduce((sum, row) => sum += row.filter((char) => char === firstChar).length, 0)
    const countSecondChar = this.matrixvalues.reduce((sum, row) => sum += row.filter((char) => char === secondChar).length, 0)

    const minSecond = countSecondChar > 9 ? this.minDivisor(countSecondChar) : countSecondChar
    const minFirst = countFirstChar > 9 ? this.minDivisor(countFirstChar) : countFirstChar

    this.code = `${minFirst} ${minSecond} `


  }

  minDivisor(num) {
    for (let i = 2;  ; i++) {
      const n = Math.ceil(num/i)
      if(n < 10) return num
    }
  }


}
