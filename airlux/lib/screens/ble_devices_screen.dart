import 'package:airlux/screens/home_screen.dart';
import 'package:airlux/screens/signup_screen.dart';
import 'package:airlux/widgets/custom_textfield.dart';
import 'package:flutter/material.dart';

class BleDevices extends StatelessWidget {
  BleDevices({super.key});

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
                'Listes des appareils bleutooth !',
                style: Theme.of(context).textTheme.titleMedium,
                ),
                
            ],
          ),
          
        ),
      ),
    );
  }
}