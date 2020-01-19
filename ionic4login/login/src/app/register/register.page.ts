import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { async } from 'q';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

 full_name: string = '';
 phone_number: string = '';
 username: string = '';
 password: string = '';
 confirm_password: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    ) { }

  ngOnInit() {

  }

  formLogin() {
    this.router.navigate(['/login']);
  }

  async addRegister() {
    if (this.full_name == '') {
      const toast = await this.toastController.create({
      message: 'Nom Obligatoire',
      duration: 2000
      });
      toast.present();
    } else if (this.phone_number == '') {
      const toast = await this.toastController.create({
        message: 'Numéro est Obligatoire',
        duration: 2000
        });
      toast.present();
    } else if (this.username == '') {
      const toast = await this.toastController.create({
        message: 'Username est obligatoire',
        duration: 2000
        });
      toast.present();

    } else if (this.password == '') {
      const toast = await this.toastController.create({
        message: 'Password est obligatoire',
        duration: 2000
        });
      toast.present();

    } else if (this.password != this.confirm_password) {
      const toast = await this.toastController.create({
        message: 'le mot de passe doit etre identique',
        duration: 2000
        });
      toast.present();
    } else {
      let body = {
        full_name: this.full_name,
        phone_number: this.phone_number,
        username: this.username,
        password: this.password,
        aksi: 'add_register'
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe(async data => {
       var alertpesan = data.msg;
       if (data.success) {
         this.router.navigate(['/login']);
         const toast = await this.toastController.create({
          message: 'Inscription Réussite',
          duration: 2000
         });
         toast.present();
       } else {
         const toast = await this.toastController.create({
           message: alertpesan,
           duration: 2000
         });
       }
     });

    }
  }

}
