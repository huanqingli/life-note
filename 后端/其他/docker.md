## Docker
#### 基本概念
- 镜像: 相当于是一个 root 文件系统。  
镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。比如，删除前一层文件的操作，实际不是真的删除前一层的文件，而是仅在当前层标记为该文件已删除。  
- 容器: 镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样。  
镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的命名空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为容器存储层。容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主(或网络存储)发生读写，其性能和稳定性更高。  
- 仓库: 存放镜像的仓库，官方的是 [Docker Hub](https://hub.docker.com/explore/)。

#### 基本操作
- 登录：`docker login`
- 查看详细信息：`docker info`
- docker hub 无法链接，看 [国内源](http://www.docker-cn.com/registry-mirror)
#### 操作镜像
- 获取镜像:  
`docker pull [选项] [Docker Registry地址]<仓库名>:<标签>`  
一般 `docker pull` 后面接镜像名即可从官方下载最新稳定版本该镜像。  
如 `docker pull nginx`
`docker pull --help`查看选项  
官方仓库查看镜像 [Docker Hub](https://hub.docker.com/explore/)  
`docker search <镜像>` 命令来查找官方仓库中的镜像。  
- 列出镜像:  
`docker images`
- 删除镜像:  
`docker rmi [选项] <镜像1> [<镜像2> ...]` 同 `docker image rm`  
<镜像> 可以是 镜像短 ID、镜像长 ID、镜像名 或者 镜像摘要
- 删除悬虚镜像:  
`docker rmi $(docker images -q -f dangling=true)`  
没有仓库名，标签名的镜像，说明官方停止维护，可以删除了。  
- 定制镜像:
使用 [Dockerfile](#Dockerfile)  
进入要订制镜像的目录运行 `docker build -t <镜像名> .`  
- 给镜像打标签:
`docker tag image username/repository:tag`    
如: `docker tag friendlyhello john/get-started:part1`  
- 发布到 Docker Hub:
`docker push username/repository:tag`    

#### 操作容器
- 启动容器:  
所需要的命令主要为 `docker run`。  
可以利用 `docker start` 命令，直接将一个已经终止的容器启动运行。
后面接启动命令会覆盖 dockerfile 的 CMD  
使用 `-d` 参数后台运行容器。  
`-p 4000:80` 把本机的 4000 端口映射到容器的 80 端口  
可以通过 `docker ps` 命令来查看容器信息。  
可以通过 `docker logs` 命令获取容器的输出信息。  
- 进入运行的容器：`docker exec -it <docker_name> /bin/bash`
- 终止容器:  
`docker stop` 来终止一个运行中的容器。接容器 id  
终止状态的容器可以用 `docker ps -a` 命令看到。  
`docker restart` 命令会将一个运行态的容器终止，然后再重新启动它。 
- 查看启动容器：`docker container ls`  --all 查看全部容器 和 `docker ps` -a 一样
- 查看容器信息：`docker inspect`
- 删除容器:  
`docker rm` 来删除一个处于终止状态的容器。同 `docker container rm`  
`docker rm $(docker ps -a -q)` 删除所有终止状态的容器。  

#### 服务
概念: 服务就是在生产环境下跑容器  
一个服务对应多个镜像  
使用 docker-compose.yml 定义在生产环境如何使用这些镜像    
可以使用一个镜像跑多个容器。  
docker-compose.yml示例:
```yaml
version: "3"  # 版本 3 支持多种特性
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repository:tag
    deploy:
      replicas: 5 # 启动多少容器
      resources:
        limits:
          cpus: "0.1"  # 每个容器最多占用 10% cpu
          memory: 50M  # 每个容器最多占用 50M RAM
      restart_policy:
        condition: on-failure  # 自动重启
    ports:
      - "80:80" # 主机端口 : Docker 端口
    networks:
      - webnet # 负载均衡，5个容器可以共享80端口
networks:
  webnet:
```
启动服务要在建立集群之后  
每个节点可以部署多个服务  
启动，停止，查看服务器状态的命令见[集群](#集群)
- 查看service id：`docker service ls`

#### 集群
概念: 一组机器运行 Docker  
建立集群后，照常运行 Docker 命令，但命令都在集群主节点(swarm manager)执行  
集群中的机器可以是物理的或者虚拟的，加入集群后作为一个节点(workers)  
通过 docker-compose.yml 指导主节点使用怎样的部署策略  

- 建立集群:  
以下命令都在代表 主/从 节点的 主/虚 机中执行  
`docker swarm init`  
成功建立集群后，会提示其他机器加入该集群的命令  
- 查看集群中的机器:
`docker node ls`  
- 拷贝 yml 文件到主节点根目录:  
`docker-machine scp docker-compose.yml <节点名>:~`  
- 在集群中部署:  
`docker stack deploy -c docker-compose.yml <服务名>`  
- 查看运行中的服务:  
`docker stack ps <服务名>`  
- 停止集群:  
`docker stack rm <服务名>`  
#### Dockerfile
