import 'package:airlux/pages/devices_page.dart';
import 'package:flutter/material.dart';

bool status = false;
int temp = 0;

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  MyHomePageState createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: const Text("Bluetooth Demo"),
        ),
        body: Center(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            status == true
                ? const Text("Statut : Lampe Allumée")
                : const Text("Statut : Lampe éteinte"),
            ElevatedButton(
                style:
                    ElevatedButton.styleFrom(padding: const EdgeInsets.all(10)),
                onPressed: () {
                  setState(() {
                    status = !status;
                  });
                },
                child: status == false
                    ? const Text("Alumer", style: TextStyle(fontSize: 30))
                    : const Text("Éteindre", style: TextStyle(fontSize: 30))),
            const SizedBox(height: 50),
            Text(
              "Il fait $temp °c",
              style: const TextStyle(fontSize: 30),
            )
          ],
        )),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => const DevicesPage(
                        title: 'Devices',
                      )),
            );
          },
          child: const Icon(Icons.add),
        ),
      );
}
