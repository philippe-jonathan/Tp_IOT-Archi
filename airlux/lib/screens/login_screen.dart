import 'package:airlux/screens/home_screen.dart';
import 'package:airlux/screens/signup_screen.dart';
import 'package:airlux/widgets/custom_textfield.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({super.key});

  // Text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AirLux'),
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Bonjour
              Text(
                'Connectez vous !',
                style: Theme.of(context).textTheme.titleMedium,
              ),

              const SizedBox(height: 50),

              // Email field
              CustomTextfield(
                controller: emailController,
                emailText: true,
                hintText: 'E-mail',
                obscureText: false,
              ),

              const SizedBox(height: 20),

              // Password field
              CustomTextfield(
                controller: passwordController,
                emailText: false,
                hintText: 'Mot de passe',
                obscureText: true,
              ),

              const SizedBox(height: 20),

              // Forgot password
              TextButton(
                  onPressed: () {}, child: const Text('Mot de passe oublié')),

              const SizedBox(height: 20),

              // Login button
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => HomeScreen()),
                  );
                },
                child: const Text('Connexion'),
              ),

              const SizedBox(height: 50),
              // Create account
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => SignupScreen()),
                  );
                },
                child: const Text('Créer un compte'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
