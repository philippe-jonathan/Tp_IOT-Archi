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
  List<BluetoothDevice> devices = [];
  bool isConnected = false;

  // Functions
  void startScan() {
    devices.clear();

    // Start scanning
    flutterBlue.startScan(timeout: const Duration(seconds: 2));

    // Listen to scan results
    flutterBlue.scanResults.listen((results) {
      // do something with scan results
      for (ScanResult r in results) {
        if (r.device.name.isNotEmpty && !devices.contains(r.device)) {
          setState(() {
            devices.add(r.device);
          });
        }
        // print('${r.device.name} found! rssi: ${r.rssi} | ${r.device.id}');
      }
    });

    // Stop scanning
    flutterBlue.stopScan();
  }

  void connect(device) async {
    print('Test connect');
    await device.connect();
    setState(() {
      isConnected = true;
    });
    await device.discoverServices();

    // var characteristics = service.characteristics;
    // List<BluetoothService> services = await device.discoverServices();
    // services.forEach((service) async {
    // do something with service
    // var characteristics = service.characteristics;
    // for (BluetoothCharacteristic c in characteristics) {
    //   List<int> value = await c.read();
    //   print(value);
    //   var descriptors = c.descriptors;
    //   for (BluetoothDescriptor d in descriptors) {
    //   List<int> value = await d.read();
    //   print(value);
    //   }
    //   }
    // });
  }

  void disconnect(device) async {
    print('Test disconnect');
    await device.disconnect();
    setState(() {
      isConnected = false;
    });
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
            title: Text(
                '${devices[index].name} | ${devices[index].state.isBroadcast}'),
            trailing: ElevatedButton(
                onPressed: () {
                  if (isConnected == false) {
                    connect(devices[index]);
                  } else {
                    disconnect(devices[index]);
                  }
                },
                child: isConnected == false
                    ? Text('Connecter')
                    : Text('Déconnecter')),
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
