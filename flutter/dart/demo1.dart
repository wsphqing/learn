// import 'dart:html';

void main(List<String> arguments) {
  print(arguments);

  var list = ['apples', 'bananas', 'oranges'];
  list.forEach((item) {
    print('${list.indexOf(item)}: $item');
  });

  double number = 42;
  doStuff();

  _printInteger(number);
}

_printInteger(double aNumber) {
  print('The number is ${aNumber}');
}

void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}
