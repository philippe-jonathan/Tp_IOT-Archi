import 'package:flutter/material.dart';
import 'package:flutter_blue/flutter_blue.dart';

class DevicesScreen extends StatefulWidget {
  const DevicesScreen({super.key, required this.title});

  final String title;

  @override
  State<DevicesScreen> createState() => _DevicesScreenState();
}

class _DevicesScreenState extends State<DevicesScreen> {
  // Variables
  FlutterBlue flutterBlue = FlutterBlue.instance;
  List<String> devices = [];

  // Fonctions
  void startScan() {
    // Start scanning
    flutterBlue.startScan(timeout: const Duration(seconds: 4));

    // Listen to scan results
    var subscription = flutterBlue.scanResults.listen((results) {
      // do something with scan results
      for (ScanResult r in results) {
        if (r.device.name.isNotEmpty) {
          setState(() {
            devices.add('${r.device.name} | rssi: ${r.rssi}');
          });
        }
        print('${r.device.name} found! rssi: ${r.rssi}');
      }
    });

    // Stop scanning
    flutterBlue.stopScan();
  }

  void connect(device) async {
    await device.connect();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ListView.builder(
        itemCount: devices.length,
        // prototypeItem: ListTile(
        //   title: Text(devices.first),
        // ),
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(devices[index]),
            trailing: ElevatedButton(
                onPressed: () {
                  connect(devices[index]);
                },
                child: Text('Connecter')),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          startScan();
        },
        tooltip: 'Search devices',
        child: const Icon(Icons.search),
      ),
    );
  }
}
