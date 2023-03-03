import 'package:airlux/screens/ble_devices_screen.dart';
import 'package:airlux/screens/palces_screen.dart';
import 'package:airlux/screens/users_screen.dart';
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
            PopupMenuButton(
                icon: const Icon(Icons.add_box_outlined),
                itemBuilder: (context) {
                  return [
                    const PopupMenuItem<int>(
                      value: 0,
                      child: Text("Appareils"),
                    ),
                    const PopupMenuItem<int>(
                      value: 1,
                      child: Text("Lieux"),
                    ),
                    const PopupMenuItem<int>(
                      value: 2,
                      child: Text("Utillisateurs"),
                    ),
                  ];
                },
                onSelected: (value) {
                  if (value == 0) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const BleDevices()),
                    );
                  } else if (value == 1) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PlacesScreen()),
                    );
                  } else if (value == 2) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const UsersScreen()),
                    );
                  }
                })
          ]),
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
