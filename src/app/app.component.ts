import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GeminiService } from './services/gemini.service';
import { ImageSearchService } from './services/image-search.service';
import { Activity } from './models/activity';
import { CardComponent } from './components/card/card.component';
import { SpinnerComponent } from "./components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatInputModule, MatButtonModule, CommonModule, FormsModule, MatIconModule, CardComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  place = '';
  geminiService = inject(GeminiService);
  imageSearch = inject(ImageSearchService);
  activities: Activity[] = [];
  showSpinner = false;

  async explore() {
   this.activities = [];
   this.showSpinner = true;
   this.activities = await this.geminiService.generateText(this.place);
   this.showSpinner = false;

   for(const [index, activity] of this.activities.entries()){
    this.activities[index].imgUrl = await this.imageSearch.getImage(this.place + activity.activity);
   }
  }


}
