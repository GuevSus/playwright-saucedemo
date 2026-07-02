    @login
    Feature: SauceDemo - Autenticacion

        Background:
            Given el usuario abre la página de SauceDemo
        
        @smoke @happy-path
        Scenario: Login exitoso con usuario estándar
            When el usuario ingresa el usuario "standard_user" y contraseña "secret_sauce"
            Then el usuario debería ver la página de productos

        @negative
        Scenario: Login fallido con usuario bloqueado
            When el usuario ingresa el usuario "locked_out_user" y contraseña "secret_sauce"
            Then el usuario debería ver un mensaje de error