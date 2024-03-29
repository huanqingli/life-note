## GIT

### 工作区 -> 暂存区 -> 版本库 -> 远程仓库

[**git document**](https://git-scm.com/docs)  
[**pro git**](https://git-scm.com/book/zh/v2)  
[**cheat sheet**](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)

### 基本操作：

#### 基础配置：

- `git config --global`: 针对当前用户，全局生效的配置
- `git config`: 针对当前项目生效的配置，覆盖 global 的配置。
  常用配置项：  
  `core.pager`: 分页器，默认 less 可以设为 '' ，避免 diff 和 log 的时候进入分页器。  
  `user.name`: 用户名， `user.email`: 邮箱
  `alias`: 设置别名 alias.co checkout：此后可用 co 代替 checkout。

#### 创建/拷贝版本库：

- `git init` ： 终端进入一个目录后，该命令在此目录创建版本库。
- `git clone` ： 后接项目 url 和克隆到本地后的文件名。

#### 提交修改：

- `git add` ： 后面加文件名（带后缀），此命令将对该文件的修改添加到暂存区(或者将新文件列入监控范围）。  
  `git add .` 对全部文件进行 add 操作。（ \* 也可以）  
  可接参数：  
  `-v` 列出添加或修改的文件  
  `-p` 列出修改内容  
  `--all`（`-A`）直接把工作区扔给暂存区
- `git commit -m` ： 后面加本次提交的目的或修改的内容等（提交信息），注意放在“”（双引号）之内，此命令将暂存区内全部内容提交到版本库。每一次运行 commit 提交操作，都是对你的项目作一次快照，以后可以回到这个状态，或者进行比较。  
  可接参数  
  `-v`: 显示 diff 信息。  
  `-a`: 跳过暂存步骤，把所有被监控文件的修改提交到版本库。相当于 add commit 两个命令一起（但不会添加新创建的文件）。  
  `--amend`:覆盖（废弃）上次提交。（上次提交说明写错了或者有文件遗漏了）用于修改提交历史 带 --no-edit 参数后，不改变提交信息
- `git stash`: 不想提交又想切换分支，先储藏。
- `git stash save -a <msg>`: 储藏还给起个名。
- `git stash list`: 查看储藏列表。
- `git stash show` : 查看本次暂存内容，`-u` 参数查看具体内容。默认 `stash@{0}` 可指定其他。
- `git stash apply`: 恢复储藏的内容。默认 `stash@{0}` 可指定其他。 `pop` 恢复后会删除恢复的 stash。
- `git stash drop`: 清除 stash。默认 `stash@{0}` 可指定其他。
- `git stash clear`: 清除所有 stash。

#### 查询状态/差异：

- `git status`： 版本库当前的状态。
  可接参数：
  `-s` :输出简单版本。
  '-v' :相当于输出 git diff --cached
  '-v -v' :相当于输出 git diff
- `git diff`： 当前文件们（工作区）与暂存区的文件们有何差异。也就是修改之后还没有暂存起来的变化内容。  
  可选参数：  
  `--cache`:已提交到暂存取的文件与版本库的文件们有何差异。  
  `HEAD`：工作区与版本库之间的差异。  
  `branchNameA`:与 A 分支比较（默认为当前分支）。  
  `branchNameA branchNameB`：比较 A，B 两个分支的差异。
  `commitA commitB`: 比较两次提交间的差异。
- `git difftool`：用外部工具查看差异。
- `git shortlog`: 查看每个人的提交情况，-s 只显示提交数，-n 按提交数排序。
- `git reflog`: 查看**所有提交历史**，包括被覆盖的。
- `git log`: 查看提交历史。 `--all` 可以查看被 reset 覆盖的提交历史。  
  可选参数：  
  `-[n]`: 查看最近 n 次提交。  
  `--stat`: 每次提交修改的文件和行数。  
  `--graph`: 形象的显示分支。  
  `--oneline`: 每次提交放在一行显示。  
  `--author`: 指定作者的提交。  
  `--grep`: 提交说明包含某些关键字的提交。  
  `-S`: 添加或移除了某个关键字的提交。  
  `--decorate`: 查看指针所在。  
  `-p`: 详情。
- `git show`: 展示各种东西(可以接标签名，分支名，版本号, 某次提交)的详情。默认当前分支最后一次提交的内容。
- `git blame <filename>`: 查看文件每一行最后一次修改都是谁。

#### 撤销修改/版本回退

- `git reset`：后面接版本号，将 HEAD 快照和暂存区指向该版本(默认)。后面可接文件名，恢复该文件在某版本的状态。后面可接分支名，指定当前分支被某分支覆盖。**不影响工作区。**  
  可用作 merge 后，覆盖提交历史。(跳回 A 点保留工作区，再提交，覆盖 A 点到当前点之间的提交记录)
  可选参数：  
  `--soft`: 还不会影响暂存取。  
  `HEAD`: 后面可加文件名（带后缀），将缓存区内的该文件恢复到 HEAD 指向的快照，工作区不变。不加文件名对所有文件生效。  
  `--hard`: 工作区内的文件也会恢复到指定快照 _不安全_  
  HEAD 指向某提交后，该提交之后的提交会消失。  
  因 reset 而消失的提交可以通过 `git log --all` 或 `git reflog` 查到
  版本回退顺序：  
  移动 HEAD 分支的指向  （若指定了  --soft，则到此停止）  
  使索引（暂存区）看起来像 HEAD （若未指定  --hard，则到此停止）  
  使工作目录看起来像索引
- `git checkout`：后面加文件名（带后缀），撤销工作区内对该文件的修改（工作区内删除的文件也可此命令恢复），暂存区有内容就回到暂存区的状态，否则就回到版本库内的状态。_不安全_
- `git revert <commit-id>`: 回到某个 commit 的状态（会在当前提交新增一个提交）

- `git merge --abort | git reset --merge`: 合并有冲突时放弃本次合并

#### 删除/重命名文件

- `git rm`：后面加文件名（带后缀），此命令将对该文件的删除操作添加到暂存区。之后 commit 操作和提交修改中的 commit 操作相同。此命令删除版本库文件还会删除工作区文件。（工作区直接删除文件，也要再移除监控）
- `git rm --cached`：后面加文件名（带后缀），此命令将文件移除版本库并取消监控，不删除工作区文件。
- `git rm $(git ls-files -d)`: 手动从工作区删除后，用该命令清除所有已删除文件的监控。
- `git mv file_a file_b`: 把文件 a 重命名为文件 b。(该命令还可以移动文件到指定文件夹)  
  相当于文件系统中重命名后运行：$ git rm file_a $ git add file_b

#### 标签操作

**标签有点类似于分支的感觉**

- `git tag`: 列出已有标签。使用 `git show [tagName]` 查看指定标签详细信息。
- `git tag [tagName]`: 给当前版本打个标签，后边可接版本号，给指定版本打。默认当前分支最后一次提交的版本。 `-d` 删除该标签。
- `git tag -a [tagName] -m [message]`: 打附注标签 message 为附注，同样可指定版本。
- `git push origin [tagname]`: 推送指定标签到远端。--tags 推送全部标签。
- `git push origin :refs/tags/ [tagName]`: 删除一个远端标签。删除标签要先删本地再删远端。

#### 分支操作

- `git branch`: 查看分支。  
  可选参数：  
  `-v`: 查看每个分支的最后一次提交  
  `-d`: 删除分支(合并后没用的分支删除之)后加 -r 删除本地的远程分支  
  `--no-merged`: 查看已经合并的当前分支的分支  
  `--merged`: 查看未合并到当前分支的分支  
  `－r`: 查看远程分支  
  `-vv`: 查看本地分支及其跟踪的远程分支  
  `-u`: 后面接[remotename]/[branch]，跟踪该远程分支，后面可接本地分支名，默认当前分支
- `git branch [branchNameA]`: 创建分支 A。后面可接该分支起点（版本号，标签，分支名，远程分支则自动跟踪）。默认当前分支的最后一次提交。
- `git checkout [branchNameA]`:指针(HEAD)切换到分支 A，工作区也会切换到该分支最后一次提交的样子。  
  可选参数：  
  `-b`： 新建分支并切换。和新建分支特性相同。  
  `git checkout --orphan [new_start]`:新建一个从零开始没有提交历史的分支。
- `git merge [branchNameA]`：将分支 A 合并到当前分支。(只要当前分支是 A 提交历史上的一个点就可以了。)
- `git git-cherry-pick`: 后接版本号（可接多个），在当前分支重演某（几）次提交。（将某次提交的修改内容拉过来）
- `git rebase`: 称为变基，后边接要拉过来的分支，把两条分支变一条。(会把本分支的 commits 顶到最顶端),遇到冲突会停顿，解决后 `git rebase --continue` 继续，直到合并完成。  
  加 `-i` 和要回到的提交历史节点，成为修改提交历史神器（修改该节点后的提交历史）。
  **个人认为最适合用在本地分支与其跟踪的远程分支产生冲突的时候，本来就是两个分支应该用 merge 保留分支历史,我认为唯一合理的变基操作就是本地分支 rebase 自己跟踪的远程分支**

#### 远程分支

**远程分支格式为[remotename]/[branch]，相当于抓取远程 remotename 仓库的 branch 分支的快照到本地**

- `git checkout -b [branch] [remotename]/[branch]`: 从服务器上 fetch 下来的远程分支如果没有对应本地分支，可以这样创建并建立跟踪关系。(branch 也一样)
- `git fetch origin`：从 origin 仓库更新全部内容。不会自动合并到本地分支。后面可接远程仓库的分支名（可选，更新指定远程分支）后面接 `--prune`(`-p`)时，删除其追踪的远程分支已经被删除的本地分支。
  **远程分支也是分支的一种，相当于远程仓库的分支在本地的快照，fetch 远程仓库后更新本地远程分支，之后再用其他本地分支 merge 该分支**  
  `git fetch --all`  
  `git reset --hard origin/master`  
  用来放弃本地修改，更新本地目录到远程分支。
- `git pull origin`：从本地当前分支跟踪的 origin 仓库上的分支更新并合并到当前分支，只有一个远程仓库可省略。相当于 fetch 后 当前分支 merge 对应的远程分支，_不推荐_。指定分支拉取： `git pull origin <远程分支名>:<本地分支名>`
- `git push origin <本地分支名>:<远程分支名>`：如果本地分支与远程分支同名，可只写一个，如果计划将当前所在本地分支**推送**到与其有追踪关系的远程仓库的分支，可省略分支名，如果只有一个主机有追踪关系，可省略主机名。远程无指定分支则**创建**(创建新远程分支时，主机名分支名不可省,且不会自动建立跟踪关系 加 **--set-upstream** 后会建立跟踪关系)。
- `git push origin --delete [branch]`：从 origin 仓库**删除** branch 分支，还会删除本地的远程分支。(`--force` 会不解决冲突，强制覆盖)
- `git remote update origin`:在本地创建远程分支的追踪分支。
- `git remote prune origin`：把已经无效的追踪分支删掉，加`--dry-run`先查看要删的分支先不删。
- `git remote show origin`: 查看远程分支与本地分支之间的关系。

上面 origin 都可以是其他远程仓库名

#### 远程仓库

- `git remote`: 列出远程仓库。
  可选参数:  
  `-v`: 显示远程仓库 url。
- `git remote add [shortname] [url]`: 添加远程仓库，并命名。
- `git remote rename [nameA] [nameB]`: 把远程仓库 A 命名为 B。
- `git remote rm`: 后接远程仓库名，仅断开连接。
- `git remote show`: 后接远程仓库名，查看详情(分支及本地追踪状态等)。
- `git remote prune origin` : 清理远程已经被删掉，本地还有记录的分支
- `git remote set-url origin [url]`: 切换远程仓库地址。可用于 https 改 ssh 或相反。

#### 查找 BUG

流程如下:

- `git bisect start`: 启动查找。
- `git bisect bad`: 说明当前状态是有 bug 的。
- `git bisect good [good_commit]`: 声明一个没有该 bug 的版本。  
  此时 git 会检出中间的一个版本，`git bisect bad`来标记该版本有 bug， `git bisect good`来标记该版本正常。重复该步骤，知道找到某版本最先引入该 bug ，返回版本号和相关信息。
- `git bisect reset`: 回到最开始的位置。

#### 代理设置

- 设置代理: git config --global http.proxy 10.167.32.133:8080
- 取消代理: git config --system (或 --global 或 --local) --unset http.proxy

#### 小 tips

- 查看项目中每个人的贡献：

```shell
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

- 排除 public 文件夹：

```shell
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | grep -v 'public' | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

- 放弃本地修改，回到远程仓库状态：`git fetch --all && git reset --hard origin/master`
- 删除合并到 master 的分支：`git branch --merged master | grep -v '^\*\| master' | xargs -n 1 git branch -d`
- 清除 gitignore 文件中记录的文件： `git clean -X -f`
- git 无法保留硬链接，链接在一起的文件将被视为独立文件

- https 形式的 clone 转换成 ssh 的`git config --global --add url."git@code.byted.org:".insteadOf "https://code.byted.org/"`

- [疑难杂症](https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md)
- [rebase vs merge](https://www.fossil-scm.org/fossil/doc/trunk/www/rebaseharm.md)

- git 不区分大小写的问题：  
  修改大小写用类似 `git mv readme.md README.md` 命令  
  如果远程分支已经同时存在大小写文件，拉到本地用类似 `git rm --cached src/components/Header -r` 命令然后推到远程
