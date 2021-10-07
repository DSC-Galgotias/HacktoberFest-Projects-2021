import 'dart:html';

import 'package:flutter/material.dart';
void main() => runApp(MaterialApp(
  home: Scaffold(
    appBar: AppBar(
      title: Text('my app'),
      backgroundColor: Colors.red,
      centerTitle: true,
      ),
    body: Container(
        child: Image(
       image: AssetImage('ganesh-2.jpg'),
      ),
    ),
    persistentFooterButtons: [],
    ),
  ),
);