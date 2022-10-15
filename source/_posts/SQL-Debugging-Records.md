---
title: SQL Debugging Records
date: 2022-09-30 16:26:11
cover: /images/debug.jpg
thumbnail: /images/debug.jpg
categories:
- tech
tags:
- tech
- sql
---

## ORA-01489 result of string concatenation is too long
Ref: [Stack Overflow ORA-01489](https://stackoverflow.com/questions/29776035/oracle-ora-01489-result-of-string-concatenation-is-too-long)

<!--more-->

## Update inserted row with trigger
Ref: [Stack Overflow](https://stackoverflow.com/questions/45313561/update-inserted-row-with-trigger)


## INSERT FAIL ON ORA-04091
1. [ORA-04091 table is mutating, trgger/function may not see it](http://www.dba-oracle.com/t_avoiding_mutating_table_error.htm)

``` sql
-- 1. create table
create table cdt (a number);

-- 2. create before insert trigger
CREATE OR REPLACE TRIGGER TRIG_CDT
  before insert on cdt
  for each row
declare
  cnt number;
begin
  select count(*)
    into cnt
    from cdt;
end TRIG_CDT;

-- 3. insert
insert into cdt(a)
select 1 from dual
```

and we got: 
```
ORA-04091: table CDT is mutating, trigger/function may not see it
ORA-06512: at "TRIG_CDT", line 4
ORA-04088: error during execution of trigger 'TRIG_CDT'
```

However, this works:
``` sql
insert into cdt(a) values(1);
```

### Explanation
- An insert trigger (both before and after) cannot read the related table.

Solution:
- **Don't use triggers**. While the object-oriented Oracle provides "methods" that are associated with tables, most savvy PL/SQL developers avoid triggers unless absolutely necessary.

- **Use autonomous transactions**. Autonomous transaction makes it independent from the table that calls the procedure.

``` sql
CREATE OR REPLACE TRIGGER TRIG_CDT
  before insert on cdt
  for each row
declare
  cnt number;
  pragma autonomous_transaction;
begin
  select count(*)
    into cnt
    from tmp_cmi;
end TRIG_CDT;

```