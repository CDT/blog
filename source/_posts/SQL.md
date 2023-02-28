---
title: SQL Basics
date: 2022-07-09 21:50:31
cover: /images/sql1.png
thumbnail: /images/sql1.png
toc: true
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
**If you run the examples in PL/SQL Developer, remember to run the code of the procedure creation in a program windows instead of a sql window. Sql window does not throw errors!**

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
  greetings(); -- For procedure without parameters, brackets are optional.
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

- Exception handling:

``` sql
DECLARE
  c_id   customers.id%type := 8;
  c_name customerS.Name%type;
  c_addr customers.address%type;
BEGIN
  SELECT name, address INTO c_name, c_addr FROM customers WHERE id = c_id;
  DBMS_OUTPUT.PUT_LINE('Name: ' || c_name);
  DBMS_OUTPUT.PUT_LINE('Address: ' || c_addr);

EXCEPTION
  WHEN no_data_found THEN
    dbms_output.put_line('No such customer!');
  WHEN others THEN
    dbms_output.put_line('Error!');
END;
--output: No such customer!
```

## CTE
### Ref
- 1. [SQL CTE](https://www.databasestar.com/sql-cte-with/)

### Definition
- Common Table Expression, a query defined within another query.
- It's like a subquery, but can be assigned a name and reused many times.
- It's also like a 'one-shot' view.
- Also called a SQL WITH clause as it uses the WITH keyword.

### Example

#### Initialization data
- Initialize data:

``` sql
CREATE TABLE employee (
  emp_id NUMBER(5),
  first_name VARCHAR2(50),
  last_name VARCHAR2(50),
  dept_id NUMBER(5),
  manager_id NUMBER(5),
  office_id NUMBER(5)
);
 
CREATE TABLE department (
  dept_id NUMBER(5),
  dept_name VARCHAR2(50)
);
 
INSERT ALL
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (1, 'Sally', 'Jones', 3, 2, 5)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (2, 'Mark', 'Smith', 2, 4, 3)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (3, 'John', 'Andrews', 1, 4, 3)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (4, 'Michelle', 'Johnson', 2, NULL, 5)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (5, 'Brian', 'Grand', 2, 2, 3)
SELECT * FROM dual;
 
INSERT ALL
INTO department (dept_id, dept_name) VALUES (1, 'Sales')
INTO department (dept_id, dept_name) VALUES (2, 'IT')
INTO department (dept_id, dept_name) VALUES (3, 'Support')
SELECT * FROM dual;
```

This creates the following data:

|EMP_ID|FIRST_NAME|LAST_NAME|DEPT_ID|MANAGER_ID|OFFICE_ID|
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|1|Sally|Jones|3|2|5|
|2|Mark|Smith|2|4|3|
|3|John|Andrews|1|4|3|
|4|Michelle|Johnson|2||5|
|5|Brian|Grand|2|2|3|

***

#### Simple Example: Get employee name with department employe count

``` sql
WITH d_count AS
 (SELECT dept_id, COUNT(*) AS dept_count FROM employee GROUP BY dept_id)
SELECT e.first_name, e.last_name, d.dept_count
  FROM employee e
 INNER JOIN d_count d
    ON e.dept_id = d.dept_id;
```

#### Recursive CTE Example

``` sql
WITH cteEmp(emp_id,
first_name,
manager_id,
emplevel) AS
 (SELECT emp_id, first_name, manager_id, 1
    FROM employee
   WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.first_name, e.manager_id, r.emplevel + 1
    FROM employee e, cteEmp r
   WHERE e.manager_id = r.emp_id)
SELECT emp_id, first_name, manager_id, emplevel
  FROM cteEmp
 ORDER BY emplevel;
```

- This produces the following result:

|EMP_ID|FIRST_NAME|MANAGER_ID|EMPLEVEL|
|:-----:|:-----:|:-----:|:-----:|
|4|Michelle||1|
|2|Mark|4|2|
|3|John|4|2|
|1|Sally|2|3|
|5|Brian|2|3|

The above result is generated in the following process:
1. Get data from the initial query `where manager_id IS NULL`, which returns one row;
**Notice that a recursive CTE must have be `UNION` query connecting a initial qery and a recursive query.**
2. The recursive query `FROM employee e, cteEmp r WHERE e.manager_id = r.emp_id` associates the original table with data from the initial query, returning more data;
3. Repeats step 2, until no more data is yielded.

## Materialized View

### Ref
1. [Materialized Views in Oracle](https://oracle-base.com/articles/misc/materialized-views#:~:text=A%20materialized%20view%2C%20or%20snapshot,a%20local%20or%20remote%20table.)

### Concept
- A materialized view, or snapshot as they were previously known, is a table segment whose contents are **periodically refreshed based on a query**, either against a local or remote table.

### Syntax

``` sql
-- Normal
CREATE MATERIALIZED VIEW [VIEW_NAME]
BUILD [IMMEDIATE | DEFERRED]
REFRESH [FAST | COMPLETE | FORCE ]
ON [COMMIT | DEMAND ]
[START WITH ... NEXT ...]
[[ENABLE | DISABLE] QUERY REWRITE]
AS
SELECT ...;

-- Pre-Built
CREATE MATERIALIZED VIEW [VIEW_NAME]
ON PREBUILT TABLE
REFRESH [FAST | COMPLETE | FORCE ]
ON [COMMIT | DEMAND ]
[START WITH ... NEXT ...]
[[ENABLE | DISABLE] QUERY REWRITE]
AS
SELECT ...;
```

- Build options:
  - **IMMEDIATE**: The materialized view is populated immediately.
  - **DEFERRED**: The materialized view is populated on the first request refresh.

- Refresh types:
  - **FAST**: A fast refresh is attempted. If materialized view logs are not present against the source tables in advance, the creation fails.
  - **COMPLETE**: The table segment supporting the materialized view is truncated and repopulated completely using the associated query.
  - **FORCE**: A fast refresh is attempted. If one is not possible a complete refresh is performed.
  - **FAST VS COMPLETE**: FAST refresh only updates rows while COMPLETE refresh completely removes all data and inserts all data from the query.

- Trigger types:
  - **ON COMMIT**: The refresh is triggered by a comitted data change in one of the dependent tables.
  - **ON DEMAND**: The refresh is initiated by a manual request or a scheduled task.
  - Refreshing on commi is very intensive on a volative base table.

- Prebuilt:
  - **ON PREBUILT TABLE**: use existing table which must have same name as materialized view and same column structure as the query.
  - **QUERY REWRITE**: tells optimizer if materilized view should be considered for qery rewrite operations.

- Schedule:
  - The `START WITH ... NEXT ...` specifies a schedule.

### Refresh on demand
- A materialized view can be refreshed either manually or as part of a refresh group or via a schedule.

- Refresh manually:
``` sql
EXEC DMBS_MVIEW.refresh('mvt1');
-- For PL/SQL, use this:
begin
    DBMS_MVIEW.REFRESH('mvt1');
end;
```

- Create a refresh group:
``` sql
BEGIN
   DBMS_REFRESH.make(
     name                 => 'SCOTT.MINUTE_REFRESH',
     list                 => '',
     next_date            => SYSDATE,
     interval             => '/*1:Mins*/ SYSDATE + 1/(60*24)',
     implicit_destroy     => FALSE,
     lax                  => FALSE,
     job                  => 0,
     rollback_seg         => NULL,
     push_deferred_rpc    => TRUE,
     refresh_after_errors => TRUE,
     purge_option         => NULL,
     parallelism          => NULL,
     heap_size            => NULL);
END;
/

BEGIN
   DBMS_REFRESH.add(
     name => 'SCOTT.MINUTE_REFRESH',
     list => 'SCOTT.EMP_MV',
     lax  => TRUE);
END;
/
```

- Create a schedule(must be specified at the creation of the materialized view):
``` sql
create materialized view mvt1
build immediate
refresh force on demand
start with sysdate next sysdate + 1/24/60 -- Refresh every minute
as
select * from mvtt;
```
The materialized view `mvt1` will be refreshed every minute. An Oracle job is also created at the same time.
To find out the job id, use this query:

``` sql
select m.owner, m.mview_name, r.job
  from dba_refresh r
 inner join dba_refresh_children rc
    on rc.rowner = r.rowner
   and rc.rname = r.rname
 inner join dba_mviews m
    on m.owner = rc.owner
   and m.mview_name = rc.name
 where m.mview_name = 'MVT1'
```

### Examples
- Create a test table `mvtt`:

|ind|name|
|:-----:|:-----:|
|1|a|

- Create a materialized view:

``` sql
create materialized view mvt1
build immediate
refresh force on demand
as
select * from mvtt;
```

Now `mvt1` has the same data as `mvtt`. Insert a new row will not trigger an update in `mvtt` because its trigger type is `on demand`.

## Analytic Function/Window Function


- [Ref](https://oracle-base.com/articles/misc/analytic-functions)

### Key points

- Analytic functions calculate an aggregate value based on a group of rows and return multiple rows for each group.
- Analytic functions are just like GROUP BY aggregate functions, but do not reduce rows retured.
- Syntax:
  - `analytic_function([ arguments ]) OVER (analytic_clause)`
    - Anytic clause can be broken down as: `[ query_partition_clause ] [ order_by_clause [ windowing_clause ] ]`

### Example

``` sql
CREATE TABLE emp (
  empno    NUMBER(4) CONSTRAINT pk_emp PRIMARY KEY,
  ename    VARCHAR2(10),
  job      VARCHAR2(9),
  mgr      NUMBER(4),
  hiredate DATE,
  sal      NUMBER(7,2),
  comm     NUMBER(7,2),
  deptno   NUMBER(2)
);

INSERT INTO emp VALUES (7369,'SMITH','CLERK',7902,to_date('17-12-1980','dd-mm-yyyy'),800,NULL,20);
INSERT INTO emp VALUES (7499,'ALLEN','SALESMAN',7698,to_date('20-2-1981','dd-mm-yyyy'),1600,300,30);
INSERT INTO emp VALUES (7521,'WARD','SALESMAN',7698,to_date('22-2-1981','dd-mm-yyyy'),1250,500,30);
INSERT INTO emp VALUES (7566,'JONES','MANAGER',7839,to_date('2-4-1981','dd-mm-yyyy'),2975,NULL,20);
INSERT INTO emp VALUES (7654,'MARTIN','SALESMAN',7698,to_date('28-9-1981','dd-mm-yyyy'),1250,1400,30);
INSERT INTO emp VALUES (7698,'BLAKE','MANAGER',7839,to_date('1-5-1981','dd-mm-yyyy'),2850,NULL,30);
INSERT INTO emp VALUES (7782,'CLARK','MANAGER',7839,to_date('9-6-1981','dd-mm-yyyy'),2450,NULL,10);
INSERT INTO emp VALUES (7788,'SCOTT','ANALYST',7566,to_date('13-JUL-87','dd-mm-rr')-85,3000,NULL,20);
INSERT INTO emp VALUES (7839,'KING','PRESIDENT',NULL,to_date('17-11-1981','dd-mm-yyyy'),5000,NULL,10);
INSERT INTO emp VALUES (7844,'TURNER','SALESMAN',7698,to_date('8-9-1981','dd-mm-yyyy'),1500,0,30);
INSERT INTO emp VALUES (7876,'ADAMS','CLERK',7788,to_date('13-JUL-87', 'dd-mm-rr')-51,1100,NULL,20);
INSERT INTO emp VALUES (7900,'JAMES','CLERK',7698,to_date('3-12-1981','dd-mm-yyyy'),950,NULL,30);
INSERT INTO emp VALUES (7902,'FORD','ANALYST',7566,to_date('3-12-1981','dd-mm-yyyy'),3000,NULL,20);
INSERT INTO emp VALUES (7934,'MILLER','CLERK',7782,to_date('23-1-1982','dd-mm-yyyy'),1300,NULL,10);
COMMIT;
```

---

- Get average department salary for each row

``` sql
SELECT empno, deptno, sal,
       AVG(sal) OVER (PARTITION BY deptno) AS avg_dept_sal
FROM   emp;
```

---

- Get first value order by salary, put NULL values last in he sorted query results
  - Note:
    - In terms of sorting, SQL sorts `NULL` values to last in `ASC` order and first in `DESC`
    - `MAX` and `MIN` ignores `NULL` values

``` sql
SELECT empno,
       deptno,
       sal,
       FIRST_VALUE(sal IGNORE NULLS) OVER(PARTITION BY deptno order by sal asc nulls last) AS first_sal_in_dept
  FROM emp;
```

---

- Windowing clause: an extension of the `order_by_clause`, can only be used when `order_by_clause` is present.
- When there's `order_by_clause`, a default windowing clause is attached: `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`
  - The fact it is RANGE, not ROWS, means it includes all rows with the same value as the value in the current row, even if they are further down the result set. As a result, the window may extend beyond the current row, even though you may not think this is the case.

``` sql
RANGE BETWEEN start_point AND end_point
ROWS BETWEEN start_point AND end_point
GROUPS BETWEEN start_point AND end_point (21c onward)
```

``` sql
SELECT empno, deptno, sal, 
       AVG(sal) OVER (PARTITION BY deptno ORDER BY sal) AS avg_dept_sal_sofar
FROM   emp;

     EMPNO     DEPTNO        SAL AVG_DEPT_SAL_SOFAR
---------- ---------- ---------- ------------------
      7934         10       1300               1300
      7782         10       2450               1875
      7839         10       5000         2916.66667

      7369         20        800                800
      7876         20       1100                950
      7566         20       2975               1625
      7788         20       3000               2175
      7902         20       3000               2175

      7900         30        950                950
      7654         30       1250               1150
      7521         30       1250               1150
      7844         30       1500             1237.5
      7499         30       1600               1310
      7698         30       2850         1566.66667
```

``` sql
SELECT empno, deptno, sal, 
       AVG(sal) OVER (PARTITION BY deptno ORDER BY sal
                      RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS range_avg,
       AVG(sal) OVER (PARTITION BY deptno ORDER BY sal
                      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS rows_avg
FROM   emp;

     EMPNO     DEPTNO        SAL  RANGE_AVG   ROWS_AVG
---------- ---------- ---------- ---------- ----------
      7934         10       1300       1300       1300
      7782         10       2450       1875       1875
      7839         10       5000 2916.66667 2916.66667

      7369         20        800        800        800
      7876         20       1100        950        950
      7566         20       2975       1625       1625
      7788         20       3000       2175    1968.75
      7902         20       3000       2175       2175

      7900         30        950        950        950
      7654         30       1250       1150       1100
      7521         30       1250       1150       1150
      7844         30       1500     1237.5     1237.5
      7499         30       1600       1310       1310
      7698         30       2850 1566.66667 1566.66667
```

---

- `LAG`: Access the row at a given offset prior of the current row without using a self-join.
- [Ref](https://www.oracletutorial.com/oracle-analytic-functions/oracle-lag/)
- Syntax: 

``` sql
LAG(expression [, offset ] [, default ])
OVER (
	[ query_partition_clause ] 
	order_by_clause
)
```

``` sql
SELECT e.empno,
       e.deptno,
       e.sal,
       LAG(sal, 1) OVER(partition by deptno ORDER BY sal) sal_lower_closest
  FROM emp e
 order by deptno, sal


 EMPNO     DEPTNO     SAL        SAL_LOWER_CLOSEST
---------- ---------- ---------- ----------
      7934	10	1300.00	
      7782	10	2450.00	1300
      7839	10	5000.00	2450
      7369	20	800.00	
      7876	20	1100.00	800
      7566	20	2975.00	1100
      7788	20	3000.00	2975
      7902	20	3000.00	3000
      7900	30	950.00	
      7654	30	1250.00	950
      7521	30	1250.00	1250
      7844	30	1500.00	1250
      7499	30	1600.00	1500
      7698	30	2850.00	1600
```

---

- `SUM` also supports windowing:

``` sql
SELECT e.empno,
       e.deptno,
       e.sal,
       sum(sal) OVER(partition by deptno ORDER BY sal) dept_accum_sal
  FROM emp e
 order by deptno, sal
```

## Others

### Database link

``` sql
create public database link
  mylink
connect to
  remote_username
identified by
  mypassword
using 'tns_service_name'
```

``` sql
-- user和password都不需要引号，如果passwrd有特殊字符，那就用双引号""包起来
create public database link dbl_term connect to user1
identified by "password1" using '192.168.100.100/orcl'
```

Find all database links:
  - DBA_DB_LINKS - All DB links defined in the database
  - ALL_DB_LINKS - All DB links the current user has access to
  - USER_DB_LINKS - All DB links owned by current user

### INSERT MULTIPLE ROWS
- Use `INSERT ALL` to insert multiple rows:

``` sql
CREATE TABLE employee (
  emp_id NUMBER(5),
  first_name VARCHAR2(50),
  last_name VARCHAR2(50),
  dept_id NUMBER(5),
  manager_id NUMBER(5),
  office_id NUMBER(5)
);
 
INSERT ALL
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (1, 'Sally', 'Jones', 3, 2, 5)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (2, 'Mark', 'Smith', 2, 4, 3)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (3, 'John', 'Andrews', 1, 4, 3)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (4, 'Michelle', 'Johnson', 2, NULL, 5)
INTO employee (emp_id, first_name, last_name, dept_id, manager_id, office_id) VALUES (5, 'Brian', 'Grand', 2, 2, 3)
SELECT * FROM dual;
```

### MD5

``` sql
CREATE OR REPLACE FUNCTION MD5(

                               passwd IN VARCHAR2)

 RETURN VARCHAR2

 IS

  retval varchar2(32);

BEGIN

  retval := utl_raw.cast_to_raw(DBMS_OBFUSCATION_TOOLKIT.MD5(INPUT_STRING => passwd));

  RETURN retval;

END;
```

