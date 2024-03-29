---
title: Git
date: 2022-06-18 08:57:57
cover: /images/git.svg
thumbnail: /images/git.svg
categories:
- tech
tags: 
- git
- tech
---
## What is Git ?
A **distributed** version control system.

## Why Git over SVN ?
1. Github uses git. Most modern IT companies use git.
2. Git is distributed, SVN is centralized. Git enables you to work and source control offline with your own repo.
3. Most operations are done locally, so it's fast.

## How Git works
Git consists of 4 areas:
1. Working Directory: Current working directory.
2. Staging Area: Tracks and saves changes ready to commit.
3. Local Repo: Repository on the disk.
4. Remote Repo: Repository on the server.

![Git areas](/images/git_areas.png)

## Concepts
- **HEAD**: Current branch.


## `.gitignore` file
### Refs:
1. [Git ignore patterns](https://gist.github.com/jstnlvns/ebaa046fae16543cc9efc7f24bcd0e31)
2. [gitignore](https://git-scm.com/docs/gitignore)

### Patterns
|Pattern|Example matches|Explanation|
|:-----:|:-----:|:-----|
|logs|logs<br />logs/debug.log<br />logs/latest/foo.bar<br />build/logs<br />build/logs/debug.log|If you don't append a slash, the pattern will match both files and the contents of directories with that name. In the example matches on the left, both directories and files named logs are ignored|
|logs/|logs/debug.log<br />logs/latest/foo.bar<br />build/logs/foo.bar<br />build/logs/latest/debug.log|Appending a slash indicates the pattern is a directory. The entire contents of any directory in the repository matching that name – including all of its files and subdirectories – will be ignored|
|logs/*|logs/test.log(a file)<br />logs/test(a directory)<br /><i>but not</i><br />logs/bar/hello.c(a file)|the asterisk in the pattern does not match "bar/hello.c" which has a slash in it.|
|logs/<br />!logs/important.log|logs/debug.log<br />logs/important.log|Wait a minute! Shouldn't logs/important.log be negated in the example on the left? Nope! Due to a performance-related quirk in Git, you can not negate a file that is ignored due to a pattern matching a directory|
|logs/**/debug.log|logs/debug.log<br />logs/monday/debug.log<br />logs/monday/pm/debug.log|A double asterisk matches zero or more directories.|
|logs/*day/debug.log|logs/monday/debug.log<br />logs/tuesday/debug.log<br /><i>but not</i><br />logs/latest/debug.log|Wildcards can be used in directory names as well.|
|logs/debug.log|logs/debug.log<br /><i>but not</i>debug.log<br />build/logs/debug.log|Patterns specifying a file in a particular directory are relative to the repository root. (You can prepend a slash if you like, but it doesn't do anything special.)|

## FAQ
### What is `HEAD` in git ?
The HEAD in Git is **the pointer to the current branch reference**, which is in turn a pointer to the last commit you made or the last commit that was checked out into your working directory.

### Git reset
[Ref](https://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard)

Suppose we have a branch master with A/B/C commits:
 `- A - B - C (master)`
- `reset --soft B`: Moves pointer to B; changes staged; run `commit` and will get a new commit as C
- `reset --mixed B`: Default. moves pointer to B; changes remain but unstaged; run `add` and `commit` and will get a new commit as C
- `reset --hard B`: Moves pointer to B; changes **permanently reset**; always run `status` to make sure changes can be discarded

### Undo a commit
undo add: `git reset`
undo commit: `git reset --hard HEAD~1` (moves to one commit before and `--hard` resets staging and working changes)

### Links existing directory with remote repo
- In existing directory, `git init .`
- `git remote add origin <remote repo url>`(`origin` is a conventional name for remote repo)
- `git push origin <local branch name>`

### What is a leading slash in `.gitignore` ?
The leading slash anchors the match to the root.

### How can I ignore everything but one file in a directory ?
[Original Answer](https://stackoverflow.com/questions/68945326/how-to-use-gitignore-to-ignore-everything-in-a-directory-except-one-file)
``` bat
git add -f Website\bin\Settings.json
```

### What is fast-forward ?
![Fast forward](/images/fast-forward.png)

### Git pull and git fetch
- Ref: [Fetch vs pull](https://backlog.com/git-tutorial/tw/stepup/stepup3_2.html)
- **Git pull**: Incorporates changes from a remote repository into current branch and then fast-forward/merge current branch.
- **Git fetch**: If don't want to fast-forward/merge, use this.
- pull = fetch + merge

### Branches
- `git branch`
Show all local branches, with current branch marked with an asterisk.
```
* master
Pages
```

- `git branch -r`
Show all remote branches.
```
  origin/HEAD -> origin/master  // Currently checked out branch, which is origin/master
  origin/master
```

- `git branch -a`
List all branches.

- `git branch newb`
Create  new branch named newb.

- `git checkout newb`
Switch to branch newb.

- `git checkout -b newb`
Shorthand for `git branch newb` and `git checkout newb`.

- `git branch -d newb`
Delete local branch newb.