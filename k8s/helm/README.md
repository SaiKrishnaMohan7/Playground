# Helm

A package manager for k8s like homebrew/npm is for Mac/JS respectively

## Helm templating

- *Newlines are whitespace*
- Walking through [YAML Techniques](https://helm.sh/docs/chart_template_guide/yaml_techniques/) will be very helpful
- `fullnameOverride` and `nameOverride` are created during `helm create <yourChartName(Release Name)>`
- Template names do not follow a rigid naming pattern. Recomended to use `.yaml` for YAML files and `.tpl` for helpers
- All files in the template directory are sent to the `templating engine`, where it is populated with all the referenced values and then sent to k8s
- `helm get manifest <nameYouGaveAtInstall(Release Name)>` gives you the complete detail of the deployed manifest (will show the yaml)
  - `Release` is one of the top-level objects. Objects can be created in the code
- To test template rendering but not install it, `helm install --debug --dry-run <ReleaseName(optional)> ./templatingLearningChart (Chart Dir)`

### Built-in Objects

- `Release`
  - `Release.Name`: The release name
  - `Release.Namespace`: The namespace to be released into (if the manifest doesn’t override)
  - `Release.IsUpgrade`: This is set to true if the current operation is an upgrade or rollback.
  - `Release.IsInstall`: This is set to true if the current operation is an install.
  - `Release.Revision`: The revision number for this release. On install, this is 1, and it is incremented with each upgrade and rollback.
  - `Release.Service`: The service that is rendering the present template. On Helm, this is always Helm

- `Values`:
Values passed into the template from the `values.yaml` file and from user-supplied files. By default, Values is empty. Following is how Values gets populated, this is in order of specificity, the values can be overridden:
  - The `values.yaml` file in the chart
  - If this is a subchart, the `values.yaml` file of a parent chart
  - A values file if passed into helm install or helm upgrade with the `-f flag (helm install -f myvals.yaml ./mychart)`
  - Individual parameters passed with `--set (such as helm install --set foo=bar ./mychart)`
  - Deleting a default key:
    - A default value (key: value) can be removed by overriding it with `null`, ex: favoriteDrink: null, helm will remove this key in this case for us
  - [src](https://helm.sh/docs/chart_template_guide/values_files/)

- `Files`: This provides access to all non-special files in a chart
  - `Files.Get`: for getting a file by name (.Files.Get config.ini)
  - `Files.GetBytes`: for getting the contents of a file as an array of bytes instead of as a string. This is useful for things like images.
  - `Files.Glob`: returns a list of files whose names match the given shell glob pattern.
  - `Files.Lines`: reads a file line-by-line. This is useful for iterating over each line in a file.
  - `Files.AsSecrets`: returns the file bodies as Base 64 encoded strings.
  - `Files.AsConfig`: returns file bodies as a YAML map.

- `Capabilities`: This provides information about what capabilities the Kubernetes cluster supports.
  - `Capabilities.APIVersions` is a set of versions.
  - `Capabilities.APIVersions.Has $version` indicates whether a version (e.g., batch/v1) or resource (e.g., apps/v1/Deployment) is available on the cluster.
  - `Capabilities.KubeVersion` and `Capabilities.KubeVersion.Version` is the Kubernetes version.
  - `Capabilities.KubeVersion.Major` is the Kubernetes major version.
  - `Capabilities.KubeVersion.Minor` is the Kubernetes minor version.

- `Template`: Contains information about the current template that is being executed
  - `Template.Name`: A namespaced file path to the current template (e.g. mychart/templates/mytemplate.yaml)
  - `Template.BasePath`: The namespaced path to the templates directory of the current chart (e.g. mychart/templates).

- _The built-in values always begin with a capital letter_. This is in keeping with Go's naming convention. When you create your own names, you are free to use a convention that suits your team. Some teams, like the Kubernetes Charts team, choose to use only initial lower case letters in order to distinguish local names from those built-in.

### Template Functions

Basic Syntax: `functionName arg1 arg2...`
[src](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/)

- `quote`
  - `drink: {{ quote .Values.favorite.drink }}` or `drink: {{ .Values.favorite.drink | quote }}`

- `default`
  - Syntax: `default DEFAULT_VALUE GIVEN_VALUE`
  - specify a default value inside of the template, in case the value is omitted.
  - all static default values should live in the values.yaml, and should not be repeated using the `default` command (redudnant)
  - `default` command is perfect for computed values, which can not be declared inside values.yaml. ex: `drink: {{ .Values.favorite.drink | default (printf "%s-tea" (include "fullname" .)) }}`

- `lookup`
  - [To the point](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/#using-the-lookup-function)

- [List of Template Functions](https://helm.sh/docs/chart_template_guide/function_list/)

### Flow Control

- `{{-`(with the dash and space added) indicates that whitespace should be chomped left, while `-}}` means whitespace to the right should be consumed
- *_Make sure there is a space between the `-` and the rest of your directive. {{- 3 }} means "trim left whitespace and print 3" while {{-3 }} means "print -3"_*
- *_Be careful with the chomping modifiers. It is easy to accidentally do things like this:_*

```YAML
  food: {{ .Values.favorite.food | upper | quote }}
  {{- if eq .Values.favorite.drink "coffee" -}}
  mug: true
  {{- end -}}
```

  this ^^ will result in `food: "PIZZA"mug:true` so NO NO (the `-` after `end` _consumed_ the sapce)

- `with`:
  - Scope changing, no need to do what I have done in the above YAML example
  - `.` is the reference to *current scope*
  - The `with`_action_ can be used to chnage that scope! For instance, the above example can be re-written as

  ```YAML
  {{- with .Values.favorite}}
  food: {{ .food | upper | quote }}
  {{- if eq .drink "coffee" -}}
  drink: {{ .drink }}
  mug: true
  {{- end }}
  {{- end}}
  ```

  - *_Caution: above, scope has chnaged, hence you can't access somethign like say {{ .Release.Name }}, it can be accessed OUTSIDE of the `with` block OR with `$` (is mapped to the root scope during execution) `{{ $ .Release.Name }}` ((in the `with` block of course))_*

  - `range`: looping and chnages scope!
    - [Very Good Example and to the point](https://helm.sh/docs/chart_template_guide/control_structures/#looping-with-the-range-action)

### Variables

Block scoped, `$` is always global pointing to root context, concept very similar to `let` in JS

- Syntax: `$<variableName> := <value>`

```YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  myvalue: "Hello World"
  {{- $relname := .Release.Name -}}
  {{- with .Values.favorite }}
  drink: {{ .drink | default "tea" | quote }}
  food: {{ .food | upper | quote }}
  release: {{ $relname }}
  {{- end }}
```

- `range` action example REMEMBER: this action also has its own scope!

```YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  myvalue: "Hello World"
  {{- range $key, $val := .Values.favorite }}
  {{ $key }}: {{ $val | quote }}
  {{- end }}
```

- A very fine example, why the `.` won't work is because of `range` which has modified the scope to `{{ .Values.tlsSecrets }}`

```YAML
{{- range .Values.tlsSecrets }}
apiVersion: v1
kind: Secret
metadata:
  name: {{ .name }}
  labels:
    # Many helm templates would use `.` below, but that will not work,
    # however `$` will work here
    app.kubernetes.io/name: {{ template "fullname" $ }}
    # I cannot reference .Chart.Name, but I can do $.Chart.Name
    helm.sh/chart: "{{ $.Chart.Name }}-{{ $.Chart.Version }}"
    app.kubernetes.io/instance: "{{ $.Release.Name }}"
    # Value from appVersion in Chart.yaml
    app.kubernetes.io/version: "{{ $.Chart.AppVersion }}"
    app.kubernetes.io/managed-by: "{{ $.Release.Service }}"
type: kubernetes.io/tls
data:
  tls.crt: {{ .certificate }}
  tls.key: {{ .key }}
---
{{- end }}
```

### Named Templates

- Template names are global
- Convention for safety: `{{ define "<yourChartName>.<whateverYouWantToLabel>" }}`
- Files that begin with `_` assumed to have no manifest (k8s manifest), used to contain helpers and partials
- We can pull in shared config with the `template` action but it is better to use `include` fucntion instead as the output of that can be modified

```YAML
labels:
# This will biring in the contents of the template `maychart.app` as is (same identation!!)
# and you won't be able to modify the identation (erroneous chart)
    {{ template "mychart.app" . }}
```

```YAML
labels:
# using `include` here let's us modify the output and indent it properly
    {{ include "mychart.app" . | indent 4 }}
```

- [src](https://helm.sh/docs/chart_template_guide/named_templates/)
- [Named Templates form the basis of Library and Helper Charts](https://helm.sh/docs/topics/library_charts/)

### Accessing files that are not templates

- Ok to include files other than templates BUT *Charts must be smaller than _1M_* (a k8s storage limitation)
- Files inside `templates/` CANNOT be accessed via the `.Files` built-in object. Same applies to files in `.helmignore`
- UNIX mode info is NOT preserved, so, file level permissions (chmod, chown) have no power here (Théoden)
- [src](https://helm.sh/docs/chart_template_guide/accessing_files/)

### Subcharts and Globals

- [src](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)

### Futher reading and knowledge expansion

- [Helm Lifecyle Hooks](https://helm.sh/docs/topics/charts_hooks/)
- [Writing a Hook](https://helm.sh/docs/topics/charts_hooks/#writing-a-hook)
- [Helm Chart Tests](https://helm.sh/docs/topics/chart_tests/)
- [YAML Techniques](https://helm.sh/docs/chart_template_guide/yaml_techniques/)

### Shell Commands run

```sh
Playground (helm) $ helm install test-chart ./helm/templatingLearningChart/
NAME: test-chart
LAST DEPLOYED: Mon Jul 27 22:13:05 2020
NAMESPACE: observability
STATUS: deployed
REVISION: 1
TEST SUITE: None
Playground (helm) $ helm get manifest test-chart
---
# Source: templatingLearningChart/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mychart-configmap
data:
  myvalue: "Hello World"

Playground (helm) $ helm uninstall test-chart
release "test-chart" uninstalled
Playground (helm) $ helm install test-chart_builtInObj ./helm/templatingLearningChart/
Error: create: failed to create: Secret "sh.helm.release.v1.test-chart_builtInObj.v1" is invalid: metadata.name: Invalid value: "sh.helm.release.v1.test-chart_builtInObj.v1": a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')
Playground (helm) $ helm install test-chart-values-obj ./helm/templatingLearningChart/
NAME: test-chart-values-obj
LAST DEPLOYED: Tue Jul 28 12:06:55 2020
NAMESPACE: observability
STATUS: deployed
REVISION: 1
TEST SUITE: None
Playground (helm) $ helm get manifest test-chart-values-obj
---
# Source: templatingLearningChart/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  # The leading dot before the Release.Name indicates to start from the top-most namespace
  #.Release.Name as "start at the top namespace, find the Release object, then look inside of it for an object called Name"
  name: test-chart-values-obj-configmap
data:
  myvalue: "Hello World"
  drink: coffee

Playground (helm) $ helm install test-chart-values-obj ./helm/templatingLearningChart/ --dry-run --debug
install.go:159: [debug] Original chart version: ""
install.go:176: [debug] CHART PATH: /Users/saikrishnamohan/Projects/Personal/Playground/helm/templatingLearningChart

NAME: test-chart-values-obj
LAST DEPLOYED: Tue Jul 28 12:08:18 2020
NAMESPACE: observability
STATUS: pending-install
REVISION: 1
TEST SUITE: None
USER-SUPPLIED VALUES:
{}

COMPUTED VALUES:
affinity: {}
autoscaling:
  enabled: false
  maxReplicas: 100
  minReplicas: 1
  targetCPUUtilizationPercentage: 80
favoriteDrink: coffee
fullnameOverride: ""
image:
  pullPolicy: IfNotPresent
  repository: nginx
  tag: ""
imagePullSecrets: []
ingress:
  annotations: {}
  enabled: false
  hosts:
  - host: chart-example.local
    paths: []
  tls: []
nameOverride: ""
nodeSelector: {}
podAnnotations: {}
podSecurityContext: {}
replicaCount: 1
resources: {}
securityContext: {}
service:
  port: 80
  type: ClusterIP
serviceAccount:
  annotations: {}
  create: true
  name: ""
tolerations: []

HOOKS:
MANIFEST:
---
# Source: templatingLearningChart/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  # The leading dot before the Release.Name indicates to start from the top-most namespace
  #.Release.Name as "start at the top namespace, find the Release object, then look inside of it for an object called Name"
  name: test-chart-values-obj-configmap
data:
  myvalue: "Hello World"
  drink: coffee

Playground (helm) $ helm install test-chart-values-obj ./helm/templatingLearningChart/ --dry-run --debug --set favoriteDrink=slurm
install.go:159: [debug] Original chart version: ""
install.go:176: [debug] CHART PATH: /Users/saikrishnamohan/Projects/Personal/Playground/helm/templatingLearningChart

NAME: test-chart-values-obj
LAST DEPLOYED: Tue Jul 28 12:12:07 2020
NAMESPACE: observability
STATUS: pending-install
REVISION: 1
TEST SUITE: None
USER-SUPPLIED VALUES:
favoriteDrink: slurm

COMPUTED VALUES:
affinity: {}
autoscaling:
  enabled: false
  maxReplicas: 100
  minReplicas: 1
  targetCPUUtilizationPercentage: 80
favoriteDrink: slurm
fullnameOverride: ""
image:
  pullPolicy: IfNotPresent
  repository: nginx
  tag: ""
imagePullSecrets: []
ingress:
  annotations: {}
  enabled: false
  hosts:
  - host: chart-example.local
    paths: []
  tls: []
nameOverride: ""
nodeSelector: {}
podAnnotations: {}
podSecurityContext: {}
replicaCount: 1
resources: {}
securityContext: {}
service:
  port: 80
  type: ClusterIP
serviceAccount:
  annotations: {}
  create: true
  name: ""
tolerations: []

HOOKS:
MANIFEST:
---
# Source: templatingLearningChart/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  # The leading dot before the Release.Name indicates to start from the top-most namespace
  #.Release.Name as "start at the top namespace, find the Release object, then look inside of it for an object called Name"
  name: test-chart-values-obj-configmap
data:
  myvalue: "Hello World"
  drink: slurm
```
