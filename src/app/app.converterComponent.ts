import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'currency-converter',
  templateUrl: './app.converterComponent.html',
  styleUrls: ['./app.component.scss']
})

/**
 * A class that represents the converter component
 * @class ConverterComponent
 */
export class ConverterComponent {
  currencyFrom:String = 'CAD';
  currencyTo: String = 'USD';
  currencyList = [{name: 'CAD', value:0},
                  {name: 'USD', value:0},
                  {name: 'EUR', value:0}];
  convertFrom:number = 0.00; 
  convertTo:number = 0.00; 
  converterfactor:number;  
  
  /**
   * Sets the initial values of the select options to 'CAD' and 'USD'
   * @param http initialize the Http service to retrieve information from the fixer.io API
   */  
  constructor(private http: Http){
    this.currencyFrom = 'CAD';
    this.currencyTo = 'USD';
    this.getCurrencyRates(); 
  }

  /**
   * sets the currency to convert from
   * @param name - the name of the currency to convert from
   * @param value - the value of the selected currency
   */
  public setCurrencyFrom = (name:String, value:number) => { 
    this.currencyFrom = name;
    this.convertFrom = value; 
    this.getCurrencyRates();
  }  

  /**
   * gets the latest rates of currencies from the API and stores them into array 
   */
  public getCurrencyRates = () => {
    this.http.get('https://api.fixer.io/latest?base=' + this.currencyFrom)
    .map(res => {
			if(res.status < 200 || res.status >= 300) {
				throw new Error('This request has failed ' + res.status);
			} 
      else {
        return res.json();
      }
    })
    .subscribe(currencyRates => {
    //TODO: write codes so the clients can convert from any currency, not just USD, CAD and EUR
      this.currencyList.forEach((currency)=>{
        if(currency.name === 'CAD'){
          currency.value = currencyRates.rates.CAD
        }
        if(currency.name === 'USD'){
          currency.value = currencyRates.rates.USD
        }
        if(currency.name === 'EUR'){
          currency.value = currencyRates.rates.EUR
        } 
      });

      this.currencyList.forEach((currency)=>{
        if(currency.name === this.currencyTo){
          this.converterfactor = currency.value;
          this.convert();
        }
      });
    })
  }

  /**
   * sets the rate in which the currency should get converted in
   */
  public setCurrencyValue = () => {
    this.currencyList.forEach((currency)=>{
      if(this.currencyTo === currency.name){
        this.converterfactor = currency.value
      }
    });   
    return this.converterfactor;
  }

  /**
   * sets the currency to convert to
   * @param name - the name of the currency to convert to
   */
  public setCurrencyTo = (name: String) => {
    this.currencyTo = name;
    this.getCurrencyRates();
  }

  /**
   * converts the currency
   */
  public convert = () => {
    if(this.currencyTo == this.currencyFrom){
      this.convertTo = this.convertFrom;
    }
    else{
      this.convertTo = this.convertFrom * this.converterfactor
    }  
    this.convertTo = Math.round(this.convertTo * 100) / 100;
  }
  
  /**
   * prevents typing of invalid characters, i.e letters
   * @param evt - keyboard interaction event
   */
  public validateInput = (evt: any) => {
    const pattern = /[0-9\.]/;
    let inputChar = String.fromCharCode(evt.charCode);

    if (!pattern.test(inputChar)) {
      evt.preventDefault();
    }
  }

  /**
   * prevents typing when the function is called
   * @param evt - keyboard interaction event
   */
  public preventTyping = (evt: any) => {
    evt.preventDefault();
  }
}