import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyConverter{
	constructor(private http: Http){
		console.log("CurrencyConverter Initialized");
	}
	public getCurrency = (b) => {
		return this.http.get('https://api.fixer.io/latest?base=' + b).map(res => {
			if(res.status < 200 || res.status >= 300) {
				console.log(res)
				throw new Error('This request has failed ' + res.status);
			  } 
			  // If everything went fine, return the response
			  else {
				  console.log(res);
				return res.json();
			  }
		}) //res.json())
	}
}