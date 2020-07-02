import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  code = 5;
  count = 0;
  disabled = true;
  payment = new FormControl({ value: '', disabled: false });
  ammount = new FormControl({ value: '', disabled: false });
  headers = ['Name', 'Ammount', 'Code', 'Grid'];
  rows = [
    {
      Name: 'Payment 1',
      Ammount: 100,
      Code: 34,
      Grid: 64
    },
    {
      Name: 'Payment 2',
      Ammount: 100,
      Code: 22,
      Grid: 64
    },
    {
      Name: 'Payment 3',
      Ammount: 100,
      Code: 91,
      Grid: 64
    }
  ];
  timer;
  constructor(private paymentsService: PaymentsService) { }

  ngOnInit() {
    this.rows = JSON.parse(localStorage.getItem('PaymentsTable'));
    this.timer = setInterval(() => {
      this.code = Math.floor(Math.random() * Math.floor(100));
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  addItem() {
    if (this.ammount.valid && this.payment.valid) {
      this.rows.push({ Name: this.payment.value, Ammount: this.ammount.value, Code: this.code, Grid: 64 });
      localStorage.setItem('PaymentsTable', JSON.stringify(this.rows));
      // this.paymentsService.sendToApi(this.rows).subscribe((res) => console.log(res));
      this.disabled = !this.disabled;
    } else {
      this.disabled = !this.disabled;
    }


  }

}
