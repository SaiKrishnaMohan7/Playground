# Istio

A kind of Service Mesh. An extra layer of software atop k8s
Think of it as Pods sitting on top of the service mesh
![ServiceMeshConcept](https://github.com/SaiKrishnaMohan7/Playground/blob/235a3298b2be359489db5cae8b5349caa424d4e5/k8s/Istio/diagrams/ServiceMeshConcept.png)

Istio injects a sidecar (Envoy) into the pod.
![Istio implementation of Service Mesh Concept](https://github.com/SaiKrishnaMohan7/Playground/blob/master/k8s/Istio/diagrams/IstioImplementationOfServiceMeshConcept.png)

Don't need to modify application container to take use a ServiceMesh, should be a on/off action (Ideal; Tracing needs some tweaking)

## istio-system Namespace

- istiod (Istio Daemon; gathers telemetry data)
  - Entireity of Istio is implmented as a single pod
  - Envoy proxy pods call this pod to implement its logic
  - The Proxies are collectively called the Data Plane and the Istiod has the control plane

![Istio Control Plane](https://github.com/SaiKrishnaMohan7/Playground/blob/master/k8s/Istio/diagrams/IstioControlPlane.png)

![Istio Data Plane](https://github.com/SaiKrishnaMohan7/Playground/blob/master/k8s/Istio/diagrams/IstioDataPlane.png)

- Kiali
- Grafana
- StatsD
- Jaeger
