---
title: SQL Basics
date: 2022-07-09 21:50:31
cover: /images/sql1.png
categories:
- tech
tags:
- tech
- database
- SQL
---

## PL/SQL Concepts
### Ref
1. [PL/SQL Wiki](https://en.wikipedia.org/wiki/PL/SQL)

### Definition
- **Procedural Language for SQL** is a procedural extesion for SQL. 
- Most commonly used features include:
  - Program units
    - Block
    - Function
    - Procedure
    - Package
    - Trigger
  - Data types
    - Numeric
    - Character
    - Date
    - Exceptions
    - Specifi columns
  - Conditional statements
  - Array handling
    - Associative arrays(index-by tables)
    - Nested tables
    - Varrays(variable-size arrays)
  - Cursors
  - Looping
  - Dynamic SQL

## Trigger

## Stored Procedure and Function

### Refs
1. [Oracle Procedures](https://www.techonthenet.com/oracle/procedures.php)
2. [PL/SQL Tutorial](https://www.tutorialspoint.com/plsql/index.htm)

### Stored Procedure vs Function
[Function vs Stored Procedure](https://stackoverflow.com/questions/1179758/function-vs-stored-procedure-in-sql-server): 

> Functions follow the computer-science definition in that they MUST return a value and cannot alter the data they receive as parameters (the arguments). Functions are not allowed to change anything, must have at least one parameter, and they must return a value. Stored procs do not have to have a parameter, can change database objects, and do not have to return a value.

### Store Procedure
#### Syntax

``` sql
-- create a procedure:
CREATE [OR REPLACE] PROCEDURE procedure_name
    [ (parameter [,parameter]) ]

IS
    [declaration_section]

BEGIN
    executable_section

[EXCEPTION
    exception_section]

END [procedure_name];

-- drop a procedure:
DROP PROCEDURE procedure_name;
```

- Parameter types:
  - **IN**: Passed into the procedure, must assign a value, immutable.
  - **OUT**: Not required to assign a value, mutable.
  - **IN OUT**: Passed into the procedure, must assign a value, mutable.

#### Cursor
- A cursor is a pointer that points to the result of a query.


#### Examples

``` sql
```

## Window function

## Others

### Database link

### ORA-01489 result of string concatenation is too long
Ref: [Stack Overflow ORA-01489](https://stackoverflow.com/questions/29776035/oracle-ora-01489-result-of-string-concatenation-is-too-long)

### Update inserted row with trigger
Ref: [Stack Overflow](https://stackoverflow.com/questions/45313561/update-inserted-row-with-trigger)