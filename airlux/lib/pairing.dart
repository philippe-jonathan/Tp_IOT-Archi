import 'package:flutter/material.dart';

class Pairing extends StatelessWidget {
  const Pairing({Key? key, required this.title}) : super(key: key);
  final String title;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {},
              child: const Text('Rechercher'),
            ),
          ],
        ),
      ),
    );
  }
}
