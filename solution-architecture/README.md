# Instagram-like mobile application

![architecture-diagram](/solution-architecture/architecture-diagram.png)

### Pros

This architecture is totally built with AWS managed services that
can make time-to-market faster than implementing all services by yourselves.
Moreover, developers don't need to care about the physical infrastructure.

### Cons

Even though managed services are convenient, they are limitations.
First, a service may not fit our requirement. A service from other cloud
providers might better suit for that requirement. Second, A pay-as-per-use charge
from AWS isn't cheapest, for example AWS Lambda is charge every invocation,
but if we instead use EC2/ECS/EKS, the charge will become wholesale price.
Sometime, the same service from other cloud providers might cheaper charge than AWS.

### Risks

Because our architecture is depended on AWS, It can become single point of
failure. My suggest is understanding SLA on each services and making sure that
you can accept the level of SLA. Second, not every AWS's regions have equal
number of services. you can under go the situation that there are no services you need.

### Extensibility

My proposing is serverless architecture. If there is plenty of tight couple logic and
the number of user/request is predictable, I suggest to refactor those lambda to
a microservice. It can reduce cost and make code easy to modify and deploy.
