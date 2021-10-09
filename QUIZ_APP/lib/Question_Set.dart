class _Questions{
  int _ans;
  String question,option1,option2,option3,option4;
  _Questions(this.question,this.option1,this.option2,this.option3,this.option4,this._ans);
}
class Question_set{
  int qn=0;
  List<_Questions> questions=[_Questions('What is the default encoding for an OutputStreamWriter?','UTF-8','Default encoding of the host platform','UTF-12','None of the above',1),
  _Questions('In character stream I/O, a single read/write operation performs _____.', 'Two bytes read write at a time.','Eight bytes read write at a time.','One byte read nwrite at a time.','Five bytes read write at a time.',0),
  _Questions('Which of the following option leads to the portability and security of Java?','Bytecode is executed by JVM','The applet makes the Java code secure and portable','Use of exception handling','Dynamic binding between objects',0)
  ];
  //questions.add();
  _Questions next(){//qn=Random().nextInt(20);
    return questions[1];
  }
}

