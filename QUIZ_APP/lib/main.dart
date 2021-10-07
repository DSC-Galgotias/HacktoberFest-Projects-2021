import 'package:flutter/material.dart';
import 'Question_Set.dart';
import 'dart:math';
//import 'package:url_launcher/url_launcher.dart';
void main(){
  runApp(MyApp());
}
class MyApp extends StatelessWidget{
   MyApp({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quiz APP',
      home: MyScoford(),
    );
  }
}
class MyScoford extends StatelessWidget{
  MyScoford ({Key?key}):super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Builder(
          builder: (BuildContext context) {
            return IconButton(
                icon: Icon(Icons.menu),
              tooltip:MaterialLocalizations.of(context).openAppDrawerTooltip,
              onPressed: () { Scaffold.of(context).openDrawer(); },
            );
            },
        ),
        title: const Text('my app'),
        actions: <Widget> [
          IconButton(
              icon: Icon(Icons.add_alert),
              tooltip: 'new notification',
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('This is no new notification')));
            },
          ),
          IconButton(
            icon: Icon(Icons.account_circle_rounded),
            tooltip: 'About',
            onPressed: (){
              Navigator.push(context, MaterialPageRoute<void>(
                builder: (BuildContext context) {
                 return Scaffold(
                     backgroundColor: Colors.teal,
                     body: SafeArea(
                         child: Column(
                           mainAxisAlignment: MainAxisAlignment.center,
                           children: <Widget>[
                             CircleAvatar(
                               radius: 50.0,
                               backgroundImage: AssetImage('Assets/j.jpg'),
                             ),
                             Text(
                               'Jay Prakash Pandey',
                               style: TextStyle(
                                 //fontFamily: 'Pacifico',
                                 fontSize: 40.0,
                                 color: Colors.white,
                                 fontWeight: FontWeight.bold,
                               ),
                             ),
                             Text(
                               'Engineer',
                               style: TextStyle(
                                 //fontFamily: 'Source Sans Pro',
                                 color: Colors.teal.shade100,
                                 fontSize: 20.0,
                                 letterSpacing: 2.5,
                                 fontWeight: FontWeight.bold,
                               ),
                             ),
                             SizedBox(
                               height: 20.0,
                               width: 150.0,
                               child: Divider(
                                 color: Colors.teal.shade100,
                               ),
                             ),
                             Card(
                                 margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 25.0),
                                 child: ListTile(
                                   leading: Icon(
                                     Icons.phone,
                                     color: Colors.teal,
                                   ),
                                   onTap: (){/*
                                     _launchCaller() async {
                                       const url = "tel:6205269982";
                                       if (await canLaunch(url)) {
                                         await launch(url);
                                       } else {
                                         throw 'Could not launch $url';
                                       }
                                     }*/
                                   },
                                   title: Text(
                                     '+91 6205269982',
                                     style: TextStyle(
                                       color: Colors.teal.shade900,
                                       //fontFamily: 'Source Sans Pro',
                                       fontSize: 20.0,
                                     ),
                                   ),
                                 )),
                             Card(
                                 margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 25.0),
                                 child: ListTile(
                                   leading: Icon(
                                     Icons.email,
                                     color: Colors.teal,
                                   ),
                                   onTap: (){/*
                                     _launchCaller() async {
                                       const url = "tel:6205269982";
                                       if (await canLaunch(url)) {
                                         await launch(url);
                                       } else {
                                         throw 'Could not launch $url';
                                       }
                                     }*/
                                   },
                                   title: Text(
                                     'jayprakashpandey47b@gmail.com',
                                     style: TextStyle(
                                         fontSize: 16.0,
                                         color: Colors.teal.shade900,
                                         //fontFamily: 'Source Sans Pro'),
                                   ),
                                 ))
                         )
                         ]
                     ),
                   ),
                  );
             }
          ),
          );
      }
      ),
        ],
        ),
      body: MyStaeful(),
    );
  }
}


class MyStaeful extends StatefulWidget {
  const MyStaeful({Key? key}) : super(key: key);

  @override
  _MyStaefulState createState() => _MyStaefulState();
}

