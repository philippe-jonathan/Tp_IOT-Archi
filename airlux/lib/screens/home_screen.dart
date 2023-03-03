import 'package:airlux/screens/ble_devices_screen.dart';
import 'package:airlux/screens/signup_screen.dart';
import 'package:airlux/widgets/custom_textfield.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen({super.key});

  // Text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AirLux'),
        automaticallyImplyLeading: false,
        actions: <Widget>[
          IconButton(
            onPressed: () {
               Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => BleDevices()),
                  );
            }, 
            icon: const Icon(Icons.add_home_work_rounded))
        ],
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [

              // Bonjour
              Text(
                'Bonjour !',
                style: Theme.of(context).textTheme.titleMedium,
                ),
        
            ],
          ),
          
        ),
      ),
    );
  }
}