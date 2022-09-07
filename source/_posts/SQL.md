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

### Stored Procedure
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

#### Test Data
- Initalize test data for the examples:

``` sql
create table customers (
  id number primary key,
  name varchar2(50),
  age number,
  address varchar2(50),
  salary number
);

insert into customers values(1, 'Ramesh', 32, 'Abmedabad', 2000);
insert into customers values(2, 'Khilan', 25, 'Delhi', 1500);
insert into customers values(3, 'Kaushik', 23, 'Kota', 2000);
insert into customers values(4, 'Chaitali', 25, 'Mumbai', 6500);
insert into customers values(5, 'Hardik', 27, 'Bhopal', 8500);
insert into customers values(6, 'Komal', 22, 'MP', 4500);
```

#### Cursor
- A cursor is a pointer that points to the result of a query.
- There are two types of cursors:
  - Implicit cursor
    - Automatically created by Oracle whenever an SQL statement is executed.
    - Whenever a DML(INSERT, UPDATE and DELETE) statement is executed, an implicit cursor is associated with this statement.
    - For INSERT statement, the cursor holds the data to be inserted; For UPDATE and DELETE statement, the cursor identifies the rows that would be affected.
  - Explicit cursor
    - Created on a SELECT statement which returns more than one row.

- Cursor attributes
|Attribute|Description|
|:-----:|:-----|
|%FOUND|Returns TRUE if an INSERT, UPDATE, or DELETE statement affected one or more rows or a SELECT INTO statement returned one or more rows. Otherwise, it returns FALSE.|
|%NOTFOUND|The logical opposite of %FOUND. It returns TRUE if an INSERT, UPDATE, or DELETE statement affected no rows, or a SELECT INTO statement returned no rows. Otherwise, it returns FALSE.|
|%ISOPEN|Always returns FALSE for implicit cursors, because Oracle closes the SQL cursor automatically after executing its associated SQL statement.|
|%ROWCOUNT|Returns the number of rows affected by an INSERT, UPDATE, or DELETE statement, or returned by a SELECT INTO statement.|

#### Examples
- Implicit cursor:

``` sql
DECLARE
  total_rows number(2);
BEGIN
  UPDATE customers SET salary = salary + 500;
  IF sql%notfound THEN
    dbms_output.put_line('no customers updated');
  ELSIF sql%found THEN
    total_rows := sql%rowcount;
    dbms_output.put_line(total_rows || ' customers updated ');
  END IF;
  COMMIT;
END;
-- output: 6 customers updated 
```

- Explicit cursor:

``` sql
DECLARE 
   c_id customers.id%type; 
   c_name customers.name%type; 
   c_addr customers.address%type; 
   CURSOR c_customers is 
      SELECT id, name, address FROM customers; 
BEGIN 
   OPEN c_customers; 
   LOOP 
   FETCH c_customers into c_id, c_name, c_addr; 
      EXIT WHEN c_customers%notfound; 
      dbms_output.put_line(c_id || ' ' || c_name || ' ' || c_addr); 
   END LOOP; 
   CLOSE c_customers; 
END; 
-- output:
-- 1 Ramesh Abmedabad
-- 2 Khilan Delhi
-- 3 Kaushik Kota
-- 4 Chaitali Mumbai
-- 5 Hardik Bhopal
-- 6 Komal MP
```

- Simplest procedure:

``` sql
CREATE OR REPLACE PROCEDURE greetings 
AS 
BEGIN 
   dbms_output.put_line('Hello World!'); 
END; 

-- Run the procedure in different ways:
-- 1. CALL
call greetings();
-- 2. EXECUTE
execute greetings; -- Notice this cannot be used in IDEs like PL/SQL Developer. Only viable in sql*plus or Oracle SQL Developer. See why here: https://stackoverflow.com/questions/13722307/ora-00900-invalid-sql-statement-when-run-a-procedure-in-oracle-10g
-- 3. in a PL/SQL block:
begin 
  greetings;
end;
-- Hello World!
```

- Procedure with parameters: 

``` sql
DECLARE 
   a number; 
   b number; 
   c number;
PROCEDURE findMin(x IN number, y IN number, z OUT number) IS 
BEGIN 
   IF x < y THEN 
      z:= x; 
   ELSE 
      z:= y; 
   END IF; 
END; 

  
BEGIN 
   a:= 23; 
   b:= 45; 
   findMin(a, b, c); 
   dbms_output.put_line(' Minimum of (23, 45) : ' || c); 
END;
-- output: Minimum of (23, 45) : 23
```

``` sql
DECLARE 
   a number; 
PROCEDURE squareNum(x IN OUT number) IS 
BEGIN 
  x := x * x; 
END;  


BEGIN 
   a:= 23; 
   squareNum(a); 
   dbms_output.put_line(' Square of (23): ' || a); 
END; 
-- output:  Square of (23): 529

```


## Window function

## Others

### Database link

### ORA-01489 result of string concatenation is too long
Ref: [Stack Overflow ORA-01489](https://stackoverflow.com/questions/29776035/oracle-ora-01489-result-of-string-concatenation-is-too-long)

### Update inserted row with trigger
Ref: [Stack Overflow](https://stackoverflow.com/questions/45313561/update-inserted-row-with-trigger)