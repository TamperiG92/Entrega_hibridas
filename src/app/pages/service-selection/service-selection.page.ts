import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.page.html',
  styleUrls: ['./service-selection.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ServiceSelectionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
