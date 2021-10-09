import 'package:flutter/material.dart';

class MyThemes {
  static ThemeData lightTheme(BuildContext context) => ThemeData(
        cardColor: Colors.blueGrey[100],
        appBarTheme: AppBarTheme(
          color: Colors.blueGrey[300],
          elevation: 8.0,
          iconTheme: IconThemeData(color: Colors.black),
          textTheme: Theme.of(context).textTheme,
        ),
      );

  static ThemeData darkTheme(BuildContext context) => ThemeData(
        brightness: Brightness.dark,
        cardColor: Colors.black54,
        appBarTheme: AppBarTheme(
          color: Colors.black87,
          elevation: 8.0,
          iconTheme: IconThemeData(
            color: Colors.white,
          ),
        ),
      );
}
