import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  // Form Objects
  formSubmitted:boolean=false;
  LoginForm:FormGroup;
  //LoginError:string="";

  constructor(
    private formBuidler : FormBuilder,
    private autService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.buildForm();
  }

  LoginUser()
  {
    //this.LoginError = "";
    this.formSubmitted = true;
    if(this.LoginForm.valid)
    {
      var tempFormData = this.LoginForm.value;
      this.autService.LoginUser(tempFormData.username, tempFormData.password)
      .subscribe((res:any)=>{
        if(res.status=="success")
        {        
            var user_object_string = JSON.stringify(res.data);
            localStorage.setItem("USER",user_object_string);                       
            this.router.navigate(["home"]);
        }
        else
        {
          //this.LoginError = res.error;
          console.log(res);
          Swal.fire("Authentication Failed",  res.error, "error");
          
        }
    })

    }

  }

  buildForm()
  {
    this.LoginForm = this.formBuidler.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }



}
