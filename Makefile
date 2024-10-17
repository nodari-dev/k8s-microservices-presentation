run:
	docker build -t storage:latest -f ./storage/Dockerfile ./storage/
	docker build -t access-rights:latest -f ./access-rights/Dockerfile ./access-rights/
	minikube image load storage:latest
	minikube image load access-rights:latest
	kubectl apply -f ./k8s/
