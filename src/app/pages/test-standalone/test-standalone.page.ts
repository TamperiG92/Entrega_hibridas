import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-test-standalone',
  templateUrl: './test-standalone.page.html',
  styleUrls: ['./test-standalone.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TestStandalonePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
