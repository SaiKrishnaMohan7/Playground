# Kubernetes

Container Orchestration and management system

Imperative deployment: Follow exactly the steps to arrive at the conatiner setup (ex: run these containers on this machine)
Declarative Deployment: Our setup should look like this, make it happen (Master chooses where to run the container)

## Kubernetes Components

## kubectl Imperative commands

- `--dry-run:` By default as soon as the command is run, the resource will be created. If you simply want to test your command, use the `--dry-run=client` option. This will not create the resource, instead, tell you whether the resource can be created and if your command is right.

- `-o yaml`: This will output the resource definition in YAML format on the screen.

- Use the above two in combination to generate a resource definition file quickly, that you can then modify and create resources as required, instead of creating the files from scratch.

- _POD_
  - Create an NGINX Pod: `kubectl run nginx --image=nginx`
  - Generate POD Manifest YAML file (-o yaml). Don't create it(--dry-run): `kubectl run nginx --image=nginx  --dry-run=client -o yaml`

- Deployment
  - Create a deployment: `kubectl create deployment --image=nginx nginx`
  - Generate Deployment YAML file (-o yaml). Don't create it(--dry-run): `kubectl create deployment --image=nginx nginx --dry-run=client -o yaml`

- *IMPORTANT:*
  - Not too sure--> kubectl create deployment does not have a --replicas option. You could first create it and then scale it using the kubectl scale command.
  - Save it to a file - (If you need to modify or add some other details): `kubectl create deployment --image=nginx nginx --dry-run=client -o yaml > nginx-deployment.yaml`
  - You can then update the YAML file with the replicas or any other field before creating the deployment.

- Service
  - Create a Service named redis-service of type ClusterIP to expose pod redis on port 6379: `kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml` _(This will automatically use the pod's labels as selectors)_
Or

  - `kubectl create service clusterip redis --tcp=6379:6379 --dry-run=client -o yaml`  _(This will not use the pods labels as selectors, instead it will assume selectors as app=redis. You cannot pass in selectors as an option. So it does not work very well if your pod has a different label set. So generate the file and modify the selectors before creating the service)_

  - Create a Service named nginx of type NodePort to expose pod nginx's port 80 on port 30080 on the nodes: `kubectl expose pod nginx --port=80 --name nginx-service --type=NodePort --dry-run=client -o yaml` _(This will automatically use the pod's labels as selectors, but you cannot specify the node port. You have to generate a definition file and then add the node port in manually before creating the service with the pod.)_

  Or

  `kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml` _(This will not use the pods labels as selectors)_

  - Both the above commands have their own challenges. While one of it cannot accept a selector the other cannot accept a node port. I would recommend going with the `kubectl expose` command. If you need to specify a node port, generate a definition file using the same command and manually input the nodeport before creating the service.

## Kubernetes Objects

### Pods

a group of interdependent containers (one or more) working together (apiVersion: v1)

### ReplicaSet

maintains a stable set of replica pods to ensure high availability (apiVersion: v1)

### Service

- a set of Pods working together (defined by label selector) (apiVersion: v1)
- used when some amount of networking is needed in the cluster
- Manages the assignment of IP addrs to the pod, so if a pod gets restarted, user doesnr't have to worry about knowing (finding) the IP addrs
- *_Pods use Services to talk to each other and service get registered as local dns names. This is how the label-selector mechanism is used._*

#### SubTypes

##### ClusterIP

- Exposes a set of pods to other objects in the cluster

##### NodePort

- Exposes container to the outside world (good for dev purposes)
- Creates a communication layer between the outside world and the container running inside the pod (req comes to kube-proxy and then to Service NodePort)

##### LoadBalancer

- Legacy way of getting traffic into our cluster
- LoadBalancer will give access to only one pod
- Ingress is the new kid on the block

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

offers resource allocation/management by namespace (apiVersion: v1)

##### ConfigMap

- used to store env vars needed by pods; sent to the exact pod that needs the vars. in memory;
- if pod is removed, memory is cleared. Original stored in etcd, encrypted (apiVersion: v1)

##### Secret

- same as ConfigMaps (apiVersion: v1)
- Securely stores a piece of information in the cluster like apiKeys, passwords etc.

##### StatefulSet

- A Controller. Used for statefull applications, like databases, where instance ordering matters (for dbs with primary and secondary instances) (apiVersion: apps/v1)

##### DaemonSet

- used for instructing k8s to run pods on a particular machine (override kub scheduler) like loggging apps like sysdig, logDNA etc.

##### ComponentStatus

- get the health of kubernetes components: etcd, controller manager, and scheduler (apiVersion: v1)

##### Event

- show you what is happening inside a cluster, such as what decisions were made by the scheduler or why some pods were evicted from the node (apiVersion: v1)
<!-- ##### Endpoint: unclear -->

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

  - this: `The Pod "client-pod" is invalid: spec: Forbidden: pod updates may not change fields other than`spec.containers[*].image`,`spec.initContainers[*].image`,`spec.activeDeadlineSeconds` or `spec.tolerations`(only additions to existing tolerations)` which means we can onlky update the shown properties for a pod
  - Something similar for statefulsets: `The StatefulSet "redis" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden`

- Solution: Deployment object
  - Maintains a set of identical pods, ensuring they have correct config and the right number of them (Very similar to the ReplicaSet spec; They both look exactly the same except `kind`)
  - Deployments help in managing updates to images running in pods, any update (RollingUpdate stragtegy is default) and scaling

## Pods vs Deployments

- Runs a single set of tightly coupled containers vs Runs a set of identical pods
- Good for one-off dev purposes vs Monitors state of each pod, updating as necessary
- Rarely used in production vs Good for dev and production
- Every deployment has a Pod Template associated with it which tells the deployment the details of the pod

## Persistent Volume Claim (PVC)

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

## Sources

- Kubernetes Docs [https://kubernetes.io/docs/concepts/]
- Kubernetes Wiki Page [https://en.wikipedia.org/wiki/Kubernetes]
- Handwritten notes (need to be digitised)
- [YT Carsonoid](https://www.youtube.com/watch?v=90kZRyPcRZw)
- [Vimeo Expanded version of the above](https://vimeo.com/245778144/4d1d597c5e)
- [Inner workings of kube-scheduler](https://www.azuremonk.com/blog/kube-scheduler)
