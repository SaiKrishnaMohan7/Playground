# Bash Notes

- `set` - reveal env vars in the terminal
- `date` - current system date
- `who` - who is currently logged in
- *Output Redirection*
  - `command > file` - redirect output to a file, overwrite
  - `command >> file` - redirect output append to file
- *Input Redirection*
  - `command < file` - supply contents of a file into a command
  - `command << endOfFileMarkerString` - inline input redirection. This method allows you to specify the data for input redirection on the command line instead of in a file. When using this, shell will prompt for values from user. To mark the end of inputs, simply enter the `endOfFileMarkerString` (run it, you will understand what I am on about)
- `wc` - word count of a file
- `command1 | command2` - _pipe_ the result of command1 as input to command2
- `sort <textFile>` - sort the contents of the text file
- `more, less and most` - file navigation utils
- *Performing Math* (Only supports integer arithmetic, zsh supports floating point)
  - `expr <expressionToSolve>` - outputs the reuslt of the expression (errors when using * operator, solution: escape it --> `expr 5 \* 2`)
  - expr command in a shell script is cumbersome (backticks need to be used; _Solution:_ use brackets `$[mathematicalOperation]`)

  ```shell
  #!/bin/bash
  # An example of using the expr command var1=10
  var2=20
  var3=`expr $var2 / $var1`
  echo The result is $var3
  ```

  Solution:

  ```shell
    #!/bin/bash var1=100
    var2=50
    var3=45
    var4=$[$var1 * ($var2 - $var3)] echo The final result is $var4
  ```

  - expr command operators

  |Operator|Operand|
  |---|---|
  |  `ARG1 | ARG2` | Return ARG1 if neither argument is null or zero; otherwise, return ARG2. |
  | `ARG1 & ARG2`  | Return ARG1 if neither argument is null or zero; otherwise, return 0 |
  | `ARG1 < ARG2`  | Return 1 if ARG1 is less than ARG2; otherwise, return 0  |
  | `ARG1 <= ARG2` | Return 1 if ARG1 is less than or equal to ARG2; otherwise, return 0  |
  | `ARG1 = ARG2`  | Return 1 if ARG1 is equal to ARG2; otherwise, return 0  |
  | `ARG1 != ARG2` | Return 1 if ARG1 is not equal to ARG2; otherwise, return 0   |
  | `ARG1 >= ARG2` | Return 1 if ARG1 is greater than or equal to ARG2; otherwise, return 0  |
  | `ARG1 > ARG2`  | Return 1 if ARG1 is greater than ARG2; otherwise, return 0  |
  | `ARG1 + ARG2`  | Return the arithmetic sum of ARG1 and ARG2  |
  | `ARG1 - ARG2`  | Return the arithmetic difference of ARG1 and ARG2  |
  | `ARG1 * ARG2`  | Return the arithmetic product of ARG1 and ARG2.  |
  | `ARG1 / ARG2`  | Return the arithmetic quotient of ARG1 divided by ARG2  |
  | `ARG1 % ARG2`  | Return the arithmetic remainder of ARG1 divided by ARG2  |
  | `STRING : REGEXP`| Return the pattern match if REGEXP matches a pattern in STRING   |
  | `match STRING REGEXP` | Return the pattern match if REGEXP matches a pattern in STRING   |
  | `substr STRING POS LENGTH` | Return the substring LENGTH characters in length, starting at position POS
(starting at 1).   |
  | `index STRING CHARS` | Return position in STRING where CHARS is found; otherwise, return 0   |
  | `length STRING` | Return the numeric length of the string STRING  |
  | `+ TOKEN`  | Interpret TOKEN as a string, even if it’s a keyword  |
  | `(EXPRESSION)`  | Return the value of EXPRESSION  |

## Varibales

- Dynamic typing
- this is a legal variable: `varOne=1`, note no space, no identifier
- There's a way to assign a command to a variable:

```shell
# today holds the output returned by running `date`
today=`date`

echo "Today is: " $today
```
