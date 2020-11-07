# Kubernetes

Container Orchestration and management system

Imperative deployment: Follow exactly the steps to arrive at the conatiner setup (ex: run these containers on this machine)
Declarative Deployment: Our setup should look like this, make it happen (Master chooses where to run the container)

- Managed Solution and self-hosted (configured?):
  - The k8s master node is managed by the (cloud) provider, it is like a blackbox and you can't `kcg nodes` it. If self managed, you will be able to see the master and even deploy pods to it (It has taints on it to prevent that from happening but good to understand concept)

## Kubernetes Components

- The Master + Worker form the cluster
- The Nodes can be VMs or baremetal machines
- When we deploy K8s/setup/spin up a k8s cluster, following things happen (more like follwing processes get deployed):
  - The **Control Plane**:
    - Scheduling, Service Discovery, Event Handling
    - Deployed to the Master Node (Maybe replicated, each component of the control plane should be replicated for HA and resiliency)
    - Components:
      - _Kube Controller Manager (the brain, heavy lifter)_
        - Runs the Controller processes
        - Logically split into following but is compiled into a single binary (bin; Very cool, mind blowing) and run as a single process
          - *Node Controller*: Noticing and responding when a node goes down (receives the heartbeats from the nodes to keep track)
          - *ReplicationController*: Maintain correct set of pods (replaced by ReplicaSet). Talks to etcd via the apiServer to the deed
          - *Endpoints Controller*: Joins services and pods (services facilitate pod to pod communication)
          - *Service Account and Token Controller*: Manages defaukts accounts and api access tokens

      - _Kube API Server (the middleman; FrontEnd for k8s processes)_
        - Front-End of the k8s control plane
        - All chatter between all components happens through the API Server that sits on the master (kubectl talks to the API Server!)
        - Main implementation of the kube-api

      - _etcd cluster (cluster state management)_
        - Cluster state config, service discovery (coreDNS running in kube-system ns on the master, part of the control plane; Single process; Three pods managed by a reelicaSet)
        - light-weight distributed key-value store, consensus through *raft* distributed consensus algorithm

      - _Kube Scheduler (Manager guy)_: [The last link](#Sources)

      - _Cloud Controller Manager (Cloud Provider Liason)_
        - Lets us link to a cloud provider
        - If running k8s locally, on prem, no cloud controller manager
        - Logically split into following but is compiled into a single binary (bin; Very cool, mind blowing) and run as a single process
          - *Node Controller*: Check cloud provider if a node has been deleted after it stops responding i.e. no heartbeat, timeout
          - *Route Controller*: Sets up routes in the underlying cloud infra
          - *Service Controller*: CRUD for cloud provider LoadBalancer

  - K8s node components (Workers)
    - Run on all nodes
    - Responsible for pod maintainance, provide runtime environment
    - Components:
      - _Kubelet_
        - Talks to the container runtime env
        - Communicates with the control plane via the kubeApiServer, gets pod definitions, resource constraints etc. and passes it to the Kube Scheduler
        - The Kubelet has a client-server type architecture (gRPC client and server) and communicates with the _Container Runtime_ via the _Container Runtime Interface (CRI)_
          - CRI:
            - *ImageService*: Image related operations
            - *RuntimeService*: Pod and container related operations
        - _cAdvisor_ is a sub component (container advisor) retrieves metrics from pods and exposes it to the Metrics server via the kubelet API

      - _KubeProxy_
        - Implements the K8s service concept
        - Manages networking for pods from netwroking sessions inside/outside the cluster
        - Uses the OS packet filtering layer , if available, or forwards traffic itself
        - Updates and maintains all networking rules on nodes and hides Pod networking details and complexity
        - Deployed as a pod in multi-node clusters and is a DaemonSet

      - _Container Runtime_: Docker, rkt rtc.

  - All chatter between all components happens through the API Server that sits on the master (kubectl talks to the API Server!)
  - K8s solves networking problems (among many others) when moving from monolith to microservices
    - Container to Container communication: Solved by namespaces
    - Pod to Pod comm within same node and between nodes
    - Pod to Service comm: solved by kind: Service (k8s sees Pods as VMs running in network with IPs assigned to them, IPs are dynamic!)
    - External to Service comm: Via kind: Service, type: LoadBalancer or via Ingresses (logical separation of routing rules)
      - Ingresses configure a Level 7 Load Balancer (Application Layer) and provides TLS, Name-based virtual Routing, Load Balancing and custom rules
      - Ingress Contoller: an app that looks for changes to the Ingress Resource configuration (just like any other contollerm talks to etcd via the API server on the Control plane)

## kubectl Imperative commands

- `--dry-run:` By default as soon as the command is run, the resource will be created. If you simply want to test your command, use the `--dry-run=client` option. This will not create the resource, instead, tell you whether the resource can be created and if your command is right.

- `-o yaml`: This will output the resource definition in YAML format on the screen.

- Use the above two in combination to generate a resource definition file quickly, that you can then modify and create resources as required, instead of creating the files from scratch.

- _POD_
  - Create an NGINX Pod: `kubectl run nginx --image=nginx`: This actually creates a deployment (But I was able to delete the pod; Scrutinize)
  - Generate POD Manifest YAML file (-o yaml). Don't create it(--dry-run): `kubectl run nginx --image=nginx  --dry-run=client -o yaml`

- Deployment
  - Create a deployment: `kubectl create deployment --image=nginx nginx`
  - Generate Deployment YAML file (-o yaml). Don't create it(--dry-run): `kubectl create deployment --image=nginx nginx --dry-run=client -o yaml`

- *IMPORTANT:*
  - Save it to a file - (If you need to modify or add some other details): `kubectl create deployment --image=nginx nginx --dry-run=client -o yaml > nginx-deployment.yaml`
  - You can then update the YAML file with the replicas or any other field before creating the deployment.

- *Service*
  - Create a Service named redis-service of type ClusterIP to expose pod redis on port 6379: `kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml` _(This will automatically use the pod's labels as selectors)_
  - `kubectl expose deployment <deploymentName> --name=<nameOfService> --target-port=<port> --type=<serviceType> --port=<port> --dry-run=client -o yaml > svc.yaml`: to create service imperatively for a deployment ()
Or
  - `kubectl create service clusterip redis --tcp=6379:6379 --dry-run=client -o yaml`  _(This will not use the pods labels as selectors, instead it will assume selectors as app=redis. You cannot pass in selectors as an option. So it does not work very well if your pod has a different label set. So generate the file and modify the selectors before creating the service)_

  - Create a Service named nginx of type NodePort to expose pod nginx's port 80 on port 30080 on the nodes: `kubectl expose pod nginx --port=80 --name nginx-service --type=NodePort --dry-run=client -o yaml` _(This will automatically use the pod's labels as selectors, but you cannot specify the node port. You have to generate a definition file and then add the node port in manually before creating the service with the pod.)_
Or
  `kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml` _(This will not use the pods labels as selectors)_

  - Both the above commands have their own challenges. While one of it cannot accept a selector the other cannot accept a node port. I would recommend going with the `kubectl expose` command. If you need to specify a node port, generate a definition file using the same command and manually input the nodeport before creating the service.

- *ConfigMap*
  - from literal: `kc create cm <configMapName> --from-literal=APP_COLOUR=pink`
  - from env file: `kc create cm <configMapName> --from-file=<pathToEnvFile>` or `kc create cm <configMapName> --from-file=<specialKey>=<pathToEnvFile>`

## Kubernetes Objects

### Pods

- a group of interdependent containers (one or more) working together (apiVersion: v1)
- share the same networking and filesystem space
- Pod has a a few states in its lifecycle:
  - Pending: Scheduler figuring out where to put the pod
  - ContainerCreating
  - Initializing
  - Ready
- A service that routes requests to pods will start doing so the moment it is in the `Ready` state
  - The app running in the container in the pod may not be ready, Readiness and Liveness probes help with that

### ReplicaSet

maintains a stable set of replica pods to ensure high availability (apiVersion: v1)

### Service

- a set of Pods working together (defined by label selector) (apiVersion: v1)
- used when some amount of networking is needed in the cluster
- Manages the assignment of IP addrs to the pod, so if a pod gets restarted, user doesnr't have to worry about knowing (finding) the IP addrs
- *_Pods use Services to talk to each other and service get registered as local dns names. This is how the label-selector mechanism is used._*
- services in a ns can reach each other by their names (set in metadata.name; Should always be a fully qualified DNS name) and via `<muServiceName>.<ns>.svc.cluster.local` when trying to reach a diff ns
  - ex: mysql.connect("db-service.dev.svc.cluster.local")
    - `cluster.local` is the default doamin name in the cluster
    - When a service is added to k8s cluster is created the DNS entry is automatically added

#### SubTypes

##### ClusterIP

- Exposes a set of pods to other objects in the cluster
- Default
- A service has to matche all the `selectors` to the `lables` of the pod that it is sitting in front of
  - Once matched, it registers all the replicas as Endpoints (Endpoints object have the same name as the service)
  - Endpoint object keeps a record of the member pods the service will be forwarding requests to
  - This object gets updated whenevr a pod dies and a new pod is spun up
- If the Service is going to be forwarding requests to pods with multiple containers, the ports need to be **named**
- Only accessible within the cluster

##### Headless

- If a client wants to talk to a particular Pod (as in the case of Stateful appilcations or services using gRPC) or pods want to talk to each otehr directly without involving the service (stateful pods replcas are not the same, in order for them to be syncing data, as in the case of db pods, them talking to each other directly is important)
- How can a client know the IP addresses of the pods?
  - One way is talking to the Kube API server directly (would need the serviceAccount Token for this)
    - This will make the app too dependent on the K8s API
  - Other way is to do DNS lookup (don't know how to yet), allowed by k8s
    - When a client does this, a single IP address is returned which is the ClsuterIP of the service BUT when creating a service, if we set `spec.clusterIP=None` (This is how you declare headless service), the pod(s)'s IP is returned (What if there are multiple pods?)

```YAML
apiVersion: v1
kind: Service
metadata:
  name: mongodb-headless-service
spec:
  # Headless!!
  clusterIP: None
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
```

- When Stateful apps are deployed (StatefulSet), there are two services that exist along side each other (saw this in the elasticesearch-master charts!), ClusterIP and Headless
  - The ClusterIP service takes care of forwarding requests, LoadBalancing against pods etc. while the Headless service facilitates pod to pod communication for data synchronization

##### NodePort

- Exposes container to the outside world (good for dev purposes)
- Creates a communication layer between the outside world and the container running inside the pod (req comes to kube-proxy and then to Service NodePort)
- Facilatates communication with a Pod on a static port on the worker node (30000 - 32767; port values outside of this range will not be accepted)
- When a NodePort service is creaetd a clusterIP service is automatically created which will route rwquets to the NodePort service
- Good for dev; BAD for Prod

##### LoadBalancer

- Legacy way of getting traffic into our cluster
- LoadBalancer will give access to only one pod
- Ingress is the new kid on the block
- Is an extension of the NodePort service type

##### Ingress

- Exposes a set of services to the outside world
- Different types of Ingresses
- Controllers in the world of k8s work to get your cluster to a desired state (config files) to a from the current state (Dig a bit deeper here, don't trust it)
- IngressConfig --> kubectl --> kubeapiserver --> Ingress Controller (Maybe the kubeapiserver talks to KubeControllerManager which talk to the Ingress Controller which creates and manages the Ingress Resource; Check Carson's vid) --> Som,ething that accepts incoming traffic to the cluster
- This hacktime is using ingress-nginx, that needs some sepcial stuff to be setup
  - `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml`: Some sort of config file that sets up the default-backend-pod etc.
  - `minikube addons enable ingress`: enables ingress addon in minikube

##### Volume

persistent storage to save data between restarts (apiVersion: v1)

##### Namespace

- offers resource allocation/management/isolation by namespace (apiVersion: v1)
- *default* ns is created by k8s on cluster init
- *kube-system*: Kube internal services, DNS, networking etc.
- *kube-public*: Resources that should made available to all users are deployed here
- services in a ns can reach each other by their names (set in metadata.name; Should always be a fully qualified DNS name) and via `<muServiceName>.<ns>.svc.cluster.local` when trying to reach a diff ns
  - ex: mysql.connect("db-service.dev.svc.cluster.local")
    - `cluster.local` is the default doamin name in the cluster
    - When a service is added to k8s cluster is created the DNS entry is automatically added
- To limit resources in a ns, use `kind: ResourceQuota`
  - ex:

```YAML
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: 5Gi
    limits.cpu: "10"
    limits.memory: 10Gi
```

##### ConfigMap

- used to store env vars needed by pods; sent to the exact pod that needs the vars. in memory;
- if pod is removed, memory is cleared. Original stored in etcd, encrypted (apiVersion: v1)

##### Secret

- same as ConfigMaps (apiVersion: v1)
- Securely stores a piece of information in the cluster like apiKeys, passwords etc.

##### StatefulSet

- A Controller. Used for statefull applications, like databases, where instance ordering matters (for dbs with primary and secondary instances) (apiVersion: apps/v1)
- Also manages scaling of pods like a ReplicaSet and Deployments
- The pods created will be in a particular order, deletion of which will nbe in the reveerse order (default; can be parallelized)
- PVCs linked to the pods are not deleted and must be manually deleted

##### DaemonSet

- used for instructing k8s to run pods on a particular machine (override kub scheduler) like loggging apps like sysdig, logDNA etc.

##### ComponentStatus

- get the health of kubernetes components: etcd, controller manager, and scheduler (apiVersion: v1)

##### Event

- show you what is happening inside a cluster, such as what decisions were made by the scheduler or why some pods were evicted from the node (apiVersion: v1)
<!-- ##### Endpoint: See clusterIP service, these are explained there -->

## Commands Run

- `kubectl apply -f client-pod.yml`, `kubectl apply -f client-node-port.yml`
  - `apply`: change the current configuration (state: deployment as a function of configuration state) of the cluster with what is in the file (-f) I am supplying you
    - When this command is run `kubectl` talks to kubernetes control plane (Talks to the kube-apiserver that inturn talks to the kube-scheduler which talks to the kubelet instance running on the worker node that talks to the COnatiner Runtime via the Coantiner Network Interface, CNI) that instructs the container runtime running inside the kubernetes node (VM) to spin up a container (details of which are in the config file), the conatiner runtime checks its image cache, if the image is there it spins up the container or it fetches from the registry (Docker Hub or yourRegistry)

  - The Master (control plane: kube-apiserver, scheduler, ControllerManager are on the Master and so is etcd to maintain cluster state) adds details like how many containers are to be run in a pod, how many pods are to be run etc. to `etcd` master uses this information to poll the nodes to check all the pods and services defined match what is there in `etcd`, any descrepancy like a container has died etc. triggers an update of `etcd` items (how mayn containers SHOULD be running and how many ARE running) the master then isntructs conatiner runtime to spin up conatiner that has died and `etcd` gets updated and peace is restored

- `kubectl get pods`
  Prints out the status of group of object types (Pods in this case)

- `kubectl get services`
  Prints out the status of group of object types (Services in this case)

- When we try to access `localhost:31515`, nothing since it is not bound to locahost or 0.0.0.0 but to the IP of the VM (Kubernetes Node) that was created by minikube (`minikube ip`: to find the ip)

- kubectl describe pods client-pod (`kubectl describe <objectType(pods, services etc.)> <name(optional; name of the particular object ex: client-pod)>`)
  - Gives details about the objectType (all if exact name not specified)
  - Why use this: to figure out what pod (objectType) is running what image or why a pod restarted

- `kubectl delete -f client-pod.yml` (Imperative udpate)

- `minikube docker-env`: Gives docker env vars from inside of the VM and gives you a chance to point your local docker client to VM's docker server... Can be used for snooping around in there

- `kubectl get storageclass`: Lists all options that are availble for creating PVC's or even Persistent Volumes

- `kubectl describe storageclass`: Details about storage options available

- `kubectl create secret <typeOfSecret: generic, docker-registry, tls> <secretName: a name to refer this secret by> --from-literal key=value`: Imperatively create a secret to be strored inside the cluster (etcd??)

- `kubectl get secrets`: gets secrets

- `minikube dashboard`: brings up a fullfledged kubernetes dashboard (All edits and changes are imperative)

## Limitations to declarative deployment updates

- On changing the containerPort of the client-pod in the `client-pod.yml` file and running kubectl apply client-pod.yml, we get

  - this: _The Pod "client-pod" is invalid: spec: Forbidden: pod updates may not change fields other than`spec.containers[*].image`,`spec.initContainers[*].image`,`spec.activeDeadlineSeconds` or `spec.tolerations`(only additions to existing tolerations)` which means we can onlky update the shown properties for a pod_
  - Something similar for statefulsets: `The StatefulSet "redis" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden

- Solution: Deployment object
  - Maintains a set of identical pods, ensuring they have correct config and the right number of them (Very similar to the ReplicaSet spec; They both look exactly the same except `kind`)
  - Deployments help in managing updates to images running in pods, any update (RollingUpdate stragtegy is default) and scaling

## Pods vs Deployments

- Runs a single set of tightly coupled containers vs Runs a set of identical pods
- Good for one-off dev purposes vs Monitors state of each pod, updating as necessary
- Rarely used in production vs Good for dev and production
- Every deployment has a Pod Template associated with it which tells the deployment the details of the pod

## Persistent Volumes (PV), Persistent Volume Claim (PVC) and Storage Class

- Persist data between pod restarts and deletions (scaling up or down is just another flavor of deletion)
- Volumes in container land vs. kube land
  - allow container to access fs outside of itself vs a kubernetes object type that allows a container to store data at pod level
- Persistent Volume vs volume
  - Storage not tied to pod vs storage not tied to container but to pod
- Persistent Volume vs PVC
  - Statically provisioned vs dynamically provisioned (Only created when asked)
  - Created ahead of time vs Created when need arises (Like an advertisement)
- PVCs are attached to Pod definition, kubernetes then figures out wether to give it a statically provisioned Volume or provide it Dynamically, create it when need arises
- PVCs accessModes:
  - ReadWriteOnce: single node
  - ReadOnlyMany: Multiple nodes can read from this
  - ReadWriteMany: Many nodes and can read from and write to
- PVs are a cluster resource just like memory and CPU
  - K8s offers PVs as an interface to the actual storage
  - PVs are not namespaced
  - There are different types of storage backends (nfs, localVloume (like configMap volumes; linked to pod's lifecycle), cloudStorage; Docs have good details on this
- Storage classes provision PVs dynamically when a PVC claims it (Dynamic Provisioning or the the sys admin has to manually create the PV before it can be claimed, Static Provisioning)
  - Is another abstraction that abstracts underlying storage and parameters for that storage
  - When a pod claims storage via a PVC:
    - PVC requests storage via StorageClass
    - StorageClass creates the PV that satisfies the claim

```YAML
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: storage-class-name # ibm-file-silver or ibmc-vpc-block-10iops-tier
provisioner: kubernetes.io/aws-ebs # vpc.block.csi.ibm.io; external provsioner; kubernetes.io internal provsioner; each storage backend has its own provisioner
parameters:
  type: io1
  iopsPerGB: "10"
  fsType: ext4
```

## Security Context

- Docker World (Link Obsidian here)
  - The container and host machine share the same kernel space
  - The host has its own set of processes that are separate from the container process (process isolation achieved by namespaces; Host has its ns and container has its ns)
  - The container cannot see the host's processes but the host can see the container's processes (With different PIDs associated when checked from the host or container)
  - By default, docker runs processes wihtin the container as the `root` user unless specified otherwise (Best prectice is to have the USER set as a part of the image in the dockerfile; `root` user within the container is not the same as the `root` user of the host)
  - If we want to add more capabilities to the USER in the container, `docker run --cap-add <capabilityName> <imageName>`
  - remove capabilities: `docker run --cap-drop <capabilityName> <imageName>`
  - All privs: `docker run --privileged <imageName>`
  - Full capabilities of the linux root user: `/usr/include/linux/capability.h`

- K8s world
  - securityContext settigns can be at the pod level or at the contianer level (takes precedence over former)
    - if at pod level: all containers within the pod will have the same security context
      - `spec.securityContext.runAsUser=1000`
    - if at container level: obvious

```YAML
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        runAsUser: 1000
        # capabilities only supported at the container level
        capabilities:
          add: ["MAC_ADMIN"]
```

## Service Account

- user accounts used by humans and service account used by machines or apps (Prometheus, Jenkins etc, use this to talk to kube API server)
- Creation of service account automatically creates a token secret (this token is used as a bearer toekn to talk to the api-server)
- Mount service token as a volume into the container for a service that is running in the cluster that needs to talk to the API server, ex: Prometheus
- k8s automatically mounts the default service account to the pod of an application
- A service account is restructed to running basic queries against teh API server
- You can choose to not auto mount the service account by settign `spec.automountServiceAccountToken=false`

## Resource Requirements

- 0.5 vCPU, 256 Mi default for containers (These defaults need to be created)

```YAML
apiVersion: v1
kind: LimitRange
metadata:
  name: mem-limit-range
spec:
  limits:
  - default:
      memory: 512Mi
    defaultRequest:
      memory: 256Mi
    type: Container

---

apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-limit-range
spec:
  limits:
  - default:
      cpu: 1
    defaultRequest:
      cpu: 0.5
    type: Container
```

- `resources.request.memory` and `resources.request.cpu`
- `resources.request.limits.memory` and `resources.request.limts.cpu`
  - To define upperbounds for cpu adn memory; cpu limit can't be exceeded but memory limit can be
  - If a pod continously exceeds memory, it will be evicted

## Taints and Tolerations

- Taints are on nodes (`kc taint nodes <nodeName> key=value:taint-effect` key-value ex: app=elasticesearch-master) and toleraations on Pods
  - To untaint, `kubectl taint nodes <nodeName> key:NoSchedule-`
  - ex: `kubectl taint nodes controlplane node-role.kubernetes.io/master:NoSchedule-`
- Tells nodes to accept pods with the right tolerations!
- `taint-effect`: What happens to a Pod if a taint isnot tolerated
  - NoSchedule: Won't schedule to node
  - PreferNoSchedule: Try to avoid schduling to the node
  - NoExecute: No new pods will be scheduled, if there are remaining pods that don't tolerate a taint, evict them
- At pod level:

```YAML
...
kind: Pod
spec:
  containers:
    - name: nginx-container
      image: nginx
  tolerations:
    - key: "app"
      operator: "Equal"
      value: "blue"
      effect: "NoSchedule"
```

- A taint is set on the Master node when the cluster is initialized so that no pods are scheduled
  - `kcdes node kubemaster | grep Taint`
- Don't guarantee that your pod won't end up anywhere else

## Node Selectors and Node Affinity

- `kc label nodes <nodeName> <label-key>=<lable-value>`
  - ex: `kc label nodes node-1 size=Large`
- You can't be too expressive with this. For instance we cannot say schdule a pod on a Large or Medium node etc. Solution: *NodeAffinity*
- NodeAffinity

```YAML
apiVersion: v1
kind: Pod
metdata:
  name: mayapp-pod
spec:
  containers:
  - name: bleh-big-container
    image: bleh-big-container-image
  nodeSelector:
    size: Large # ibm-cloud.kubernetes.io/worker-pool-name: Large

---

# Same thing using NodeAffinity
apiVersion: v1
kind: Pod
metdata:
  name: mayapp-pod
spec:
  containers:
  - name: bleh-big-container
    image: bleh-big-container-image
  affinity:
    # Both affinity rules have no effect on already running pods
    # requiredDuringSchedulingRequiredExecution: NEW, not released, will evict pod if label on node changes
    nodeAffinity:
      # preferredDuringSchedulingIgnoreDuringExecution: if a matching node is not found, simply ignore the nodeAffinity rules
      requiredDuringSchedulingIgnoreDuringExecution: #  Should place pod on the node that matches the criteria below
        nodeSelectorTerms:
        - matchExpressions:
          - key: size
            operator: In # NotIn
            values:
            - Large
            # - Medium this will be an OR operation
            # - Small the NotIn Example
          # - key: size
          #   operator: Exists Checks if the key size exists
```

## Multi-Container Pods

- Same network space (localhost connectivity), volume sharing
- Ambassador
  - Facilitates some functionality like connecting to a db. The app conatienr can always connect to a db on localhost and the ambassador caontainer can facilitate this connection
- Sidecar
  - Logging container, proxy container
- Adapter
  - similar to sidecar but does some extra processing before sending to destination (Concept not too clear)

## Readiness and Liveness Probes

- Readiness: Is the app up to get going; Are you ready to party?
- Liveness: Is the app working? Check periodically; You having a good time? (If an app freezes, readiness won't check that liveness check will trigger a restart)
- `httpGet` for apis, `tcpSocket` for ports, `exec.command` for manually defining a script that checks for liveness or readiness
  - `initialDelaySeconds`: if your app takes 5s to spin up, set this values so that the readiness or liveness check can happen
  - `periodSeconds`: How often to probe
  - `failureThreshold`: how many failures are you ok with (default 3)

## Rolling updates and Rollbacks

- `kubectl top pod` and `kubectl top node` for getting performance metrics for pods and nodes
- `kubectl rollout status <deploymentNameOrStatefulSetName>` for chceking the status of deployment
- `kubectl rollout history <deploymentNameOrStatefulSetName>`: To view the history of change on a deployment
- Deployment Stragtegies
  - Recreate: Destroy all pods and then bring the new pods up --> Downtime (Scale down first and then Scale up)
  - RollingUpdate: Gradually kill pods and bring new ones up --> No Downtime (Default) (Scale up then scale down gradually as pods become READY)
- `kubectl rollout undo <deploymentName> <--revision=revisionNumber>`: to revert to a previous version; If you have revision number, then we can roll back to a particular revision

## Jobs and CronJobs

- Containers running in a pod will be restarted if they stop even if their work is done, say `docker run ubuntu expr 3 + 5` will exit after the job is done but k8s will bring it back up. If we want a short running process then we use `kind: Job`
  - `restartPolicy: Always`: default

```YAML
apiVersion: batch/v1
kind: Job
metadata:
  name: math-add-job
spec:
  # number of pods (replicas kinda deal); Creates pods till three pods complete their job successfully; This is sequential if parallelism not set
  completions: 3
  # non-sequential
  parallelism: 3
  backoffLimit: 25 # This is so the job does not quit before it succeeds.
  template:
    spec:
      containers:
        - name: math-add
          image: ubuntu
          command: ['expr', '3', '+', '2']
      restartPolicy: Never
```

- CronJobs:

```YAML
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: throw-dice-cron-job
spec:
  schedule: "30 21 * * *"
  jobTemplate:
    spec:
      completions: 3
      parallelism: 3
      backoffLimit: 25 # This is so the job does not quit before it succeeds.
      template:
        spec:
          containers:
          - name: math-add
            image: kodekloud/throw-dice
          restartPolicy: Never
```

## Monitoring

- Metrics Server: in-memory, light-weight
- kubeliet

## Miscelleneous but important

- `CMD`: `spec.containers.args`
- `ENTRPOINT`: `spec.containers.command`
- `kubectl explain <resource or resource.field> --recursive | less`: to get the resource's details and identation right
- `kcl <podName> <containerName-WhenThereAreMultiplePods>`
- `kcg po --watch`: To actively see the chnage in status of the pod
- `kubectl set image <deploymentName> <containerImageName=containerImage>` - update the image of the existing deployment
- `kubectl rollout history deployment nginx --revision=1`: To check the revision of each deployment version (starts from 1)
- `kubectl set image deployment nginx nginx=nginx:1.17 --record`: To record the change to a deployment (the command that was run)
- `kubectl cordon <nodeName>`: Cordons the node off and takes it out of schedulable nodes
- `kubectl drain node <nodeName>`: Drains the node of all pods, statefulsets etc. (If there's a pdb etc. this will require some aditional flags)
- `kubectl create cronjob <name> --image=<imageName> --sechdule=<CronSchedule>`
- `kubectl cp`: For copying; needs exploration

## An opinion to size clusters, cluster design

- Check this out when setting your cluster. Taken  from Medium so take it with a grain of salt
- `The number of containers per node = Square root of the closest lower perfect square to the total number of containers, provided the number of containers per node doesn’t exceed the recommended value`
- `Number of nodes = Total number of containers / The number of containers per node`
- `Overprovision factor = Number of containers per node * max resource per container / (Number of nodes — Max planned unavailable nodes)`
- `Node capacity = max resource required per container * the number of containers per node + overprovision factor + Kubernetes system resource requirements`

Example

Let’s say we need two node pools:

Microservices — 200 microservices with 0.1 core and 100MB RAM max resource requirement per container
Databases — 20 PostgreSQL databases with 2 cores and 4GB RAM max resource requirement per container

Assuming that the Kube system resources utilise 0.5 cores and 0.5 GB of RAM and we plan for one node to fail at a time
For the microservices node pool:

```
Nearest lower perfect square number = 196
Number of Containers per node = sqrt(196) = 14
Number of Nodes = 200/14 = 14.28 ~ 15
Max planned unavailable nodes = 1
Overprovision factor = 14 * (0.1 core + 100MB RAM)/(15–1) = 0.1 core + 100MB RAM
Node Capacity = (0.1 core + 100MB RAM) * 14 + 0.1 core + 100MB RAM + 0.5 cores + 500MB RAM = 2 core + 2GB RAM
```

For the database pool:

```
Nearest lower perfect square number = 16
Number of Containers per node = sqrt(16) = 4
Number of Nodes = 20/4 = 5
Max planned unavailable nodes = 1
Overprovision factor = 4 * (2 core + 4GB RAM)/(5–1) = 2 core + 4GB RAM
Node Capacity = (two core + 4GB RAM) * 4 + 2 core + 4GB RAM + 0.5 cores + 0.5 GB RAM = 10.5 core + 20.5 GB RAM
Therefore, for the microservices pool, you would need 15 worker nodes with 2 cores and 2 GB RAM each, and for the database pool, you would need five worker nodes with 10.5 cores and 20.5 GB RAM each. You can round the numbers to the next higher available machine type for simplicity.
```

## Sources

- [Kubernetes Docs - KING](https://kubernetes.io/docs/concepts/)
- [Kubernetes Wiki Page](https://en.wikipedia.org/wiki/Kubernetes)
- [YT Carsonoid](https://www.youtube.com/watch?v=90kZRyPcRZw)
- [Vimeo Expanded version of the above](https://vimeo.com/245778144/4d1d597c5e)
- [Inner workings of kube-scheduler](https://www.azuremonk.com/blog/kube-scheduler)
- [TechWorld With Nana](https://www.youtube.com/channel/UCdngmbVKX1Tgre699-XLlUA)
