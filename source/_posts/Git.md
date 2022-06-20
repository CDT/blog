---
title: Git
date: 2022-06-18 08:57:57
tags: 
- git
- tech
---
![Git](/images/git.png)
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
**HEAD**: Current branch.

## How-tos
1. Undo
undo add: `git reset`
undo commit: `git reset --hard HEAD~1` (moves to one commit before and `--hard` resets staging and working changes)

2. Links existing directory with remote repo
- In existing directory, `git init .`
- `git remote add origin <remote repo url>`(`origin` is a conventional name for remote repo)
- `git push origin <local branch name>`

## FAQ