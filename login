<div class="container text-center">
    <div style="margin-top: 100px;" class="text-center container">
        <h1 style="font-size: 40px;">Login</h1>


        <svg style="margin-top: 30px; color:navy" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path fill-rule="evenodd"
                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </svg>

        <div class="row container">



            <mat-card style="background-color: #F5F5F5;">
                <div class="text-center">
                    <mat-form-field class="w-100">
                        <mat-label>Email</mat-label>
                        <input matInput [(ngModel)]="email" placeholder="Ingresa tu usuario">
                    </mat-form-field>
                </div>
                <div class=" text-center">
                    <mat-form-field class="w-100">
                        <mat-label>Contraseña</mat-label>
                        <input type="password" [(ngModel)]="constraseña" matInput placeholder="*******">
                </div>
                <div class="d-grid gap-2 col-6 mx-auto" style="margin-top: 20px;">
                    <button mat-raised-button (click)="onLogin()">Ingresa</button>
                </div>
                <div class="etc-login-form" style=" margin-top:10px;color: #919191">
                    <p>Olvidaste tu contraseña? <a href="#">has clik aquí</a></p>
                    <p>Nuevo usuario? <a href="#">Crea una nueva cuenta</a></p>
                </div>
            </mat-card>

        </div>

    </div>
</div>
