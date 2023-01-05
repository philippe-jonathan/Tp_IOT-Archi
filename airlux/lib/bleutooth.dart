import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:flutter_blue_plus/gen/flutterblueplus.pbjson.dart';

class BluetoothDeviceListPage extends StatefulWidget {
  const BluetoothDeviceListPage({super.key});

  @override
  _BluetoothDeviceListPageState createState() =>
      _BluetoothDeviceListPageState();
}

class _BluetoothDeviceListPageState extends State<BluetoothDeviceListPage> {
  // Nous allons utiliser cette liste pour stocker les appareils trouvés lors du scan
  final List<ScanResult> devicesList = <ScanResult>[];

  _addDeviceTolist(final ScanResult device) {
    if (devicesList.contains(device)) {
      setState(() {
        devicesList.add(device);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Appareils Bluetooth'),
      ),
      body: ListView.builder(
        itemCount: devicesList.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(devicesList[index].device.name),
            subtitle: Text(devicesList[index].device.id.toString()),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          // Lorsque l'utilisateur appuie sur le bouton, nous allons lancer un scan
          // et mettre à jour la liste d'appareils
          var devices = await FlutterBluePlus.instance
              .startScan(timeout: const Duration(seconds: 4));

          devices.forEach((scanResult) {
            // Vous pouvez traiter chaque appareil ici
            _addDeviceTolist(devices);
          });
        },
        child: const Icon(Icons.refresh),
      ),
    );
  }
}
