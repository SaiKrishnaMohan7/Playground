# Bash Notes

- `set` - reveal env vars in the terminal
- `date` - current system date
- `who` - who is currently logged in
- *Output Redirection*
  - `command > file` - redirect output to a file, overwrite
  - `command >> file` - redirect output append to file
- *Input Redirection*
  - `command < file` - supply contesnts of a file into a command

## Varibales

- Dynamic typing
- this is a legal variable: `varOne=1`, note no space, no identifier
- There's a way to assign a command to a variable:

```shell
# today holds the output returned by running `date`
today=`date`

echo "Today is: " $today
```
