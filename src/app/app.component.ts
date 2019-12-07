import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'captcha-code';

  captchaLength = 6; // Captcha length
  captchaString = ''; // Captcha String
  message = ''; // Message captcha is valid or not

  ngOnInit(){
    this.createCaptcha()
  }

  /**
  * // createCaptcha() method
  * Create the cpatcha string and display on canvas
  */
  createCaptcha() {
    this.captchaString = '';
    let canvas = <HTMLCanvasElement>document.getElementById("captchaCanvas");
    let context = canvas.getContext("2d");
    context.clearRect(0,0,180,80)

    // Create captcha array - combination of alphabet and integer 
    const capitalAlphabet = Array.from(Array(26), (e, i) => String.fromCharCode(i + 65));
    const smallAlphabet = Array.from(Array(26), (e, i) => String.fromCharCode(i + 97));
    const integer = Array.from(Array(10), (e, i) => i.toString());
    const captchaArray = [...capitalAlphabet, ...smallAlphabet, ...integer];

    // Create capcha string
    for (let i = 0; i < this.captchaLength; i++) {
      this.captchaString = this.captchaString + captchaArray[Math.floor(Math.random() * captchaArray.length)];
    }

    // Create image on canvas for captcha
    context.font = "20px Arial";
    context.fillText(this.captchaString, 10, 30);
  }

 /**
  * // ValidateCaptcha() method
  * If the input is valid then retrun true and display message.
  * Else return false and dsiplay message 
  * @returns boolean
  */
  ValidateCaptcha():boolean {
    const userInputValue = (<HTMLInputElement>document.getElementById('userInput')).value;
    if (this.captchaString == userInputValue) {
        this.message = "Valid captcha";
          return true
    } else {
      this.message = "InValid captcha, Please enter new cpatcha again";
      this.createCaptcha()
    return false;
    }
  }

}