class _MyStaefulState extends State<MyStaeful> {
  int qn=0,ql=0,score=0;
  var clr1=Colors.cyan,clr2=Colors.cyan,clr3=Colors.cyan,clr4=Colors.cyan;
  List <String> Q=['What is the default encoding for an OutputStreamWriter?',
    'In character stream I/O, a single read/write operation performs _____.',
    'Which of the following modifiers can be used for a variable so that it can be accessed by any thread or a part of a program?',
    'If a thread goes to sleep',
    'If three threads trying to share a single object at the same time, which condition will arise in this scenario?',
    'How many threads can be executed at a time?','What is meant by the classes and objects that dependents on each other?',
    'Which of the following is a mutable class in java?',
    'Given,\n  ArrayList list = new ArrayList();\nWhat is the initial quantity of the ArrayList list?',
    'Which of the following is a valid syntax to synchronize the HashMap?',
    'Which of the given methods are of Object class?','What is the use of \w in regex?','Which of the following is false?',
    'In java, jar stands for_____.','Which keyword is used for accessing the features of a package?',
    'Which of the following is a reserved keyword in Java?','What is the use of the intern() method?',
    'In which memory a String is stored, when we create a string using new operator?',
    'What do you mean by chained exceptions in Java?','Which of these classes are the direct subclasses of the Throwable class?',
    'Which option is false about the final keyword?'
  ];//ToDo: add some question

  List <List<String>> o=[['UTF-8','Default encoding of the host platform','UTF-12','None of the above'],
    ['Two bytes read write at a time.','Eight bytes read write at a time.','One byte read nwrite at a time.','Five bytes read write at a time.'],
    ['global','transient','volatile','default'],
    ['It releases all the locks it has.','It does not release any locks.','It releases half of its locks.','It releases all of its lock except one.'],
    ['Time-Lapse','Critical situation','Race condition','Recursion'],
    ['Only one thread','Multiple threads','Only main (main() method) thread','Two threads'],
    ['Tight Coupling','Cohesion','Loose Coupling','None of the above'],
    ['java.lang.String','java.lang.Byte','ava.lang.Short','java.lang.StringBuilder'],
    ['5','10','0','100'],['Map m = hashMap.synchronizeMap();','HashMap map =hashMap.synchronizeMap();','Map m1 = Collections.synchronizedMap(hashMap);','Map m2 = Collection.synchronizeMap(hashMap)'],
    ['notify(), wait( long msecs ), and synchronized()','wait( long msecs ), interrupt(), and notifyAll()','notify(), notifyAll(), and wait()','sleep( long msecs ), wait(), and notify()'],
    ['Used for a whitespace character','Used for a non-whitespace character','Used for a word character','Used for a non-word character'],
    ['The rt.jar stands for the runtime jar','It is an optional jar file','It contains all the compiled class files','All the classes available in rt.jar is known to the JVM'],
    ['Java Archive Runner','Java Application Resource','Java Application Runner','None of the above'],
    ['package','import','extends','export'],['object','strictfp','main','system'],
    ['It returns the existing string from memory','It creates a new string in the database','It modifies the existing string in the database','None of the above'],
    ['Stack','String memory','Heap memory','Random storage space'],
    ['Exceptions occurred by the VirtualMachineError','An exception caused by other exceptions','Exceptions occur in chains with discarding the debugging information','None of the above'],
    ['RuntimeException and Error class','Exception and VirtualMachineError class','Error and Exception class','IOException and VirtualMachineError class'],
    ['A final method cannot be overridden in its subclasses.','A final class cannot be extended.','A final class cannot extend other classes.','A final method can be inherited']
  ];
  List <int> A=[1,0,2,1,2,1,0,3,1,2,2,2,1,3,1,1,0,1,2,2];
  Question_set question =Question_set();
  //TODO: ADD some question answer
  //Question_Set questions=Question_Set(0);

