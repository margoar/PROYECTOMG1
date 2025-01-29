import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent {

  isLoggedIn: boolean =false;
  loggedInUser:string  | null = null;
  private jwtHelper = new JwtHelperService(); // Instancia del helper de JWT



constructor(
  private loginService: AuthService,
  private router : Router
){}

ngOnInit() {
  const token = this.loginService.getToken();

  if (token && !this.jwtHelper.isTokenExpired(token)) {
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);

    try {
      const userInfo = this.loginService.getUserInfo();

      const decodedToken = this.jwtHelper.decodeToken(token);
      this.loggedInUser = userInfo.correoUsuario;

      console.log(this.loggedInUser);
    } catch (error) {
      console.error("Error decodificando el token:", error);
      this.isLoggedIn = false;
    }
  } else {
    console.log(this.isLoggedIn);
    this.loginService.logout();
    this.isLoggedIn = false;
  }
}



logout(){
  this.loginService.logout();
  this.isLoggedIn =false;
  this.router.navigate(['/login']);
}

}
