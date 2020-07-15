import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

    constructor(
    	private route:ActivatedRoute,
    	private router:Router
    ) { }

    ngOnInit(): void {
    }

    //just for test
    public redirect(link){
    	console.log(link)
    	this.router.navigate([link])
    }

}