  @override
  Widget build(BuildContext context) {

    return Column(
       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      //crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        Container(
          color: Colors.yellow,
          margin: EdgeInsets.all(25),
          child: Expanded(
            child: Text(
              Q[qn],
              // TODO:question no
            //question.next().question,
            style: TextStyle(
                fontWeight: FontWeight.bold,
                 fontSize: 20.0,),
            ),
          ),
        ),
        Container(
          child: Row(
            children: [
             Flexible(child:TextButton(
               child: Text(
                 o[qn][0],
                 //question.next().option1,
                 style: TextStyle(color: Colors.white),),//TODO: OPtion 1
               style: TextButton.styleFrom(backgroundColor: clr1),
               onPressed:(){
                  setState(() {
                     clr1=(clr1==Colors.cyan)?Colors.red:Colors.cyan;
                     clr2=Colors.cyan;clr3=Colors.cyan;clr4=Colors.cyan;}
                  );//setState
                } ,//onPressed
                //onPressed
              ),
             ),
              SizedBox(
                width: 125,
              ),
              Flexible(
                child: TextButton(
                  child: Text(
                    o[qn][1],
                    //question.next().option2,
                    style: TextStyle(color: Colors.white),),
                  style: TextButton.styleFrom(backgroundColor: clr2),
                  onPressed: (){
                  setState(() {
                    clr2=(clr2==Colors.cyan)?Colors.red:Colors.cyan;
                    clr1=Colors.cyan;clr3=Colors.cyan;clr4=Colors.cyan;
                  });
                  } ,

                ),
              ),
            ],
          ),
        ),
        Container(
          child: Row(
            children: [
              Flexible(
                child: TextButton(
                  child: Text(
                    o[qn][2],
                    //question.next().option3,
                    style: TextStyle(color: Colors.white),),
                  style: TextButton.styleFrom(backgroundColor: clr3),
                  onPressed:(){
                    setState(() {
                      clr3=(clr3==Colors.cyan)?Colors.red:Colors.cyan;
                      clr1=Colors.cyan;clr2=Colors.cyan;clr4=Colors.cyan;
                    }
                    );//setState
                  },
                  //onPressed
                ),
              ),
              SizedBox(
                width: 125,
              ),
              Flexible(
                child: TextButton(
                  child: Text(
                    o[qn][3],
                    //question.next().option4,
                    style: TextStyle(color: Colors.white),),
                  style: TextButton.styleFrom(backgroundColor: clr4),
                  onPressed: (){
                    setState(() {
                      clr4=(clr4==Colors.cyan)?Colors.red:Colors.cyan;
                      clr1=Colors.cyan;clr2=Colors.cyan;clr3=Colors.cyan;
                    });
                  },//onPressed
                ),
              ),
            ],
          ),
        ),
        Container(
          child: Row(
            children: [
              Container(
                margin: EdgeInsets.only(left: 25),
                child: TextButton(
                  child: Text('SKIP'),
                  onPressed: (){setState(() {
                    if(ql<10){qn++;qn=Random().nextInt(20);}//TODO:change qn
                  });
                  },
                ),
              ),
              Container(
                margin: EdgeInsets.only(left: 155),
                child: TextButton(
                  child: Text('NEXT'),
                  onPressed: (){setState(() {
                    if(ql==10){score--;
                      Navigator.push(context, MaterialPageRoute<void>(
                      builder: (BuildContext context) {
                      return Scaffold(
                        backgroundColor: Colors.teal,
                        appBar: AppBar(title:Text( 'RESULT'),),
                        body:Center(
                          child: Column(
                            children: [
                              Expanded(
                                  child: Text('Your score is $score/10',style: TextStyle(color: Colors.red,fontSize: 45.0,fontWeight: FontWeight.bold),)),
                              TextButton(
                                child: Text('RESTART',style: TextStyle(color: Colors.white),),
                                style: TextButton.styleFrom(backgroundColor: Colors.black),
                                onPressed: (){
                                  Navigator.push(context, MaterialPageRoute<void>(
                                  builder: (BuildContext context) {return MyScoford();},
                                  ),
                                  );
                                  },
                              ),
                            ],
                          ),
                      ),
                      );}
                      ),
                      );//navigate
                        }
                    if(clr1==Colors.red && A[qn]==0){score++;}
                    if(clr2==Colors.red && A[qn]==1){score++;}
                    if(clr3==Colors.red && A[qn]==2){score++;}
                    if(clr4==Colors.red && A[qn]==3){score++;}
                    if(ql<10 && (clr1==Colors.red||clr2==Colors.red||clr3==Colors.red||clr4==Colors.red)){qn++;ql++;qn=Random().nextInt(20);clr1=Colors.cyan;clr2=Colors.cyan;clr3=Colors.cyan;clr4=Colors.cyan;}
                    //TODO:change qn
                  });
                  },
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}