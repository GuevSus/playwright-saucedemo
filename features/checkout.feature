@compra
Feature: SauceDemo - Flujo de Compra y Carrito

    Background:
        Given el usuario abre la página de SauceDemo
        And el usuario ingresa el usuario "standard_user" y contraseña "secret_sauce"

    @smoke @cart @happy-path
    Scenario: Agregar producto al carrito
        When el usuario agrega el producto "Sauce Labs Backpack" al carrito
        Then el carrito debería mostrar un producto

    @cart @happy-path
    Scenario: Ver productos en el carrito
        When el usuario agrega el producto "Sauce Labs Backpack" al carrito
        And el usuario va al carrito 
        Then el usuario debería ver el producto "Sauce Labs Backpack" en el carrito
    
    @smoke @checkout @happy-path
    Scenario: Completar proceso de compra
        When el usuario agrega el producto "Sauce Labs Backpack" al carrito
        And el usuario va al carrito
        And el usuario procede al checkout
        And el usuario completa la información de envío con nombre "QA Test", apellido "User" y código postal "14001"
        And el usuario finaliza la compra
        Then el usuario debería ver el mensaje de confirmación "Thank you for your order!"