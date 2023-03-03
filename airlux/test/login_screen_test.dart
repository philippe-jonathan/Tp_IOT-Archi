// import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:airlux/screens/login_screen.dart';

void main() {
  testWidgets('LoginScreen tests', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(LoginScreen());

    expect(find.text('Connectez vous!'), findsOneWidget);
  });
}
