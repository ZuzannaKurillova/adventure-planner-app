import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private _generativeAI: GoogleGenerativeAI;

  constructor() {
    this._generativeAI = new GoogleGenerativeAI('');
  }

  async generateText(prompt: string): Promise<Activity[]>{
    const model = this._generativeAI.getGenerativeModel({model: 'gemini-pro'});

    const result = await model.generateContent("What should I do and see in " + prompt + "? Write me the list of top 15 activities without the title and in the JSON format with JSON objects that look like this: { activity: activity name, description: activity description, link: website}. Don't write json around it, just the array. No extra spaces.Use double quotes. Description shouldn't exceed 150 characters.");

    const response = await result.response;
    console.log(response);

    const activities: Activity[] =  JSON.parse(response.candidates![0].content.parts[0].text!);

    return activities;
  }
}
